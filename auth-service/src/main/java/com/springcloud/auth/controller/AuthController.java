package com.springcloud.auth.controller;

import com.springcloud.auth.model.dto.AccountDTO;
import com.springcloud.auth.model.dto.RestReponseDTO;
import com.springcloud.auth.model.entity.Account;
import com.springcloud.auth.model.entity.Role;
import com.springcloud.auth.service.AccountService;
import com.springcloud.auth.service.EmailService;
import com.springcloud.auth.service.RoleService;
import com.springcloud.auth.utils.DateUtil;
import com.springcloud.auth.utils.ValidatorUtil;
import com.springcloud.auth.validator.AccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.codec.binary.Base64;

import javax.validation.Valid;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private AccountValidator accountValidator;

    @Autowired
    private DateUtil dateUtil;

    @Autowired
    EmailService emailService;

    private final String PASS_DEFAULT = "12345";

    @PostMapping("/register")
    public ResponseEntity<RestReponseDTO> register(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        accountValidator.validate(accountDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        // account
        Account account = new Account();
        account.setEmail(accountDTO.getEmail());
        account.setUsername(accountDTO.getEmail());
        account.setGender(0);
        account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        account.setFullname(accountDTO.getFullname());
        account.setStatus(true);

        // role
        Role role = roleService.findByName("USER");
        account.setRole(role);

        accountService.save(account);

        restReponse.ok(account);
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<RestReponseDTO> profile(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
//        accountValidator.validate(accountDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        // account
        Account account = accountService.findById(accountDTO.getAccountId());
        if (account == null) {
            restReponse.fail();
        } else {
            account.setAddress(accountDTO.getAddress());
            account.setPhone(accountDTO.getPhone());
            account.setBirthday(dateUtil.convertStringToDate(accountDTO.getBirthday(), "yyyy-MM-dd"));
            account.setFullname(accountDTO.getFullname());
            account.setStatus(true);

            accountService.save(account);

            restReponse.ok(account);
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/changepass")
    public ResponseEntity<RestReponseDTO> changepass(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        int countError = 0;

        restReponse.fail();

        // verify pass
        if (accountDTO.getPassword() == null || accountDTO.getPassword().isEmpty()) {
            restReponse.addMessages("password", "account.password.blank");
            countError++;
        }

        if (accountDTO.getPasswordNew() == null || accountDTO.getPasswordNew().isEmpty()) {
            restReponse.addMessages("passwordnew", "account.passwordnew.blank");
            countError++;
        }

        if (countError > 0) {
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        // account
        Account account = accountService.findById(accountDTO.getAccountId());
        if (account == null) {
            restReponse.fail();
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        } else {
//            if (!passwordEncoder.matches(accountDTO.getPasswordNew(), account.getPassword())) {
//                restReponse.addMessages("password", "account.password.notmatch");
//                countError++;
//            }
//
//            if (countError > 0) {
//                return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
//            }

            account.setPassword(passwordEncoder.encode(accountDTO.getPasswordNew()));
            account.setStatus(true);

            accountService.save(account);

            restReponse.ok(account);
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/google")
    public ResponseEntity<RestReponseDTO> google(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Account account = accountService.findByEmail(accountDTO.getEmail());
        if (account == null) {
            // account
            account = new Account();
            account.setEmail(accountDTO.getEmail());
            account.setUsername(accountDTO.getEmail());
            account.setGender(0);
            account.setPassword(passwordEncoder.encode("password"));
            account.setFullname(accountDTO.getFullname());
            account.setStatus(true);

            // role
            Role role = roleService.findByName("USER");
            account.setRole(role);

            accountService.save(account);
        }

        restReponse.ok(account);
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/forgotpass")
    public ResponseEntity<RestReponseDTO> sendMail(@RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Account account = accountService.findByEmail(accountDTO.getEmail());
        if (!ObjectUtils.isEmpty(account)) {
            emailService.sendEmail(accountDTO.getEmail(), "FORGOT PASSWORD SUCCESS", "Vui lòng clik vào đường dẫn để thay đổi mật khẩu:"+"http://localhost:9999/uaa/auth/change-pass/"+account.getId());
        }

//        byte[] encodedBytes = Base64.encodeBase64(String.valueOf(account.getId()).getBytes());
//        System.out.println("encodedBytes " + new String(encodedBytes));
//        byte[] decodedBytes = Base64.decodeBase64(encodedBytes);
//        System.out.println("decodedBytes " + new String(decodedBytes));

        restReponse.ok();
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/change-pass/{id}")
    public ResponseEntity<RestReponseDTO> changePass(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Account account = accountService.findById(id);
        if (!ObjectUtils.isEmpty(account)) {
            account.setPassword(passwordEncoder.encode(PASS_DEFAULT));
            accountService.save(account);
            emailService.sendEmail(account.getEmail(), "CHANGE PASSWORD SUCCESS", "Mật khẩu thay đổi của bạn là: "+ PASS_DEFAULT);
        }
        restReponse.ok();
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }



}
