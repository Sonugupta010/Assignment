package com.sonu.Myapp.exception;

public class CustomerServiceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public CustomerServiceException(String message) {
        super(message);
    }

    public CustomerServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

