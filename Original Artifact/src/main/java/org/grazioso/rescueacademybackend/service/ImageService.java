package org.grazioso.rescueacademybackend.service;


import java.io.IOException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.InputStream;
import java.util.UUID;

@Service
public class ImageService {

    private final AmazonS3 amazonS3;

    private final String bucketName;

    public ImageService(AmazonS3 amazonS3,  @Value("${aws.s3.bucket_name}") String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    public String uploadImage(MultipartFile imageFile, String existingImageUrl) throws IOException {
        try {
            String newFileName = generateFileName(imageFile.getOriginalFilename());
            if (existingImageUrl != null) {
                String existingFileName = extractFileName(existingImageUrl);
                amazonS3.deleteObject(bucketName, existingFileName); // Delete the existing image from S3
            }
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imageFile.getSize());
            try (InputStream inputStream = imageFile.getInputStream()) {
                amazonS3.putObject(bucketName, newFileName, inputStream, metadata);
            }
            return amazonS3.getUrl(bucketName, newFileName).toString();
        } catch (Exception e) {
            throw new IOException("Error uploading image to S3", e);
        }
    }

    private String extractFileName(String imageUrl) {
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID() + "-" + originalFileName;  // Generate a unique file name for S3
    }
}
