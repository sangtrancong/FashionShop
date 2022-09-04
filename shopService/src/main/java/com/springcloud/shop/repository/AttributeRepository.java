package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {

    Optional<Attribute> findByName(String name);

    List<Attribute> findAllByStatus(boolean status);

    @Query(nativeQuery = true, value = "SELECT * FROM Attribute a WHERE a.status= true AND a.id IN :attributeId ORDER BY a.name DESC")
    List<Attribute> findAllByActiveInListId(@Param("attributeId") List<Integer> attributeId);

}
