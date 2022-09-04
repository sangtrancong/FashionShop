package com.springcloud.shop.utils;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class UploadFileUtil {

    public String uploadFileResultFileName(MultipartFile avatar) {
        UUID uuid = UUID.randomUUID();
        String[] fileFrags = avatar.getOriginalFilename().split("\\.");
        String extension = fileFrags[fileFrags.length-1];

        String fileName = StringUtils.cleanPath(avatar.getOriginalFilename());

        String uploadDir = "photos/";
        fileName = uuid.toString() + "." + extension;

        saveFile(uploadDir, fileName, avatar);

        return "/" +uploadDir + fileName;
    }

    private void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) {
        try {
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            try (InputStream inputStream = multipartFile.getInputStream()) {
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException ioe) {
                throw new IOException("Could not save image file: " + fileName, ioe);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
