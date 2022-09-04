package com.springcloud.shop.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "promotion")
public class Promotion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "apply_type")
    private String applyType;

    @Column(name = "apply_code")
    private String applyCode;

    @Column(name = "coupon_type")
    private String couponType;

    @Column(name = "coupon_amount")
    private int couponAmount;

    @Column(name = "status")
    private boolean status;

}
