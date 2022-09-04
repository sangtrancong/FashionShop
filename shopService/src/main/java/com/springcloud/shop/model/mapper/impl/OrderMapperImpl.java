package com.springcloud.shop.model.mapper.impl;

import com.springcloud.shop.model.dto.*;
import com.springcloud.shop.model.entity.*;
import com.springcloud.shop.model.mapper.OrderDetailsMapper;
import com.springcloud.shop.model.mapper.OrderMapper;
import com.springcloud.shop.service.OrderDetailsService;
import com.springcloud.shop.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.processing.Generated;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
@Component
public class OrderMapperImpl implements OrderMapper {

    @Autowired
    private OrderDetailsService orderDetailsService;

    @Autowired
    private OrderDetailsMapper orderDetailsMapper;

    @Autowired
    DateUtil dateUtil;

    @Override
    public OrderDTO toDTO(Orders order) {
        if ( order == null ) {
            return null;
        }

        OrderDTO orderDTO = new OrderDTO();

        Long id = orderAccountId( order );
        if ( id != null ) {
            orderDTO.setAccountId( id );
        }
        orderDTO.setPaymentId( orderPaymentId( order ) );
        orderDTO.setPromotionId( orderPromotionId( order ) );
        Long id3 = orderShipperId( order );
        if ( id3 != null ) {
            orderDTO.setShipperId( id3 );
        }
        orderDTO.setAccount( accountToAccountDTO( order.getAccount() ) );
        orderDTO.setPayment( paymentToPaymentDTO( order.getPayment() ) );
        orderDTO.setPromotion( promotionToPromotionDTO( order.getPromotion() ) );

        orderDTO.setId( order.getId() );
        orderDTO.setProgress( order.getProgress() );
        orderDTO.setTotalCost( order.getTotalCost() );
        orderDTO.setPayCost( order.isPayCost() );
        orderDTO.setStatus( order.isStatus() );
        orderDTO.setCreatedOn(order.getCreatedOn());

        orderDTO.setOrderDetails(orderDetailsMapper.toListDTO(orderDetailsService.findByOrder(order)));

        return orderDTO;
    }

    @Override
    public List<OrderDTO> toListDTO(List<Orders> orders) {
        if ( orders == null ) {
            return null;
        }

        List<OrderDTO> list = new ArrayList<OrderDTO>( orders.size() );
        for ( Orders orders1 : orders ) {
            list.add( toDTO( orders1 ) );
        }

        return list;
    }

    @Override
    public Orders toEntity(OrderDTO orderDTO) {
        if ( orderDTO == null ) {
            return null;
        }

        Orders orders = new Orders();

        orders.setId( orderDTO.getId() );
        orders.setAccount( accountDTOToAccount( orderDTO.getAccount() ) );
        orders.setPayment( paymentDTOToPayment( orderDTO.getPayment() ) );
        try {
            orders.setPromotion( promotionDTOToPromotion( orderDTO.getPromotion() ) );
        }
        catch ( ParseException e ) {
            throw new RuntimeException( e );
        }
        orders.setProgress( orderDTO.getProgress() );
        orders.setTotalCost( orderDTO.getTotalCost() );
        orders.setPayCost( orderDTO.isPayCost() );
        orders.setStatus( orderDTO.isStatus() );

        return orders;
    }

    private Long orderAccountId(Orders orders) {
        if ( orders == null ) {
            return null;
        }
        Account account = orders.getAccount();
        if ( account == null ) {
            return null;
        }
        Long id = account.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private long orderPaymentId(Orders orders) {
        if ( orders == null ) {
            return 0L;
        }
        Payment payment = orders.getPayment();
        if ( payment == null ) {
            return 0L;
        }
        long id = payment.getId();
        return id;
    }

    private long orderPromotionId(Orders orders) {
        if ( orders == null ) {
            return 0L;
        }
        Promotion promotion = orders.getPromotion();
        if ( promotion == null ) {
            return 0L;
        }
        long id = promotion.getId();
        return id;
    }

    private Long orderShipperId(Orders orders) {
        if ( orders == null ) {
            return null;
        }
        Account shipper = orders.getShipper();
        if ( shipper == null ) {
            return null;
        }
        Long id = shipper.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected RoleDTO roleToRoleDTO(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDTO roleDTO = new RoleDTO();

        if ( role.getId() != null ) {
            roleDTO.setId( role.getId() );
        }
        roleDTO.setName( role.getName() );
        roleDTO.setStatus( role.isStatus() );

        return roleDTO;
    }

    protected AccountDTO accountToAccountDTO(Account account) {
        if ( account == null ) {
            return null;
        }

        AccountDTO accountDTO = new AccountDTO();

        if ( account.getId() != null ) {
            accountDTO.setId( account.getId() );
        }
        accountDTO.setFullname( account.getFullname() );
        accountDTO.setEmail( account.getEmail() );
        accountDTO.setUsername( account.getUsername() );
//        accountDTO.setBirthday(dateUtil.convertStringToDate(account.getBirthday())  );
        accountDTO.setPhone( account.getPhone() );
        accountDTO.setGender( account.getGender() );
        accountDTO.setAddress( account.getAddress() );
        accountDTO.setStatus( account.isStatus() );
        accountDTO.setRole( roleToRoleDTO( account.getRole() ) );

        return accountDTO;
    }

    protected PaymentDTO paymentToPaymentDTO(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        PaymentDTO paymentDTO = new PaymentDTO();

        paymentDTO.setId( payment.getId() );
        paymentDTO.setName( payment.getName() );
        paymentDTO.setDescription( payment.getDescription() );
        paymentDTO.setStatus( payment.isStatus() );

        return paymentDTO;
    }

    protected PromotionDTO promotionToPromotionDTO(Promotion promotion) {
        if ( promotion == null ) {
            return null;
        }

        PromotionDTO promotionDTO = new PromotionDTO();

        promotionDTO.setId( promotion.getId() );
        promotionDTO.setName( promotion.getName() );
        promotionDTO.setCode( promotion.getCode() );
        promotionDTO.setDescription( promotion.getDescription() );
        if ( promotion.getStartDate() != null ) {
            promotionDTO.setStartDate( new SimpleDateFormat().format( promotion.getStartDate() ) );
        }
        if ( promotion.getEndDate() != null ) {
            promotionDTO.setEndDate( new SimpleDateFormat().format( promotion.getEndDate() ) );
        }
        promotionDTO.setApplyType( promotion.getApplyType() );
        promotionDTO.setApplyCode( promotion.getApplyCode() );
        promotionDTO.setCouponType( promotion.getCouponType() );
        promotionDTO.setCouponAmount( promotion.getCouponAmount() );
        promotionDTO.setStatus( promotion.isStatus() );

        return promotionDTO;
    }

    protected Role roleDTOToRole(RoleDTO roleDTO) {
        if ( roleDTO == null ) {
            return null;
        }

        Role role = new Role();

        role.setId( roleDTO.getId() );
        role.setName( roleDTO.getName() );
        role.setStatus( roleDTO.isStatus() );

        return role;
    }

    protected Account accountDTOToAccount(AccountDTO accountDTO) {
        if ( accountDTO == null ) {
            return null;
        }

        Account account = new Account();

        account.setId( accountDTO.getId() );
        account.setFullname( accountDTO.getFullname() );
        account.setEmail( accountDTO.getEmail() );
        account.setUsername( accountDTO.getUsername() );
//        account.setBirthday( accountDTO.getBirthday() );
        account.setPhone( accountDTO.getPhone() );
        account.setGender( accountDTO.getGender() );
        account.setAddress( accountDTO.getAddress() );
        account.setStatus( accountDTO.isStatus() );
        account.setRole( roleDTOToRole( accountDTO.getRole() ) );

        return account;
    }

    protected Payment paymentDTOToPayment(PaymentDTO paymentDTO) {
        if ( paymentDTO == null ) {
            return null;
        }

        Payment payment = new Payment();

        payment.setId( paymentDTO.getId() );
        payment.setName( paymentDTO.getName() );
        payment.setDescription( paymentDTO.getDescription() );
        payment.setStatus( paymentDTO.isStatus() );

        return payment;
    }

    protected Promotion promotionDTOToPromotion(PromotionDTO promotionDTO) throws ParseException {
        if ( promotionDTO == null ) {
            return null;
        }

        Promotion promotion = new Promotion();

        promotion.setId( promotionDTO.getId() );
        promotion.setName( promotionDTO.getName() );
        promotion.setCode( promotionDTO.getCode() );
        promotion.setDescription( promotionDTO.getDescription() );
        if ( promotionDTO.getStartDate() != null ) {
            promotion.setStartDate( new SimpleDateFormat().parse( promotionDTO.getStartDate() ) );
        }
        if ( promotionDTO.getEndDate() != null ) {
            promotion.setEndDate( new SimpleDateFormat().parse( promotionDTO.getEndDate() ) );
        }
        promotion.setApplyType( promotionDTO.getApplyType() );
        promotion.setApplyCode( promotionDTO.getApplyCode() );
        promotion.setCouponType( promotionDTO.getCouponType() );
        promotion.setCouponAmount( promotionDTO.getCouponAmount() );
        promotion.setStatus( promotionDTO.isStatus() );

        return promotion;
    }
}
