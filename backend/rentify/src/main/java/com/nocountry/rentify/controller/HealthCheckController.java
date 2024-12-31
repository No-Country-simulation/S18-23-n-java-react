package com.nocountry.rentify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.base}/healthcheck")
public class HealthCheckController {
    @GetMapping
    public String healthCheck() {
        return "OK";
    }
}
