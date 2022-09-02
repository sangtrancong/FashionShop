package com.springcloud.shop.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springcloud.shop.model.dto.ProductAttributeDTO;
import org.springframework.stereotype.Component;
import java.util.List;

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

    public List<ProductAttributeDTO> convertToProductAttribute(String json) {
        List<ProductAttributeDTO> productAttributes = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            productAttributes = objectMapper.readValue(json, new TypeReference<List<ProductAttributeDTO>>(){});
        } catch (Exception e) {
            e.printStackTrace();
        }
        return productAttributes;
    }

}
