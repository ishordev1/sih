package com.transitShare.serviceImpl;

import org.springframework.stereotype.Service;
import com.transitShare.dto.Location;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserLocationServiceImpl  {

    private final Map<String, Location> userLocations = new ConcurrentHashMap<>();

    public void addOrUpdateLocation(String sessionId, Location location) {
        location.setSessionId(sessionId);
        userLocations.put(sessionId, location);
    }

    public void removeLocation(String sessionId) {
        userLocations.remove(sessionId);
    }

    public List<Location> getAllLocations() {
        return new ArrayList<>(userLocations.values());
    }
}
