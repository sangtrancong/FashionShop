package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ProductDTO {

    private long id;

    private long categoryId;

    private long brandId;

    private String sku;

    private String name;

    private String description;

    private String detail;

    private String image;

    private boolean status;

    private MultipartFile avatarMul;

    // custom data
    private CategoryDTO category;
    private BrandDTO brand;
    private List<ProductAttributeDTO> colorAttributes;
    private List<ProductAttributeDTO> sizeAttributes;
    private boolean inStock;

    private String attributes;

}
