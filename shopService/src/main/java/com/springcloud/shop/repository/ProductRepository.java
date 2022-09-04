package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    Optional<Product> findBySku(String name);

    List<Product> findByCategory(Category category);

    List<Product> findByBrand(Brand brand);

    List<Product> findAllByStatus(boolean status);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p WHERE p.status= true ORDER BY p.created_on DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findAllByStatusLimit(@Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND PA.attribute_id IN :attributes\n" +
            "AND P.category_id IN :categorys\n" +
            "AND P.brand_id IN :brands \n" +
            "GROUP BY p.id ORDER BY p.created_on DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProduct(@Param("attributes") List<Integer> attributes, @Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords,
                              @Param("categorys") List<Integer> categorys, @Param("brands") List<Integer> brands);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND P.category_id IN :categorys\n" +
            "AND P.brand_id IN :brands \n" +
            "GROUP BY p.id ORDER BY p.created_on DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByCategoryAndBrand(@Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords,
                                                  @Param("categorys") List<Integer> categorys, @Param("brands") List<Integer> brands);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND PA.attribute_id IN :attributes\n" +
            "AND P.category_id IN :categorys\n" +
            "GROUP BY p.id ORDER BY p.name DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByCategoryAndAttribute(@Param("attributes") List<Integer> attributes, @Param("firstRecord") int firstRecord,
                                                    @Param("numberRecords") int numberRecords, @Param("categorys") List<Integer> categorys);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND PA.attribute_id IN :attributes\n" +
            "AND P.brand_id IN :brands \n" +
            "GROUP BY p.id ORDER BY p.name DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByBrandAndAttribute(@Param("attributes") List<Integer> attributes, @Param("firstRecord") int firstRecord,
                                                 @Param("numberRecords") int numberRecords, @Param("brands") List<Integer> brands);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND P.category_id IN :categorys\n" +
            "GROUP BY p.id ORDER BY p.name DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByCategory(@Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords, @Param("categorys") List<Integer> categorys);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND P.brand_id IN :brands \n" +
            "GROUP BY p.id ORDER BY p.name DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByBrand(@Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords, @Param("brands") List<Integer> brands);

    @Query(nativeQuery = true, value = "SELECT * FROM Product p " +
            "INNER JOIN Product_Attribute PA ON PA.product_id = p.id \n" +
            "WHERE p.status= true\n" +
            "AND PA.attribute_id IN :attributes\n" +
            "GROUP BY p.id ORDER BY p.name DESC LIMIT :firstRecord,:numberRecords")
    List<Product> findProductByAttribute(@Param("attributes") List<Integer> attributes, @Param("firstRecord") int firstRecord, @Param("numberRecords") int numberRecords);

    @Query(nativeQuery = true, value = "SELECT * FROM product p \n" +
            "INNER JOIN (SELECT r.product_id, \n" +
            "count(r.product_id) FROM `rating` r \n" +
            "GROUP BY r.product_id) ra\n" +
            "ON ra.product_id = p.id  LIMIT 3;")
    List<Product> findProductTopRating();
    @Query(nativeQuery = true, value = "SELECT * FROM product p \n" +
            "LEFT JOIN (SELECT r.product_id, \n" +
            "count(r.product_id) as count FROM `order_detail` r \n" +
            "GROUP BY r.product_id) ra\n" +
            "ON ra.product_id = p.id ORDER by ra.count DESC LIMIT 3;")
    List<Product> findProductTopOrder();
    @Query(nativeQuery = true, value = "SELECT * FROM product p \n" +
            "INNER JOIN (SELECT c.product_id, count(c.product_id) as count FROM `comment` c\n" +
            "GROUP BY c.product_id ORDER BY count DESC) co\n" +
            "ON co.product_id = p.id LIMIT 3;")
    List<Product> findProductTopComment();

    @Query(nativeQuery = true, value = "SELECT * FROM product p \n" +
            "INNER JOIN (SELECT DISTINCT pa.product_id  FROM product_attribute pa\n" +
            "ORDER BY pa.discount DESC) pro\n" +
            "ON pro.product_id = p.id  LIMIT 3;")
    List<Product> findProductTopPromotion();

    @Query(nativeQuery = true, value = "SELECT * FROM `product` WHERE name like :key")
    List<Product> findProductByKey(@Param("key") String key);

    @Query(nativeQuery = true, value = "select * from product where status = true " +
            "and created_on BETWEEN :startDate and :endDate")
    List<Product> findAllByOnDate(@Param("startDate") String startDate, @Param("endDate") String endDate);


}
