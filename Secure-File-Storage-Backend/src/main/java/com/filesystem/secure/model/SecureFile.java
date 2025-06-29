package com.filesystem.secure.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "secure_files")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecureFile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fileName;
    
    @Column(nullable = false)
    private String originalFileName;
    
    @Column(nullable = false)
    private String contentType;
    
    @Column(nullable = false)
    private Long fileSize;
    
    @Lob
    @Column(nullable = false)
    private byte[] encryptedData;
    
    @Column(nullable = false)
    private LocalDateTime uploadDate;
    
    @Column(length = 32)
    private String encryptionIv; // Initialization vector for encryption
    
    @Column(length = 16, nullable = false)
    private String downloadKey; // Key required to download the file
    
    @Column(nullable = false)
    private String userId; 

    public byte[] getEncryptedContent() {
        return this.encryptedData;
    }
}
