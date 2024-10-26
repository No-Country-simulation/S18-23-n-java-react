package com.nocountry.rentify.controller.property;


import com.nocountry.rentify.dto.response.property.EnumRes;
import com.nocountry.rentify.service.interfaces.EnumService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/enum")
public class EnumController {

    private final EnumService enumService;

    @GetMapping("/statuses")
    @ResponseStatus(HttpStatus.OK)
    public List<EnumRes> getStatuses() {
        return enumService.getAllStatuses();
    }

    @GetMapping("/antiquities")
    @ResponseStatus(HttpStatus.OK)
    public List<EnumRes> getAntiquities() {
        return enumService.getAllAntiquities();
    }

    @GetMapping("/property-types")
    @ResponseStatus(HttpStatus.OK)
    public List<EnumRes> getPropertyTypes() {
        return enumService.getAllPropertyTypes();
    }

    @GetMapping("/property-multimedia-types")
    @ResponseStatus(HttpStatus.OK)
    public List<EnumRes> getPropertyMultimediaTypes(){
        return enumService.getAllPropertyMultimediaTypes();
    }
}
