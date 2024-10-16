
package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.response.FeatureRes;
import com.nocountry.rentify.service.interfaces.FeatureService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/feature")
@AllArgsConstructor
public class FeatureController {
    

    private final FeatureService featureService;
    
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureRes> getAllFeatures(){
        return featureService.getAllFeatures();
    }
    
    @GetMapping("{id_feature}")
    @ResponseStatus(HttpStatus.OK)
    public FeatureRes getFeature(@PathVariable("id_feature") Long id_feature){
        
        return featureService.getFeature(id_feature);
    }
}
