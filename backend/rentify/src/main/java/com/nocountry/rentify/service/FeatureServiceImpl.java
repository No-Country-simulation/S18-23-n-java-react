package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.FeatureDTO;
import com.nocountry.rentify.dto.mapper.FeatureMapper;
import com.nocountry.rentify.model.entity.Feature;
import com.nocountry.rentify.repository.FeatureRepository;
import com.nocountry.rentify.service.interfaces.FeatureService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeatureServiceImpl implements FeatureService{
    
    
    @Autowired
    private FeatureRepository featureRepository;

    @Override
    public List<FeatureDTO> getAllFeatures() {
        List<Feature> features = featureRepository.findAll();
        return features.stream()
                .map(FeatureMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FeatureDTO createFeature(FeatureDTO featureDTO) {
        Feature feature = FeatureMapper.toEntity(featureDTO);
        Feature savedFeature = featureRepository.save(feature);
        return FeatureMapper.toDTO(savedFeature);
    }

    @Override
    public void editFeature(FeatureDTO featureDTO) {
        Feature feature = FeatureMapper.toEntity(featureDTO);
        featureRepository.save(feature);
    }

    @Override
    public void deleteFeature(Long id_feature) {
        featureRepository.deleteById(id_feature);
    }

    @Override
    public FeatureDTO getFeature(Long id_feature) {
        Feature feature = featureRepository.findById(id_feature)
                .orElseThrow(() -> new 
                EntityNotFoundException("feature does not exist"));
        
        return FeatureMapper.toDTO(feature);
    }
}
