import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom vehicle icons
const vehicleIcons = {
  bus: new L.Icon({ iconUrl: "/icons/marker/bus.png", iconSize: [50,50], shadowUrl: "/icons/marker/shadow.png" }),
  autoLG: new L.Icon({ iconUrl: "/icons/marker/auto-lg.png", iconSize: [50,50], shadowUrl: "/icons/marker/shadow.png" }),
  autoSM: new L.Icon({ iconUrl: "/icons/marker/auto-sm.png", iconSize: [50,50], shadowUrl: "/icons/marker/shadow.png" }),
  taxi: new L.Icon({ iconUrl: "/icons/marker/texi.png", iconSize: [50,50], shadowUrl: "/icons/marker/shadow.png" }),
  car: new L.Icon({ iconUrl: "/icons/marker/car.png", iconSize: [50,50], shadowUrl: "/icons/marker/shadow.png" }),
  default: new L.Icon({ iconUrl: "/icons/marker/default.png", iconSize: [25,41], shadowUrl: "/icons/marker/shadow.png" }),
};

// Fix default marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

// Recenter map
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => { if(position) map.setView(position, map.getZoom()); }, [position, map]);
  return null;
};

const MapComponent = ({ vehicles }) => {
  console.log(vehicles);
  
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if(navigator.geolocation){
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  if(!userLocation) return <div>Loading map...</div>;

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap position={userLocation} />
      <Marker position={userLocation}>
        <Popup>You are here 🚶</Popup>
      </Marker>
      {vehicles && vehicles.map(v => (
        <Marker
          key={v.id}
          position={v.location}
          icon={vehicleIcons[v.type] || vehicleIcons.default}
        >
          <Popup>{v.name} <br /> ETA: {v.eta}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
