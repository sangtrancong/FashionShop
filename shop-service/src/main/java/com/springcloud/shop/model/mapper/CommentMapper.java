package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.CommentDTO;
import com.springcloud.shop.model.dto.ProductDTO;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    CommentDTO toDTO(Comment comment);

    List<CommentDTO> toListDTO(List<Comment> comments);

    // to Entity
    Comment toEntity(CommentDTO comment);
}
