package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.FeatureMapper;
import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.model.entity.Feature;
import com.nocountry.rentify.repository.FeatureRepository;
import com.nocountry.rentify.service.interfaces.FeatureService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final FeatureRepository featureRepository;
    private final FeatureMapper mapper;

    @Transactional(readOnly = true)
    @Override
    public List<FeatureRes> getAllFeatures() {
        return featureRepository.findAll().stream()
                .map(mapper::toResp)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public FeatureRes getFeatureById(Long id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("feature does not exist")
        );
        return mapper.toResp(feature);
    }

    @Transactional(readOnly = true)
    @Override
    public Feature findById(Long id) {
        return featureRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("feature does not exist"));
    }
}