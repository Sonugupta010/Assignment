package com.sonu.Myapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String login() {
        return "login";
    }

    @GetMapping("/customerList")
    public String customerList() {
        return "customerList";
    }

    @GetMapping("/newCustomer")
    public String newCustomer() {
        return "newCustomer";
    }
}

