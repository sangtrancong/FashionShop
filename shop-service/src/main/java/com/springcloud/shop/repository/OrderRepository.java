package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByProgress(String progress);

    List<Orders> findByAccount(Account account);

    List<Orders> findByShipper(Account account);

    @Query(nativeQuery = true, value = "select * from orders where status = true " +
            "and created_on BETWEEN :startDate and :endDate")
    List<Orders> findAllByOnDate(@Param("startDate") String startDate, @Param("endDate") String endDate);

}
