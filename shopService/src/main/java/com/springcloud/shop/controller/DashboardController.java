package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.*;
import com.springcloud.shop.model.mapper.*;
import com.springcloud.shop.model.request.ReportRequestDTO;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.DateUtil;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.ReportValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("api/dashboards")
public class DashboardController {

    @Autowired
    OrderService orderService;

    @Autowired
    AccountService accountService;

    @Autowired
    ProductService productService;

    @Resource
    OrderMapper orderMapper;

    @Resource
    AccountMapper accountMapper;

    @Resource
    ProductMapper productMapper;

    @Autowired
    private Utils utils;

    @Autowired
    private DateUtil dateUtil;

    @Autowired
    ReportValidator reportValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();

        DashboardDTO dashboardDTO = new DashboardDTO();
        LocalDate today = LocalDate.now();
        String startDate = today.withDayOfMonth(1) + " 00:00:00";
        String endDate = today.withDayOfMonth(today.lengthOfMonth()) + " 23:59:59";
        List<OrderDTO> orderDTOList = orderMapper.toListDTO(orderService.findByOnDate(startDate, endDate));
        generateData(orderDTOList, dashboardDTO, startDate, endDate);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        TreeMap<String, Integer> hashMap = new TreeMap<>();
        if (!CollectionUtils.isEmpty(orderDTOList)) {
            for (int i = 1; i <= today.lengthOfMonth(); i++) {
                hashMap.put(today.withDayOfMonth(i).toString(), 0);
            }

            for (OrderDTO orderDTO : orderDTOList) {
                TimeZone zone = TimeZone.getTimeZone("Asia/Ho_Chi_Minh");
                LocalDateTime ldt = LocalDateTime.ofInstant(orderDTO.getCreatedOn().toInstant(),zone.toZoneId());
                if (hashMap.get(dateUtil.convertDateToString(orderDTO.getCreatedOn(), "yyyy-MM-dd")) != null) {
                    int count = hashMap.get(dateUtil.convertDateToString(orderDTO.getCreatedOn(), "yyyy-MM-dd"));
                    count +=1;
                    hashMap.put(dateUtil.convertDateToString(orderDTO.getCreatedOn(),"yyyy-MM-dd"), count);
                }
            }

        }

        restReponse.ok(dashboardDTO);
        restReponse.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(hashMap));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/report/list")
    public ResponseEntity<RestReponseDTO> findAllReport(@RequestBody ReportRequestDTO reportRequestDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();
        //validate
        reportValidator.validate(reportRequestDTO, bindingResult);
        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
        } else {
            String startDate = "";
            String endDate = "";
            if (!ObjectUtils.isEmpty(reportRequestDTO.getStartDate()) && !ObjectUtils.isEmpty(reportRequestDTO.getEndDate())) {
                startDate = reportRequestDTO.getStartDate();
                endDate = reportRequestDTO.getEndDate();
            }
            List<OrderDTO> orderDTOList = orderMapper.toListDTO(orderService.findByOnDate(startDate, endDate));
            DashboardDTO dashboardDTO = new DashboardDTO();
            dashboardDTO.setOrderDTOList(orderDTOList);
            generateData(orderDTOList, dashboardDTO, startDate, endDate);

            restReponse.ok(dashboardDTO);
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    private void generateData(List<OrderDTO> orderDTOList, DashboardDTO dashboardDTO, String startDate, String endDate) {
//        if (!CollectionUtils.isEmpty(orderDTOList)) {
//            dashboardDTO.setTotalOrder(orderDTOList.size());
//            double sumTotalCost = orderDTOList.stream().mapToDouble(orderDTO -> orderDTO.getTotalCost()).sum();
//            dashboardDTO.setTotalCost(sumTotalCost);
//        }

        HashMap<Long, Integer> hmUser = new HashMap<>();
        HashMap<Long, Integer> hmProduct = new HashMap<>();
        double totalPrice = 0;

        for (OrderDTO orderDTO : orderDTOList) {
            totalPrice = totalPrice + orderDTO.getTotalCost();
            hmUser.put(orderDTO.getAccount().getId(), 1);
            if (orderDTO.getPromotion() != null) {
                hmProduct.put(orderDTO.getPromotion().getId(), 1);
            }
        }

        dashboardDTO.setTotalOrder(orderDTOList.size());
        dashboardDTO.setTotalCost(totalPrice);
        dashboardDTO.setTotalUser(hmUser.size());
        dashboardDTO.setTotalProduct(hmProduct.size());

//        List<AccountDTO> accountDTOList = accountMapper.toListDTO(accountService.findByOnDate(startDate, endDate, 2));
//        if (!CollectionUtils.isEmpty(accountDTOList)) {
//            dashboardDTO.setTotalUser(accountDTOList.size());
//        }
//
//        List<ProductDTO> productDTOList = productMapper.toListDTO(productService.findByOnDate(startDate, endDate));
//        if (!CollectionUtils.isEmpty(productDTOList)) {
//            dashboardDTO.setTotalProduct(productDTOList.size());
//        }

    }

}
