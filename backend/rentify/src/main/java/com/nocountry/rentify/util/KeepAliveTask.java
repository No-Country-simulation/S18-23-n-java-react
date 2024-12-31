package com.nocountry.rentify.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class KeepAliveTask {
    private final RestTemplate restTemplate;
    @Value("${api.url}")
    private String backendUrl;
    @Value("${api.base}")
    private String apiBase;

    public  KeepAliveTask(){
        this.restTemplate = new RestTemplate();
    }

    @Scheduled(fixedRate = 840000)
    public void keepAlive(){
        restTemplate.getForObject(backendUrl + "/" + apiBase + "/healthcheck", String.class);
        log.info("keeping server alive!");
    }

}
