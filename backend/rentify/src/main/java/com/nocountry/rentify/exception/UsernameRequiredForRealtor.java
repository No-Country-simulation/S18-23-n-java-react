package com.nocountry.rentify.exception;

public class UsernameRequiredForRealtor extends RuntimeException {
    public UsernameRequiredForRealtor(String message) {
        super(message);
    }
}