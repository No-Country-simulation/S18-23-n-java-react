package com.nocountry.rentify.exception;

public class IncorrectCurrentPasswordException extends RuntimeException {
    public IncorrectCurrentPasswordException(String message) {
        super(message);
    }
}
