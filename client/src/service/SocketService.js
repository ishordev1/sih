// src/service/SocketService.js

const url = "ws://localhost:8080/ws"; // replace with your WS backend URL
const ws = new WebSocket(url);

const callbacks = {
  allLocations: [],
  locationUpdate: [],
  userDisconnected: [],
};

ws.onopen = () => console.log("✅ WS connected to", url);
ws.onclose = () => console.log("❌ WS closed");
ws.onerror = (err) => console.error("⚠️ WS error", err);

ws.onmessage = (evt) => {
  try {
    const msg = JSON.parse(evt.data);
    const { type, data } = msg;

    if (type === "allLocations") callbacks.allLocations.forEach(cb => cb(data));
    else if (type === "locationUpdate") callbacks.locationUpdate.forEach(cb => cb(data));
    else if (type === "userDisconnected") callbacks.userDisconnected.forEach(cb => cb(data));
    else console.warn("Unknown ws message type:", type);
  } catch (e) {
    console.error("Invalid WS message:", e);
  }
};

// Register callbacks
const onAllLocations = (cb) => callbacks.allLocations.push(cb);
const onLocationUpdate = (cb) => callbacks.locationUpdate.push(cb);
const onUserDisconnected = (cb) => callbacks.userDisconnected.push(cb);

// Send location with name & type
const sendMyLocation = (lat, lng, name , vehicleType ) => {
    console.log(lat, lng, name, vehicleType);
    
  const payload = {
    type: "updateLocation",
    data: {
      lat,
      lng,
      name,
      type: vehicleType
    }
  };

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  } else {
    console.warn("WS not open yet - cannot send location");
  }
};

export default {
  onAllLocations,
  onLocationUpdate,
  onUserDisconnected,
  sendMyLocation
};
