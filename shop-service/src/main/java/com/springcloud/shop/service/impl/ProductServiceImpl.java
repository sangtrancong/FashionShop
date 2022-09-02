package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.repository.ProductRepository;
import com.springcloud.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findByCategory(long id) {
        Category category = new Category();
        category.setId(id);
        return productRepository.findByCategory(category);
    }

    @Override
    public List<Product> findByBrand(long id) {
        Brand brand = new Brand();
        brand.setId(id);
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product> findByRelated(long categoryId) {
        Category category = new Category();
        category.setId(categoryId);
        return productRepository.findByCategory(category);
    }

    @Override
    public Product findById(long id) {
        Optional<Product> optional = productRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Product findByName(String name) {
        Optional<Product> optional = productRepository.findByName(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Product save(Product object) {
        return productRepository.save(object);
    }

    @Override
    public Product findBySku(String sku) {
        Optional<Product> optional = productRepository.findBySku(sku);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public List<Product> findAllByActive() {
        return productRepository.findAllByStatus(true);
    }

    @Override
    public List<Product> findAllByActiveLimit(int firstRecord, int size) {
        return productRepository.findAllByStatusLimit(firstRecord, size);
    }

    @Override
    public List<Product> findProduct(ShopDTO shopDTO) {
        if (!CollectionUtils.isEmpty(shopDTO.getCategoryIds()) && !CollectionUtils.isEmpty(shopDTO.getBrandIds())
                && !CollectionUtils.isEmpty(shopDTO.getAttributeIds())) {
            return productRepository.findProduct(shopDTO.getAttributeIds(), shopDTO.getFirstRecord(), shopDTO.getNumberRecords(),
                    shopDTO.getCategoryIds(), shopDTO.getBrandIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getCategoryIds()) && !CollectionUtils.isEmpty(shopDTO.getBrandIds())) {
            //filter by category and brand
            return productRepository.findProductByCategoryAndBrand(shopDTO.getFirstRecord(), shopDTO.getNumberRecords(), shopDTO.getCategoryIds(), shopDTO.getBrandIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getCategoryIds()) && !CollectionUtils.isEmpty(shopDTO.getAttributeIds())) {
            //filter by category and attribute
            return productRepository.findProductByCategoryAndAttribute(shopDTO.getAttributeIds(), shopDTO.getFirstRecord(), shopDTO.getNumberRecords(), shopDTO.getCategoryIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getBrandIds()) && !CollectionUtils.isEmpty(shopDTO.getAttributeIds())) {
            //filter by brand and attribute
            return productRepository.findProductByBrandAndAttribute(shopDTO.getAttributeIds(), shopDTO.getFirstRecord(), shopDTO.getNumberRecords(), shopDTO.getBrandIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getCategoryIds())) {
            //filter by category
            return productRepository.findProductByCategory(shopDTO.getFirstRecord(), shopDTO.getNumberRecords(), shopDTO.getCategoryIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getBrandIds())) {
            //filter by brand
            return productRepository.findProductByBrand(shopDTO.getFirstRecord(), shopDTO.getNumberRecords(), shopDTO.getBrandIds());
        } else if (!CollectionUtils.isEmpty(shopDTO.getAttributeIds())) {
            ////filter by attribute
            return productRepository.findProductByAttribute(shopDTO.getAttributeIds(), shopDTO.getFirstRecord(), shopDTO.getNumberRecords());
        } else {
            return productRepository.findAllByStatusLimit(shopDTO.getFirstRecord(), shopDTO.getNumberRecords());
        }
    }

    @Override
    public List<Product> findProductTopRating() {
        return productRepository.findProductTopRating();
    }

    @Override
    public List<Product> findProductTopComment() {
        return productRepository.findProductTopComment();
    }

    @Override
    public List<Product> findProductTopPromotion() {
        return productRepository.findProductTopOrder();
    }

    @Override
    public List<Product> findByKey(String name) {
        if(!"".equals(name.trim())) {
            name = "%"+name.trim()+"%";
        } else {
            name = "%%";
        }
        return productRepository.findProductByKey(name);
    }

    @Override
    public List<Product> findByOnDate(String startDate, String endDate) {
        return productRepository.findAllByOnDate(startDate, endDate);
    }

}
