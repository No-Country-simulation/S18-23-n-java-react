package com.nocountry.rentify.controller.feature;

import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.service.interfaces.FeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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