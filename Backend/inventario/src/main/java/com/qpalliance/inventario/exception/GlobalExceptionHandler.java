package com.qpalliance.inventario.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();

        FieldError fieldError = ex.getBindingResult().getFieldError();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Bad Request");
        response.put("message", fieldError != null ? fieldError.getDefaultMessage() : "Error de validación");
        response.put("path", ex.getParameter().getParameterName());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
    
        response.put("timestamp", LocalDateTime.now());
        response.put("status", ex.getStatusCode().value());
        response.put("error", HttpStatus.valueOf(ex.getStatusCode().value()).getReasonPhrase());
        response.put("message", ex.getReason());
        response.put("path", request.getRequestURI());
    
        return new ResponseEntity<>(response, ex.getStatusCode());
    }    
}
