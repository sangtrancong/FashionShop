package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.CommentDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.Promotion;
import com.springcloud.shop.model.mapper.CommentMapper;
import com.springcloud.shop.service.CommentService;
import com.springcloud.shop.service.ProductService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.CommentValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private CommentValidator commentValidator;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(commentMapper.toListDTO(commentService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Comment comment = commentService.findById(id);
        if (comment == null) {
            restReponse.fail();
        } else {
            restReponse.ok(commentMapper.toDTO(comment));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<RestReponseDTO> findByProduct(@PathVariable Product id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        List<Comment> comments = commentService.findByProduct(id);
        if (comments == null) {
            restReponse.fail();
        } else {
            restReponse.ok(commentMapper.toListDTO(comments));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<RestReponseDTO> findByAccount(@PathVariable Account id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        List<Comment> comments = commentService.findByAccount(id);
        if (comments == null) {
            restReponse.fail();
        } else {
            restReponse.ok(commentMapper.toListDTO(comments));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody CommentDTO commentDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        commentValidator.validate(commentDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        if (!ObjectUtils.isEmpty(commentDTO) && commentDTO.getId() != 0) {
            //update
            Comment comment = commentService.findById(commentDTO.getId());
            comment.setComment(commentDTO.getComment());
            comment.setStatus(commentDTO.isStatus());
            commentService.save(comment);
            restReponse.ok(commentMapper.toDTO(comment));
        } else {
            //to do
            // to entity
            Comment comment = commentMapper.toEntity(commentDTO);

            // set account

            // set product
            Product product = productService.findById(commentDTO.getProduct().getId());
            comment.setProduct(product);

            // save
            commentService.save(comment);

            restReponse.ok(commentMapper.toDTO(comment));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Comment comment = commentService.findById(id);
        if (comment == null) {
            restReponse.fail();
        } else {
            comment.setStatus(false);
            commentService.save(comment);
            restReponse.ok(commentMapper.toDTO(comment));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }
}
