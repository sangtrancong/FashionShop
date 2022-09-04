package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.ProductAttributeDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.dto.ProductDTO;
import com.springcloud.shop.model.entity.ProductAttribute;
import com.springcloud.shop.model.mapper.*;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.UploadFileUtil;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.ProductValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductAttributeService productAttributeService;

    @Autowired
    private AttributeService attributeService;

    @Autowired
    private ProductValidator productValidator;

    @Resource
    private ProductMapper productMapper;

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private BrandMapper brandMapper;

    @Resource
    private ProductImageMapper productImageMapper;

    @Resource
    private ProductAttributesMapper productAttributesMapper;

    @Resource
    private AttributeMapper attributeMapper;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private Utils utils;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> getList() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productMapper.toListDTO(productService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Product product = productService.findById(id);
        if (product == null) {
            restReponse.fail();
        } else {
            restReponse.ok(productMapper.toDTO(product));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/form/id/{id}")
    public ResponseEntity<RestReponseDTO> findFormById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        try {
            Product product = productService.findById(id);
            if (product == null) {
                restReponse.fail();
            } else {
                restReponse.ok(productMapper.toDTO(product));
            }

            restReponse.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
            restReponse.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
            restReponse.addMetadata(Contants.PRODUCT_IMAGES, utils.convertObjectToJson(productImageMapper.toListDTO(productImageService.findAllByProductAndActive(product))));
            restReponse.addMetadata(Contants.PRODUCT_ATTRIBUTES, utils.convertObjectToJson(productAttributesMapper.toListDTO(productAttributeService.findAllByProductAndActive(product))));
            restReponse.addMetadata(Contants.ATTRIBUTES, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));

            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        } catch (Exception exception) {

        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<RestReponseDTO> findByCategory(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productMapper.toListDTO(productService.findByCategory(id)));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<RestReponseDTO> findByBrand(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productMapper.toListDTO(productService.findByBrand(id)));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<RestReponseDTO> save(ProductDTO productDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        productValidator.validate(productDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        Product product = productService.findById(productDTO.getId());

        if (product == null) {
            product = new Product();
        }

        product.setId( product.getId() );
        product.setSku( productDTO.getSku() );
        product.setName( productDTO.getName() );
        product.setDescription( productDTO.getDescription() );
        product.setDetail( productDTO.getDetail() );
        product.setStatus( productDTO.isStatus() );

        if (productDTO.getAvatarMul() != null && !StringUtils.isEmpty(productDTO.getAvatarMul().getOriginalFilename())) {
            String urlImage = uploadFileUtil.uploadFileResultFileName(productDTO.getAvatarMul());
            product.setImage(urlImage);
        }

        // set category
        Category category = categoryService.findById(productDTO.getCategoryId());
        product.setCategory(category);

        // set brand
        Brand brand = brandService.findById(productDTO.getBrandId());
        product.setBrand(brand);

        List<ProductAttributeDTO> productAttributes = utils.convertToProductAttribute(productDTO.getAttributes());

        if (productAttributes != null) {
            for (ProductAttributeDTO productAttributeDTO : productAttributes) {
                ProductAttribute attribute = productAttributeService.findById(productAttributeDTO.getId());
                if (attribute == null) {
                    attribute = new ProductAttribute();
                }
                if (productAttributeDTO.getAttributeId() > 0) {
                    attribute.setProduct(product);
                    attribute.setQuantity(productAttributeDTO.getQuantity());
                    attribute.setPrice(productAttributeDTO.getPrice());
                    attribute.setDiscount(productAttributeDTO.getDiscount());
                    attribute.setAttribute(attributeService.findById(productAttributeDTO.getAttributeId()));
                    attribute.setStatus(productAttributeDTO.isStatus());
                    productAttributeService.save(attribute);
                }
            }
        }

        restReponse.ok(productMapper.toDTO(productService.save(product)));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Product product = productService.findById(id);
        if (product == null) {
            restReponse.fail();
        } else {
            product.setStatus(false);
            productService.save(product);
            restReponse.ok(productMapper.toDTO(product));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
