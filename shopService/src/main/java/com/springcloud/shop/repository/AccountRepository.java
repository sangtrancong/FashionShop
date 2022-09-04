package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Orders;
import com.springcloud.shop.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String name);

    Optional<Account> findByEmail(String email);

    List<Account> findAllByStatus(boolean status);

    List<Account> findAllByRole(Role role);

    @Query(nativeQuery = true, value = "select * from account where status = true " +
            "and role_id =:role and created_on BETWEEN :startDate and :endDate")
    List<Account> findAllByOnDate(@Param("startDate") String startDate, @Param("endDate") String endDate,
                                  @Param("role") int role);

}
