package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.response.FeatureRes;
import com.nocountry.rentify.dto.mapper.FeatureMapper;
import com.nocountry.rentify.model.entity.Feature;
import com.nocountry.rentify.repository.FeatureRepository;
import com.nocountry.rentify.service.interfaces.FeatureService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService{

    private final FeatureRepository featureRepository;

    @Override
    public List<FeatureRes> getAllFeatures() {
        List<Feature> features = featureRepository.findAll();
        return features.stream()
                .map(FeatureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FeatureRes getFeature(Long id_feature) {
        Feature feature = featureRepository.findById(id_feature)
                .orElseThrow(() -> new 
                EntityNotFoundException("feature does not exist"));
        
        return FeatureMapper.toDTO(feature);
    }
}
