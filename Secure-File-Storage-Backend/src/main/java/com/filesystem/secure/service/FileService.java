package com.filesystem.secure.service;

import com.filesystem.secure.model.SecureFile;
import com.filesystem.secure.repository.SecureFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class FileService {

    private final SecureFileRepository fileRepository;
    private final EncryptionService encryptionService;
    /**
     * Uploads and encrypts a file
     * @param file the file to upload
     * @param userId the Firebase user ID
     * @return the stored secure file metadata
     */
    public SecureFile uploadFile(MultipartFile file, String userId) throws Exception {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        // Generate a unique filename
        String uniqueFileName = UUID.randomUUID().toString();
        
        // Generate a random download key (6 characters alphanumeric)
        String downloadKey = generateDownloadKey();
        
        // Encrypt the file content
        byte[] fileContent = file.getBytes();
        EncryptionService.EncryptionResult encryptionResult = encryptionService.encrypt(fileContent);
        
        // Create and save the secure file entity
        SecureFile secureFile = SecureFile.builder()
                .fileName(uniqueFileName)
                .originalFileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .encryptedData(encryptionResult.getEncryptedData())
                .encryptionIv(encryptionResult.getIv())
                .uploadDate(LocalDateTime.now())
                .downloadKey(downloadKey)
                .userId(userId)
                .build();
        
        return fileRepository.save(secureFile);
    }
    
    /**
     * Generates a random 6-character alphanumeric download key
     * @return the generated download key
     */
    private String generateDownloadKey() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder key = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            key.append(chars.charAt(random.nextInt(chars.length())));
        }
        return key.toString();
    }
    
    /**
     * Retrieves and decrypts a file
     * @param fileId the ID of the file to retrieve
     * @param downloadKey the key required to download the file
     * @param userId the Firebase user ID
     * @return the decrypted file content
     * @throws IllegalArgumentException if the download key is invalid or userId doesn't match
     */
    public FileDownloadDto downloadFile(Long fileId, String downloadKey, String userId) throws Exception {
        SecureFile secureFile = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));
        
        // Validate the download key
        if (!secureFile.getDownloadKey().equals(downloadKey)) {
            throw new IllegalArgumentException("Invalid download key for file ID: " + fileId);
        }
        
        // Validate the user ID
        if (!secureFile.getUserId().equals(userId)) {
            throw new IllegalArgumentException("User not authorized to access this file");
        }
        
        // Decrypt the file content
        byte[] decryptedData = encryptionService.decrypt(
                secureFile.getEncryptedData(),
                secureFile.getEncryptionIv()
        );
        
        return new FileDownloadDto(
                decryptedData,
                secureFile.getOriginalFileName(),
                secureFile.getContentType()
        );
    }
    
    /**
     * Gets the download key for a file
     * @param fileId the ID of the file
     * @return the download key
     */
    public String getDownloadKey(Long fileId) {
        SecureFile secureFile = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));
        return secureFile.getDownloadKey();
    }
     /**
     * Lists all files for a specific user
     * @param userId the Firebase user ID
     * @return list of files metadata for the specified user
     */
    public List<SecureFile> getFilesByUserId(String userId) {
        return fileRepository.findByUserIdOrderByUploadDateDesc(userId);
    }
    /**
     * Lists all files
     * @return list of all files metadata
     */
    public List<SecureFile> getAllFiles() {
        return fileRepository.findAllByOrderByUploadDateDesc();
    }
    
    /**
     * Deletes a file by ID
     * @param fileId the ID of the file to delete
     * @param userId the Firebase user ID
     * @throws IllegalArgumentException if the user is not authorized to delete this file
     */
    public void deleteFile(Long fileId, String userId) {
        SecureFile secureFile = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));
        
        // Validate the user ID
        if (!secureFile.getUserId().equals(userId)) {
            throw new IllegalArgumentException("User not authorized to delete this file");
        }
        
        fileRepository.deleteById(fileId);
    }

   public SecureFile getFileById(Long fileId) {
       return fileRepository.findById(fileId)
               .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileId));
   }

    public static class FileDownloadDto {
        private final byte[] content;
        private final String fileName;
        private final String contentType;
        
        public FileDownloadDto(byte[] content, String fileName, String contentType) {
            this.content = content;
            this.fileName = fileName;
            this.contentType = contentType;
        }
        
        public byte[] getContent() {
            return content;
        }
        
        public String getFileName() {
            return fileName;
        }
        
        public String getContentType() {
            return contentType;
        }
    }
}
