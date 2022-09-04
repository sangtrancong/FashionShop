package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByProduct(Product name);

    List<Comment> findByAccount(Account name);
}
