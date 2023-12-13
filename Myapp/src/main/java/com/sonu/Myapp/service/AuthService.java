package com.sonu.Myapp.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sonu.Myapp.model.AuthRequest;

@Service
public class AuthService {

	@Value("${auth.api.url:https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp}")
	private String AUTH_URL;  // Use application.properties or application.yml to externalize properties

    private final RestTemplate restTemplate;

    public AuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String authenticateUser(AuthRequest authRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<AuthRequest> request = new HttpEntity<>(authRequest, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                AUTH_URL,
                HttpMethod.POST,
                request,
                String.class
        );

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();  // Assuming the token is returned in the response body
        } else {
            // Handle authentication failure
            throw new RuntimeException("Authentication failed. Status code: " + responseEntity.getStatusCodeValue());
        }
    }
}

