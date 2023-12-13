package com.sonu.Myapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.sonu.Myapp.exception.CustomerServiceException;
import com.sonu.Myapp.model.AuthRequest;
import com.sonu.Myapp.model.CustomerRequest;
import com.sonu.Myapp.model.CustomerResponse;

@Service
public class ApiService {

    @Value("${BASE_URL}")
    private String baseUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AuthService authService;

    @Value("${base.api.url}")
    private String BASE_URL;

    public String authenticate(AuthRequest authRequest) {
        try {
            String token = authService.authenticateUser(authRequest);

            if (token != null && !token.isEmpty()) {
                return token;
            } else {
                throw new CustomerServiceException("Authentication failed.");
            }
        } catch (Exception e) {
            throw new CustomerServiceException("Error authenticating user.", e);
        }
    }

    public String createCustomer(String token, CustomerRequest customerRequest) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            headers.set("Content-Type", "application/json");

            HttpEntity<CustomerRequest> request = new HttpEntity<>(customerRequest, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    BASE_URL + "/assignment.jsp?cmd=create",
                    HttpMethod.POST,
                    request,
                    String.class
            );

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return "Successfully Created";
            } else if (responseEntity.getStatusCode().is4xxClientError()) {
                throw new CustomerServiceException("First Name or Last Name is missing");
            } else {
                throw new HttpServerErrorException(responseEntity.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            throw new CustomerServiceException("Error creating customer. Status code: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new CustomerServiceException("Unexpected error creating customer.", e);
        }
    }

    public List<CustomerResponse> getCustomerList(String token) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            HttpEntity<Void> request = new HttpEntity<>(headers);

            ResponseEntity<CustomerResponse[]> responseEntity = restTemplate.exchange(
                    BASE_URL + "/assignment.jsp?cmd=get_customer_list",
                    HttpMethod.GET,
                    request,
                    CustomerResponse[].class
            );

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return List.of(responseEntity.getBody());
            } else {
                throw new HttpServerErrorException(responseEntity.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            throw new CustomerServiceException("Error fetching customer list. Status code: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new CustomerServiceException("Unexpected error fetching customer list.", e);
        }
    }

    public String deleteCustomer(String token, String uuid) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            HttpEntity<Void> request = new HttpEntity<>(headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    BASE_URL + "/assignment.jsp?cmd=delete&uuid=" + uuid,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return "Successfully deleted";
            } else if (responseEntity.getStatusCode().is4xxClientError()) {
                throw new CustomerServiceException("UUID not found");
            } else {
                throw new HttpServerErrorException(responseEntity.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            throw new CustomerServiceException("Error deleting customer. Status code: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new CustomerServiceException("Unexpected error deleting customer.", e);
        }
    }

    public String updateCustomer(String token, String uuid, CustomerRequest customerRequest) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            headers.set("Content-Type", "application/json");

            HttpEntity<CustomerRequest> request = new HttpEntity<>(customerRequest, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    BASE_URL + "/assignment.jsp?cmd=update&uuid=" + uuid,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return "Successfully Updated";
            } else if (responseEntity.getStatusCode().is4xxClientError()) {
                throw new CustomerServiceException("UUID not found");
            } else {
                throw new HttpServerErrorException(responseEntity.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            throw new CustomerServiceException("Error updating customer. Status code: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new CustomerServiceException("Unexpected error updating customer.", e);
        }
    }
}


