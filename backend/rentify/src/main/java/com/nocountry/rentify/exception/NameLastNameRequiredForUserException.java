package com.nocountry.rentify.exception;

public class NameLastNameRequiredForUserException extends RuntimeException {
    public NameLastNameRequiredForUserException(String message) {
        super(message);
    }
}
