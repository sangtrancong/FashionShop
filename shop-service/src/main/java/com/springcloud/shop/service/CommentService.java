package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;

import java.util.List;

public interface CommentService {

    List<Comment> findAll();

    List<Comment> findByProduct(Product product);

    List<Comment> findByAccount(Account account);

    Comment findById(long id);

    Comment save(Comment object);

}
