package com.filesystem.secure.repository;

import com.filesystem.secure.model.SecureFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecureFileRepository extends JpaRepository<SecureFile, Long> {
    List<SecureFile> findByUserIdOrderByUploadDateDesc(String userId);
    List<SecureFile> findAllByOrderByUploadDateDesc();
    Optional<SecureFile> findByFileName(String fileName);
}
