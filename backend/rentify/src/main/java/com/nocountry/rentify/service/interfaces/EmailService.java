package com.nocountry.rentify.service.interfaces;


import com.nocountry.rentify.dto.request.EmailReq;
import java.util.Map;

public interface EmailService {

    /**
     * Sends an email to the specified recipient using a specified template.
     *
     * @param to            the recipient's email address
     * @param subject       the subject of the email
     * @param templateModel a map containing the data to be injected into the template
     * @param templateName  the name of the email template to use
     */
    void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName);

    /**
     * Sends a verification email to the user after registration.
     *
     * @param request the DTO containing the user's email address for verification
     */
    void sendVerificationEmail(EmailReq request);

}
