package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ProductImageDTO {

    private long id;

    private long productId;

    private String image;

    private boolean status;

    private MultipartFile avatarMul;

}
