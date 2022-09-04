package com.springcloud.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class Utils {

    public String convertObjectToJson(Object object) {
        String jsonString = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonString = objectMapper.writeValueAsString(object);
            return jsonString;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonString;
    }
}
