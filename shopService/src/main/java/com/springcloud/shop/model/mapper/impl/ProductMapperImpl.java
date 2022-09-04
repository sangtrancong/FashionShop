package com.springcloud.shop.model.mapper.impl;

import com.springcloud.shop.model.dto.*;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductAttribute;
import com.springcloud.shop.model.mapper.ProductMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDTO(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        // set product
        productDTO.setCategoryId( productCategoryId( product ) );
        productDTO.setBrandId( productBrandId( product ) );
        productDTO.setCategory( categoryToCategoryDTO( product.getCategory() ) );
        productDTO.setBrand( brandToBrandDTO( product.getBrand() ) );
        productDTO.setId( product.getId() );
        productDTO.setSku( product.getSku() );
        productDTO.setName( product.getName() );
        productDTO.setDescription( product.getDescription() );
        productDTO.setDetail( product.getDetail() );
        productDTO.setImage( product.getImage() );
        productDTO.setStatus( product.isStatus() );

        // set attributes
        productDTO.setColorAttributes(productAttributeListToProductAttributeDTOList( product.getProductAttributes(), "COLOR" ) );
        productDTO.setSizeAttributes(productAttributeListToProductAttributeDTOList( product.getProductAttributes(), "SIZE" ) );

        // set in stock
        productDTO.setInStock(getInStock(product.getProductAttributes()));

        return productDTO;
    }

    @Override
    public List<ProductDTO> toListDTO(List<Product> productList) {
        if ( productList == null ) {
            return null;
        }

        List<ProductDTO> list = new ArrayList<ProductDTO>( productList.size() );
        for ( Product product : productList ) {
            list.add( toDTO( product ) );
        }

        return list;
    }

    @Override
    public Product toEntity(Product product, ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        product.setId( product.getId() );
        product.setCategory( categoryDTOToCategory( productDTO.getCategory() ) );
        product.setBrand( brandDTOToBrand( productDTO.getBrand() ) );
        product.setSku( productDTO.getSku() );
        product.setName( productDTO.getName() );
        product.setDescription( productDTO.getDescription() );
        product.setDetail( productDTO.getDetail() );
        product.setImage( productDTO.getImage() );
        product.setStatus( productDTO.isStatus() );

        return product;
    }

    private long productCategoryId(Product product) {
        if ( product == null ) {
            return 0L;
        }
        Category category = product.getCategory();
        if ( category == null ) {
            return 0L;
        }
        long id = category.getId();
        return id;
    }

    private long productBrandId(Product product) {
        if ( product == null ) {
            return 0L;
        }
        Brand brand = product.getBrand();
        if ( brand == null ) {
            return 0L;
        }
        long id = brand.getId();
        return id;
    }

    protected CategoryDTO categoryToCategoryDTO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setId( category.getId() );
        categoryDTO.setName( category.getName() );
        categoryDTO.setDescription( category.getDescription() );
        categoryDTO.setStatus( category.isStatus() );

        return categoryDTO;
    }

    protected BrandDTO brandToBrandDTO(Brand brand) {
        if ( brand == null ) {
            return null;
        }

        BrandDTO brandDTO = new BrandDTO();

        brandDTO.setId( brand.getId() );
        brandDTO.setName( brand.getName() );
        brandDTO.setDescription( brand.getDescription() );
        brandDTO.setStatus( brand.isStatus() );

        return brandDTO;
    }

    protected ProductAttributeDTO productAttributeToProductAttributeDTO(ProductAttribute productAttribute, String type) {
        if ( productAttribute == null ) {
            return null;
        }

        if (productAttribute.getAttribute().getType().equalsIgnoreCase(type)) {
            ProductAttributeDTO productAttributeDTO = new ProductAttributeDTO();

            // product attribute
            productAttributeDTO.setId( productAttribute.getId() );
            productAttributeDTO.setQuantity( productAttribute.getQuantity() );
            productAttributeDTO.setPrice( productAttribute.getPrice() );
            productAttributeDTO.setDiscount( productAttribute.getDiscount() );
            productAttributeDTO.setStatus( productAttribute.isStatus() );

            // attribute
            AttributeDTO attributeDTO = new AttributeDTO();
            attributeDTO.setId(productAttribute.getAttribute().getId());
            attributeDTO.setName(productAttribute.getAttribute().getName());
            attributeDTO.setDescription(productAttribute.getAttribute().getDescription());
            attributeDTO.setType(productAttribute.getAttribute().getType());
            attributeDTO.setStatus(productAttribute.getAttribute().isStatus());
            productAttributeDTO.setAttribute(attributeDTO);

            return productAttributeDTO;
        }

        return null;
    }

    protected List<ProductAttributeDTO> productAttributeListToProductAttributeDTOList(List<ProductAttribute> list, String type) {
        if ( list == null ) {
            return null;
        }

        List<ProductAttributeDTO> list1 = new ArrayList<ProductAttributeDTO>( list.size() );
        for ( ProductAttribute productAttribute : list ) {
            ProductAttributeDTO productAttributeDTO = productAttributeToProductAttributeDTO( productAttribute, type );
            if (productAttributeDTO != null) {
                list1.add(productAttributeToProductAttributeDTO(productAttribute, type));
            }
        }

        return list1;
    }

    protected Category categoryDTOToCategory(CategoryDTO categoryDTO) {
        if ( categoryDTO == null ) {
            return null;
        }

        Category category = new Category();

        category.setId( categoryDTO.getId() );
        category.setName( categoryDTO.getName() );
        category.setDescription( categoryDTO.getDescription() );
        category.setStatus( categoryDTO.isStatus() );

        return category;
    }

    protected Brand brandDTOToBrand(BrandDTO brandDTO) {
        if ( brandDTO == null ) {
            return null;
        }

        Brand brand = new Brand();

        brand.setId( brandDTO.getId() );
        brand.setName( brandDTO.getName() );
        brand.setDescription( brandDTO.getDescription() );
        brand.setStatus( brandDTO.isStatus() );

        return brand;
    }

    protected ProductAttribute productAttributeDTOToProductAttribute(ProductAttributeDTO productAttributeDTO) {
        if ( productAttributeDTO == null ) {
            return null;
        }

        ProductAttribute productAttribute = new ProductAttribute();

        productAttribute.setId( productAttributeDTO.getId() );
        productAttribute.setQuantity( productAttributeDTO.getQuantity() );
        productAttribute.setPrice( productAttributeDTO.getPrice() );
        productAttribute.setDiscount( productAttributeDTO.getDiscount() );
        productAttribute.setStatus( productAttributeDTO.isStatus() );

        return productAttribute;
    }

    protected List<ProductAttribute> productAttributeDTOListToProductAttributeList(List<ProductAttributeDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<ProductAttribute> list1 = new ArrayList<ProductAttribute>( list.size() );
        for ( ProductAttributeDTO productAttributeDTO : list ) {
            list1.add( productAttributeDTOToProductAttribute( productAttributeDTO ) );
        }

        return list1;
    }

    private boolean getInStock(List<ProductAttribute> productAttributes) {
        if (productAttributes == null) {
            return false;
        }

        for (ProductAttribute productAttribute : productAttributes) {
            if (productAttribute.getQuantity() > 0) {
                return true;
            }
        }

        return false;
    }

}
