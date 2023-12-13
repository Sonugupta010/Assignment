package com.sonu.Myapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonu.Myapp.model.AuthRequest;
import com.sonu.Myapp.model.CustomerRequest;
import com.sonu.Myapp.model.CustomerResponse;
import com.sonu.Myapp.service.ApiService;

@RestController
@RequestMapping("/api")
public class apiController {

    @Autowired
    private ApiService apiService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateUser(@RequestBody AuthRequest authRequest) {
        String token = apiService.authenticate(authRequest);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/createCustomer")
    public ResponseEntity<String> createCustomer(@RequestHeader("Authorization") String token,
                                                @RequestBody CustomerRequest customerRequest) {
        String result = apiService.createCustomer(token, customerRequest);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getCustomerList")
    public ResponseEntity<List<CustomerResponse>> getCustomerList(@RequestHeader("Authorization") String token) {
        List<CustomerResponse> customerList = apiService.getCustomerList(token);
        return ResponseEntity.ok(customerList);
    }

    @PostMapping("/deleteCustomer")
    public ResponseEntity<String> deleteCustomer(@RequestHeader("Authorization") String token,
                                                @RequestParam String uuid) {
        String result = apiService.deleteCustomer(token, uuid);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateCustomer")
    public ResponseEntity<String> updateCustomer(@RequestHeader("Authorization") String token,
                                                @RequestParam String uuid,
                                                @RequestBody CustomerRequest customerRequest) {
        String result = apiService.updateCustomer(token, uuid, customerRequest);
        return ResponseEntity.ok(result);
    }
}

