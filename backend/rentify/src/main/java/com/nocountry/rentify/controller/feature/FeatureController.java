package com.nocountry.rentify.controller.feature;

import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.service.interfaces.FeatureService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.base}/features")
@RequiredArgsConstructor
public class FeatureController {
    private final FeatureService featureService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureRes> getAllFeatures(){
        return featureService.getAllFeatures();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FeatureRes getFeature(@PathVariable("id") Long id){
        return featureService.getFeatureById(id);
    }
}