package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    Optional<Brand> findByName(String name);

    List<Brand> findAllByStatus(boolean status);

    @Query(nativeQuery = true, value = "SELECT * FROM Brand b WHERE b.status= true AND b.id IN :brandId ORDER BY b.name DESC")
    List<Brand> findAllByActiveInListId(@Param("brandId") List<Integer> brandId);

}