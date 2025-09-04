package com.transitShare.socket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.transitShare.dto.Location;
import com.transitShare.serviceImpl.UserLocationServiceImpl;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
public class LocationWebSocketHandler extends TextWebSocketHandler {

    private final UserLocationServiceImpl locationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Thread-safe collection of sessions
    private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    public LocationWebSocketHandler(UserLocationServiceImpl locationService) {
        this.locationService = locationService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("✅ Client connected: " + session.getId());
        sessions.add(session);

        // send all existing locations to the new user
        String msg = objectMapper.writeValueAsString(locationService.getAllLocations());
        safeSend(session, new TextMessage("{\"type\":\"allLocations\",\"data\":" + msg + "}"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode json = objectMapper.readTree(message.getPayload());
        String type = json.get("type").asText();

        if ("updateLocation".equals(type)) {
            JsonNode data = json.get("data");

            String sessionId = session.getId();
            double lat = data.get("lat").asDouble();
            double lng = data.get("lng").asDouble();
            String name = data.get("name").asText();
            String types = data.get("type").asText();

            // store in map
            Location loc = new Location(sessionId, lat, lng, name, types);
            locationService.addOrUpdateLocation(session.getId(), loc);

            String broadcast = objectMapper.writeValueAsString(loc);
            broadcastAll("{\"type\":\"locationUpdate\",\"data\":" + broadcast + "}");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("❌ Client disconnected: " + session.getId());
        sessions.remove(session);

        locationService.removeLocation(session.getId());
        broadcastAll("{\"type\":\"userDisconnected\",\"data\":\"" + session.getId() + "\"}");
    }

    // 🔒 Thread-safe send to one session
    private void safeSend(WebSocketSession session, TextMessage message) {
        synchronized (session) {
            try {
                if (session.isOpen()) {
                    session.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // 📢 Broadcast to all sessions safely
    private void broadcastAll(String json) {
        TextMessage msg = new TextMessage(json);
        for (WebSocketSession s : sessions) {
            safeSend(s, msg);
        }
    }
}
