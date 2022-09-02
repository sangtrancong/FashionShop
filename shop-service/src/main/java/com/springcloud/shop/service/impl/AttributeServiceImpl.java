package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.repository.AttributeRepository;
import com.springcloud.shop.service.AttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AttributeServiceImpl implements AttributeService {

    @Autowired
    private AttributeRepository attributeRepository;

    @Override
    public List<Attribute> findAll() {
        return attributeRepository.findAll();
    }

    @Override
    public Attribute findById(long id) {
        Optional<Attribute> optional = attributeRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Attribute findByName(String name) {
        Optional<Attribute> optional = attributeRepository.findByName(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Attribute save(Attribute object) {
        return attributeRepository.save(object);
    }

    @Override
    public List<Attribute> findAllByActive() {
        return attributeRepository.findAllByStatus(true);
    }

    @Override
    public List<Attribute> findAllByActiveInListIdSize(ShopDTO shopDTO) {
        return attributeRepository.findAllByActiveInListId(shopDTO.getAttributeIds());
    }

    @Override
    public List<Attribute> findAllByActiveInListIdColor(ShopDTO shopDTO) {
        return attributeRepository.findAllByActiveInListId(shopDTO.getAttributeIds());
    }
}
