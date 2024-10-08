package com.nocountry.rentify.exception;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public record ErrorResponse(String message,HttpStatus status, List<String> errors) {
        public ErrorResponse( String message,HttpStatus status) {
            this( message,status, null);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errores = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        ErrorResponse errorResponse = new ErrorResponse("Validación fallida", HttpStatus.BAD_REQUEST ,errores );
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(),HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String message = Objects.requireNonNull(ex.getRootCause()).getMessage();
        ErrorResponse errorResponse = new ErrorResponse(message, HttpStatus.CONFLICT);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Credenciales inválidas",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(PropertyReferenceException.class)
    public ResponseEntity<?> handlePropertyReferenceException(PropertyReferenceException ex) {
        ErrorResponse apiResponse = new ErrorResponse("Invalid parameter: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<ErrorResponse> handleMailSendException(MailSendException ex) {
        String message = ex.getMostSpecificCause().getMessage();
        ErrorResponse errorResponse = new ErrorResponse("Error al enviar el correo electrónico: " + message, HttpStatus.SERVICE_UNAVAILABLE);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse> handleMalformedJwtException(MalformedJwtException ex) {
        String message = "Token JWT malformado o inválido.";
        ErrorResponse errorResponse = new ErrorResponse(message, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponse> handleSignatureException(SignatureException ex) {
        String message = "Token inválido o la firma del token no coincide.";
        ErrorResponse errorResponse = new ErrorResponse(message, HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }


    @ExceptionHandler(IncorrectCurrentPasswordException.class)
    public ResponseEntity<?> handleServiceException(IncorrectCurrentPasswordException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(InvalidAuthorizationHeaderException.class)
    public ResponseEntity<?> handleServiceException(InvalidAuthorizationHeaderException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<?> handleServiceException(InvalidTokenException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(InvalidTokenPurposeException.class)
    public ResponseEntity<?> handleServiceException(InvalidTokenPurposeException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<?> handleServiceException(RoleNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<?> handleServiceException(TokenExpiredException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleServiceException(UserNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(UserNotVerifiedException.class)
    public ResponseEntity<?> handleServiceException(UserNotVerifiedException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

    @ExceptionHandler(UserProfileNotFoundException.class)
    public ResponseEntity<?> handleServiceException(UserProfileNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, errorResponse.status());
    }

}
