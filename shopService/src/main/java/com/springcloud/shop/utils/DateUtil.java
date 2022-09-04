package com.springcloud.shop.utils;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateUtil {
    private String pattern = "yyyy-MM-dd";

    public boolean compareDate(String endDate, String startDate) {
        if (!endDate.isEmpty() || !startDate.isEmpty()) {
            Date end = convertStringToDate(endDate, pattern);
            Date start = convertStringToDate(startDate, pattern);
            return start.before(end);
        }
        return false;
    }

    public Date convertStringToDate(String value, String pattern) {
        try {
            return new SimpleDateFormat(pattern).parse(value);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    // convert from string DTO to Date Entity
    public String convertDateToString(Date value, String pattern) {
        return new SimpleDateFormat(pattern).format(value);
    }

    public boolean compareDate(Date startDate, Date endDate) {
        return startDate.before(endDate);
    }

}
