
package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.FeatureDTO;
import com.nocountry.rentify.model.entity.Feature;
import com.nocountry.rentify.service.interfaces.FeatureService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/feature")
public class FeatureController {
    
    @Autowired
    private FeatureService featureService;
    
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureDTO> getAllFeatures(){
        return featureService.getAllFeatures();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public String saveFeature(@RequestBody FeatureDTO featureDTO){
        featureService.createFeature(featureDTO);
        return "Feature saved";
    }
    
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public String editFeature(@RequestBody FeatureDTO featureDTO){
        featureService.editFeature(featureDTO);
        return "Feature edited";
    }
    
    @DeleteMapping("delete/{id_feature}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteFeature(@PathVariable("id_feature") Long id_feature){
        featureService.deleteFeature(id_feature);
        return "Feature deleted";
    }
    
    @GetMapping("{id_feature}")
    @ResponseStatus(HttpStatus.OK)
    public FeatureDTO getFeature(@PathVariable("id_feature") Long id_feature){
        
        return featureService.getFeature(id_feature);
    }
}
