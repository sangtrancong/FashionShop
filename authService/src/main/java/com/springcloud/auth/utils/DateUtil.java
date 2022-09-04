package com.springcloud.auth.utils;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateUtil {

    public Date convertStringToDate(String value, String pattern){
        try {
            return new SimpleDateFormat(pattern).parse(value);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    // convert from string DTO to Date Entity
    public String convertDateToString(Date value, String pattern){
        return new SimpleDateFormat(pattern).format(value);
    }
}
