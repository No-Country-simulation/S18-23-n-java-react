package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.property.EnumRes;
import java.util.List;

public interface EnumService {
    public List<EnumRes> getAllStatuses();

    public List<EnumRes> getAllAntiquities();

    public List<EnumRes> getAllPropertyTypes();
}
