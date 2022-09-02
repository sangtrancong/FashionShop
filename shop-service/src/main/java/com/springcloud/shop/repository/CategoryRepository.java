package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    List<Category> findAllByStatus(boolean status);

    @Query(nativeQuery = true, value = "SELECT * FROM Category c WHERE c.status= true AND c.id IN :categoryId ORDER BY c.name DESC")
    List<Category> findAllByActiveInListId(@Param("categoryId") List<Integer> categoryId);

}
