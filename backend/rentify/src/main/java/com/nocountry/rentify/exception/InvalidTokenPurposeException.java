package com.nocountry.rentify.exception;

public class InvalidTokenPurposeException extends RuntimeException {
    public InvalidTokenPurposeException(String message) {
        super(message);
    }
}
