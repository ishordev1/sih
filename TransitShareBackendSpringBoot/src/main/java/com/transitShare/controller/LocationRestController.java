package com.transitShare.controller;

import org.springframework.web.bind.annotation.*;
import com.transitShare.dto.Location;
import com.transitShare.serviceImpl.UserLocationServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationRestController {

    private final UserLocationServiceImpl locationService;

    public LocationRestController(UserLocationServiceImpl locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAll() {
        return locationService.getAllLocations();
    }
}
