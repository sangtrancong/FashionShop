package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.Rating;
import com.springcloud.shop.model.mapper.RatingMapper;
import com.springcloud.shop.model.request.RatingRequestDTO;
import com.springcloud.shop.service.ProductService;
import com.springcloud.shop.service.RatingService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.RatingValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Resource
    private RatingMapper ratingMapper;

    @Autowired
    private RatingValidator ratingValidator;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(ratingMapper.toListDTO(ratingService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Rating rating = ratingService.findById(id);
        if (rating == null) {
            restReponse.fail();
        } else {
            restReponse.ok(ratingMapper.toDTO(rating));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<RestReponseDTO> findByProduct(@PathVariable Product id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        List<Rating> ratings = ratingService.findByProduct(id);
        if (ratings == null) {
            restReponse.fail();
        } else {
            restReponse.ok(ratingMapper.toListDTO(ratings));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<RestReponseDTO> findByAccount(@PathVariable Account id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        List<Rating> ratings = ratingService.findByAccount(id);
        if (ratings == null) {
            restReponse.fail();
        } else {
            restReponse.ok(ratingMapper.toListDTO(ratings));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@RequestBody RatingRequestDTO ratingRequestDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        ratingValidator.validate(ratingRequestDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        if (!ObjectUtils.isEmpty(ratingRequestDTO) && ratingRequestDTO.getId() != 0) {
            //update
            Rating rating = ratingService.findById(ratingRequestDTO.getId());
            rating.setRating(ratingRequestDTO.getRating());
            rating.setStatus(ratingRequestDTO.isStatus());
            ratingService.save(rating);
            restReponse.ok(ratingMapper.toDTO(rating));
        } else {
            //to do
            // to entity
            Rating rating = ratingMapper.toEntity(ratingRequestDTO);
            rating.setProduct(productService.findById(ratingRequestDTO.getProductId()));
            //rating.setAccount(new Account().setid);
            // save
            ratingService.save(rating);

            restReponse.ok(ratingMapper.toDTO(rating));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Rating comment = ratingService.findById(id);
        if (comment == null) {
            restReponse.fail();
        } else {
            comment.setStatus(false);
            ratingService.save(comment);
            restReponse.ok(ratingMapper.toDTO(comment));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
