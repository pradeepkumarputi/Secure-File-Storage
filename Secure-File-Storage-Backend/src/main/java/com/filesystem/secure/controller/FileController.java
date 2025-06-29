package com.filesystem.secure.controller;

import com.filesystem.secure.model.SecureFile;
import com.filesystem.secure.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development - restrict in production
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId) {
        try {
            SecureFile savedFile = fileService.uploadFile(file, userId);
            FileResponse response = new FileResponse(
                    savedFile.getId(),
                    savedFile.getOriginalFileName(),
                    savedFile.getContentType(),
                    savedFile.getFileSize(),
                    savedFile.getUploadDate().toString(),
                    savedFile.getDownloadKey()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FileResponse>> getFilesByUserId(@PathVariable String userId) {
        List<FileResponse> files = fileService.getFilesByUserId(userId).stream()
                .map(file -> new FileResponse(
                        file.getId(),
                        file.getOriginalFileName(),
                        file.getContentType(),
                        file.getFileSize(),
                        file.getUploadDate().toString(),
                        file.getDownloadKey()
                ))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(files);
    }
@GetMapping("/download/{fileId}")
public ResponseEntity<Resource> downloadFile(
        @PathVariable Long fileId, 
        @RequestParam("key") String downloadKey,
        @RequestParam("userId") String userId) {
    try {
        FileService.FileDownloadDto downloadDto = this.fileService.downloadFile(fileId, downloadKey, userId);
        ByteArrayResource resource = new ByteArrayResource(downloadDto.getContent());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(downloadDto.getContentType()))
                .header("Content-Disposition", "attachment; filename=\"" + downloadDto.getFileName() + "\"")
                .body(resource);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(403).build(); // Forbidden if key is invalid or user unauthorized
    } catch (Exception e) {
        return ResponseEntity.notFound().build();
    }
}

    @GetMapping("/raw/{fileId}")
    public ResponseEntity<String> getRawEncryptedData(@PathVariable Long fileId, @RequestParam("key") String downloadKey) {
        try {
            // Verify the download key first
            String actualKey = fileService.getDownloadKey(fileId);
            if (!actualKey.equals(downloadKey)) {
                return ResponseEntity.status(403).body("Invalid download key");
            }
            
            SecureFile file = fileService.getFileById(fileId);
            byte[] bytes = file.getEncryptedContent();
            StringBuilder hexPreview = new StringBuilder("Encrypted data preview (hex): ");
            for (int i = 0; i < Math.min(bytes.length, 50); i++) {
                hexPreview.append(String.format("%02X ", bytes[i]));
            }
            return ResponseEntity.ok(hexPreview.toString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> getFileById(
            @PathVariable Long fileId, 
            @RequestParam("key") String downloadKey,
            @RequestParam("userId") String userId) {
        try {
            FileService.FileDownloadDto downloadDto = fileService.downloadFile(fileId, downloadKey, userId);
            ByteArrayResource resource = new ByteArrayResource(downloadDto.getContent());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(downloadDto.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadDto.getFileName() + "\"")
                    .body(resource);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).build(); // Forbidden if key is invalid or user unauthorized
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<FileResponse>> getAllFiles() {
        List<FileResponse> files = fileService.getAllFiles().stream()
                .map(file -> new FileResponse(
                        file.getId(),
                        file.getOriginalFileName(),
                        file.getContentType(),
                        file.getFileSize(),
                        file.getUploadDate().toString(),
                        file.getDownloadKey()
                ))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<Void> deleteFile(
            @PathVariable Long fileId, 
            @RequestParam("key") String downloadKey,
            @RequestParam("userId") String userId) {
        try {
            // Verify the download key first
            String actualKey = fileService.getDownloadKey(fileId);
            if (!actualKey.equals(downloadKey)) {
                return ResponseEntity.status(403).build();
            }
            
            fileService.deleteFile(fileId, userId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).build(); // Forbidden if user unauthorized
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DTO for file response
    public static class FileResponse {
        private final Long id;
        private final String fileName;
        private final String contentType;
        private final Long size;
        private final String uploadDate;
        private final String downloadKey;

        public FileResponse(Long id, String fileName, String contentType, Long size, String uploadDate, String downloadKey) {
            this.id = id;
            this.fileName = fileName;
            this.contentType = contentType;
            this.size = size;
            this.uploadDate = uploadDate;
            this.downloadKey = downloadKey;
        }

        public Long getId() {
            return id;
        }

        public String getFileName() {
            return fileName;
        }

        public String getContentType() {
            return contentType;
        }

        public Long getSize() {
            return size;
        }

        public String getUploadDate() {
            return uploadDate;
        }
        
        public String getDownloadKey() {
            return downloadKey;
        }
    }
}
