package com.filesystem.secure.service;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import java.nio.charset.StandardCharsets;

@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12;
    private static final int GCM_TAG_LENGTH = 16;
    
    @Value("${encryption.secret:defaultSecretKey12345678901234567890}")
    private String secretKey;
    
    /**
     * Encrypts the given data using AES-GCM algorithm
     * @param data the data to encrypt
     * @return an object containing the encrypted data and the initialization vector
     */
    public EncryptionResult encrypt(byte[] data) throws Exception {
        // Generate a random 12-byte IV
        byte[] iv = new byte[GCM_IV_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        
        // Get the encryption key
        SecretKey key = getSecretKey();
        
        // Initialize the cipher for encryption
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);
        
        // Encrypt the data
        byte[] encryptedData = cipher.doFinal(data);
        
        return new EncryptionResult(encryptedData, Base64.getEncoder().encodeToString(iv));
    }
    
    /**
     * Decrypts the given encrypted data using AES-GCM algorithm
     * @param encryptedData the data to decrypt
     * @param ivBase64 the initialization vector in Base64 format
     * @return the decrypted data
     */
    public byte[] decrypt(byte[] encryptedData, String ivBase64) throws Exception {
        // Get the encryption key
        SecretKey key = getSecretKey();
        
        // Decode the IV from Base64
        byte[] iv = Base64.getDecoder().decode(ivBase64);
        
        // Initialize the cipher for decryption
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);
        
        // Decrypt the data
        return cipher.doFinal(encryptedData);
    }
    
    private SecretKey getSecretKey() {
        // For production, the key should be securely stored and not derived from a string
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        // Use first 32 bytes (256 bits) for AES-256
        byte[] key32Bytes = new byte[32];
        System.arraycopy(keyBytes, 0, key32Bytes, 0, Math.min(keyBytes.length, 32));
        return new SecretKeySpec(key32Bytes, "AES");
    }
    
    public static class EncryptionResult {
        private final byte[] encryptedData;
        private final String iv;
        
        public EncryptionResult(byte[] encryptedData, String iv) {
            this.encryptedData = encryptedData;
            this.iv = iv;
        }
        
        public byte[] getEncryptedData() {
            return encryptedData;
        }
        
        public String getIv() {
            return iv;
        }
    }
}
