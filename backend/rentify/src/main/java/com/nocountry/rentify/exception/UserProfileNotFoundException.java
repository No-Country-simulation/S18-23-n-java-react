package com.nocountry.rentify.exception;

public class UserProfileNotFoundException extends  RuntimeException{
    public UserProfileNotFoundException(String message) {
        super(message);
    }
}
