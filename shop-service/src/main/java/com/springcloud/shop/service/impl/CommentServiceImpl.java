package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.repository.CommentRepository;
import com.springcloud.shop.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> findByProduct(Product product) {
        Comment comment = new Comment();
        comment.setProduct(product);
        return commentRepository.findByProduct(comment.getProduct());
    }

    @Override
    public List<Comment> findByAccount(Account account) {
        Comment comment = new Comment();
        comment.setAccount(account);
        return commentRepository.findByAccount(comment.getAccount());
    }

    @Override
    public Comment findById(long id) {
        Optional<Comment> optional = commentRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Comment save(Comment object) {
        return commentRepository.save(object);
    }

}
