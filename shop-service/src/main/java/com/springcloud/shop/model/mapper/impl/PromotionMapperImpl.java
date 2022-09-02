package com.springcloud.shop.model.mapper.impl;

import com.springcloud.shop.model.dto.PromotionDTO;
import com.springcloud.shop.model.entity.Promotion;
import com.springcloud.shop.model.mapper.PromotionMapper;
import com.springcloud.shop.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class PromotionMapperImpl implements PromotionMapper {

    @Autowired
    private DateUtil dateUtil;

    @Override
    public PromotionDTO toDTO(Promotion promotion , String pattern) {
        if ( promotion == null ) {
            return null;
        }

        PromotionDTO promotionDTO = new PromotionDTO();

        promotionDTO.setId( promotion.getId() );
        promotionDTO.setName(promotion.getName());
        promotionDTO.setCode( promotion.getCode() );
        promotionDTO.setDescription( promotion.getDescription() );
        if ( promotion.getStartDate() != null ) {
            promotionDTO.setStartDate( dateUtil.convertDateToString(promotion.getStartDate(), pattern));
        }
        if ( promotion.getEndDate() != null ) {
            promotionDTO.setEndDate( dateUtil.convertDateToString( promotion.getEndDate(), pattern));
        }
        promotionDTO.setApplyType( promotion.getApplyType() );
        promotionDTO.setApplyCode( promotion.getApplyCode() );
        promotionDTO.setCouponType( promotion.getCouponType() );
        promotionDTO.setCouponAmount( promotion.getCouponAmount() );
        promotionDTO.setStatus( promotion.isStatus() );

        return promotionDTO;
    }

    @Override
    public List<PromotionDTO> toListDTO(List<Promotion> promotions,
                                        String pattern) {
        if ( promotions == null ) {
            return null;
        }

        List<PromotionDTO> list = new ArrayList<PromotionDTO>( promotions.size() );
        for ( Promotion promotion : promotions ) {
            list.add( toDTO( promotion , pattern) );
        }

        return list;
    }

    @Override
    public Promotion toEntity(PromotionDTO promotionDTO, String pattern) {
        if ( promotionDTO == null && pattern == null ) {
            return null;
        }

        Promotion promotion = new Promotion();

        if ( promotionDTO != null ) {
            promotion.setId( promotionDTO.getId() );
            promotion.setName(promotionDTO.getName());
            promotion.setCode( promotionDTO.getCode() );
            promotion.setDescription( promotionDTO.getDescription() );
            if ( promotionDTO.getStartDate() != null ) {
                promotion.setStartDate( dateUtil.convertStringToDate( promotionDTO.getStartDate(), pattern ));
            }
            if ( promotionDTO.getEndDate() != null ) {
                promotion.setEndDate( dateUtil.convertStringToDate( promotionDTO.getEndDate(), pattern ));
            }
            promotion.setApplyType( promotionDTO.getApplyType() );
            promotion.setApplyCode( promotionDTO.getApplyCode() );
            promotion.setCouponType( promotionDTO.getCouponType() );
            promotion.setCouponAmount( promotionDTO.getCouponAmount() );
            promotion.setStatus( promotionDTO.isStatus() );
        }

        return promotion;
    }

}
