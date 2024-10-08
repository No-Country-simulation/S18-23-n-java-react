package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.request.EmailReq;
import com.nocountry.rentify.exception.UserNotVerifiedException;
import com.nocountry.rentify.model.entity.UserProfile;
import com.nocountry.rentify.model.enums.TokenPurpose;
import com.nocountry.rentify.security.jwt.JwtTokenProvider;
import com.nocountry.rentify.service.interfaces.EmailService;
import com.nocountry.rentify.service.interfaces.UserProfileService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserProfileService userProfileService;

    @Override
    public void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariables(templateModel);

            String htmlBody = templateEngine.process(templateName, context);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            javaMailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendVerificationEmail(EmailReq request) {
        UserProfile profile =  userProfileService.getByUserEmail(request.email());
        if (profile.getUser().isVerify()) {
            throw new UserNotVerifiedException("The user with email " + request.email() + " already has their account verified");
        }

        String token = jwtTokenProvider.generateTokenForPurpose(profile.getUser(), TokenPurpose.VERIFY_EMAIL);

        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("name", profile.getName());
        templateModel.put("verifyEmailUrl","http://localhost:8080/auth/veryfy-email?token="+token);

        sendEmail(profile.getUser().getEmail(),
                "Welcome! Confirm Your Email to Get Started",
                templateModel,
                "email-confirmation");

    }

}
