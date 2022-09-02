package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.AccountDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Role;
import com.springcloud.shop.model.mapper.AccountMapper;
import com.springcloud.shop.service.AccountService;
import com.springcloud.shop.service.RoleService;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.DateUtil;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.AccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private AccountValidator accountValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    DateUtil dateUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(accountMapper.toListDTO(accountService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Account account = accountService.findById(id);
        if (account == null) {
            restReponse.fail();
        } else {
            restReponse.ok(accountMapper.toDTO(account));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        accountValidator.validate(accountDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        Account account;
        if (!ObjectUtils.isEmpty(accountDTO) && accountDTO.getId() != 0) {
            account = accountService.findById(accountDTO.getId());
            //set value update
            account.setFullname(accountDTO.getFullname());
            account.setEmail(accountDTO.getEmail());
            account.setUsername(accountDTO.getUsername());
            account.setBirthday(dateUtil.convertStringToDate(accountDTO.getBirthday(), "yyyy-MM-dd") );
            account.setPhone(accountDTO.getPhone());
            account.setGender(accountDTO.getGender());
            account.setAddress(accountDTO.getAddress());
            account.setStatus(accountDTO.isStatus());
            account.setRole(roleService.findByName(accountDTO.getRoleName()));
        } else {
            account = accountMapper.toEntity(accountDTO);
            account.setPassword("{bcrypt}$2a$10$EOs8VROb14e7ZnydvXECA.4LoIhPOoFHKvVF/iBZ/ker17Eocz4Vi");
            account.setRole(roleService.findByName(accountDTO.getRoleName()));
        }
        // save
        accountService.save(account);

        restReponse.ok(accountMapper.toDTO(account));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Account account = accountService.findById(id);
        if (account == null) {
            restReponse.fail();
        } else {
            account.setStatus(false);
            accountService.save(account);
            restReponse.ok(accountMapper.toDTO(account));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    //shipper
    @GetMapping("/shipper/list")
    public ResponseEntity<RestReponseDTO> shipperFindAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        Role role = roleService.findByName(Contants.ROLE_SHIPPER);
        restReponse.ok(accountMapper.toListDTO(accountService.findAllByShipper(role)));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
