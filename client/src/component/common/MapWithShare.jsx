import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import socketService from "../../service/SocketService";

// const vehicles = [
//   { id: 1, name: "Bus-101", location: [22.3072, 73.1812], type: "bus", eta: "5 min" },       // Vadodara
//   { id: 2, name: "Car-202", location: [23.0225, 72.5714], type: "car", eta: "3 min" },       // Ahmedabad
//   { id: 3, name: "Auto-303", location: [21.1702, 72.8311], type: "autoLG", eta: "7 min" },   // Surat
//   { id: 4, name: "Auto-304", location: [22.3039, 70.8022], type: "autoSM", eta: "6 min" },   // Rajkot
//   { id: 5, name: "Bus-102", location: [21.7051, 73.0551], type: "bus", eta: "10 min" },      // Bharuch
//   { id: 6, name: "Car-203", location: [21.6251, 73.0080], type: "car", eta: "4 min" },      // Ankleshwar
//   { id: 7, name: "Auto-305", location: [22.6940, 72.8600], type: "autoSM", eta: "8 min" },  // Jamnagar
//   { id: 8, name: "Bus-103", location: [23.2156, 72.6369], type: "bus", eta: "12 min" },     // Gandhinagar
//   { id: 9, name: "Car-204", location: [22.3110, 73.1180], type: "car", eta: "2 min" },      // Vadodara outskirts
//   { id: 10, name: "Auto-306", location: [21.5272, 70.4579], type: "autoLG", eta: "9 min" }, // Porbandar
//   { id: 11, name: "Bus-104", location: [23.0785, 72.5246], type: "bus", eta: "15 min" },    // Ahmedabad
//   { id: 12, name: "Car-205", location: [21.5090, 73.0169], type: "car", eta: "5 min" },     // Ankleshwar
//   { id: 13, name: "Auto-307", location: [22.3030, 70.8020], type: "autoSM", eta: "7 min" }, // Rajkot
//   { id: 14, name: "Bus-105", location: [21.1700, 72.8320], type: "bus", eta: "11 min" },    // Surat
//   { id: 15, name: "Car-206", location: [22.5726, 88.3639], type: "taxi", eta: "6 min" },    // Kolkata (just for far location example)
// ];

const MapWithShare = () => {
    const [vehicles, setVehicles] = useState([
        { id: 1, name: "Bus-101", location: [22.3072, 73.1812], type: "bus", eta: "5 min" },
        { id: 2, name: "Car-202", location: [23.0225, 72.5714], type: "car", eta: "3 min" },
        { id: 3, name: "Auto-303", location: [21.1702, 72.8311], type: "autoLG", eta: "7 min" },
        { id: 4, name: "Auto-304", location: [22.3039, 70.8022], type: "autoSM", eta: "6 min" },   // Rajkot
  { id: 5, name: "Bus-102", location: [21.7051, 73.0551], type: "bus", eta: "10 min" },      // Bharuch
  { id: 6, name: "Car-203", location: [21.6251, 73.0080], type: "car", eta: "4 min" },      // Ankleshwar
  { id: 7, name: "Auto-305", location: [22.6940, 72.8600], type: "autoSM", eta: "8 min" },  // Jamnagar
  { id: 8, name: "Bus-103", location: [23.2156, 72.6369], type: "bus", eta: "12 min" },     // Gandhinagar
  { id: 9, name: "Car-204", location: [22.3110, 73.1180], type: "car", eta: "2 min" },      // Vadodara outskirts
  { id: 10, name: "Auto-306", location: [21.5272, 70.4579], type: "autoLG", eta: "9 min" }, // Porbandar
  { id: 11, name: "Bus-104", location: [23.0785, 72.5246], type: "bus", eta: "15 min" },    // Ahmedabad
  { id: 12, name: "Car-205", location: [21.5090, 73.0169], type: "car", eta: "5 min" },     // Ankleshwar
  { id: 13, name: "Auto-307", location: [22.3030, 70.8020], type: "autoSM", eta: "7 min" }, // Rajkot
  { id: 14, name: "Bus-105", location: [21.1700, 72.8320], type: "bus", eta: "11 min" },    // Surat
  { id: 15, name: "Car-206", location: [22.5726, 88.3639], type: "taxi", eta: "6 min" }, 
    ]);

    const [sharedLocations, setSharedLocations] = useState([]);
    const [formData, setFormData] = useState({ name: "", type: "car" });
    const [userLocation, setUserLocation] = useState(null);

    // Get user browser location continuously
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
                err => console.error(err),
                { enableHighAccuracy: true }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    // WebSocket events
    useEffect(() => {
        socketService.onAllLocations(locs => setSharedLocations(locs));

        socketService.onLocationUpdate(loc => {
            setSharedLocations(prev => [...prev.filter(l => l.sessionId !== loc.sessionId), loc]);
        });

        socketService.onUserDisconnected(id => {
            setSharedLocations(prev => prev.filter(l => l.sessionId !== id));
        });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) return alert("Enter your name!");
        if (!userLocation) return alert("Getting your location...");

        const [lat, lng] = userLocation;
        // console.log(lat, lng, formData.name, formData.type);

        // Pass name and type to service
        socketService.sendMyLocation(lat, lng, formData.name, formData.type);
    };

    return (
        <div style={{ display: "flex", height: "100%" }}>
            {/* Map */}
            <div style={{ flex: 3 }}>

                <MapComponent vehicles={[
                    ...vehicles,
                    ...sharedLocations.map(loc => ({
                        id: loc.sessionId || loc.id,
                        name: loc.name || "User",
                        location: [loc.lat, loc.lng],
                        type: loc.type || "default",
                        eta: loc.eta || "-"
                    }))
                ]} />

            </div>

           {/* Share Location Form */}
<div className="col-md-4 p-4 border-start" style={{ height: "100vh", overflowY: "auto" }}>
  <h3 className="mb-4">Share Your Location</h3>

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="nameInput" className="form-label">Vachicle</label>
      <input
        id="nameInput"
        type="text"
        className="form-control"
        placeholder="Enter vachicle name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />
    </div>

    <div className="mb-3">
      <select
        id="typeSelect"
        className="form-select"
        value={formData.type}
        onChange={e => setFormData({ ...formData, type: e.target.value })}
      >

        <option value="bus">Bus</option>
        {/* <option value="car">Car</option>
        <option value="autoLG">Auto-LG</option>
        <option value="autoSM">Auto-SM</option> */}
        <option value="taxi">Taxi</option>
      </select>
    </div>

    <button type="submit" className="btn btn-primary w-100">Share Location</button>
  </form>

  {/* <h4 className="mt-5">Shared Users</h4>
  <ul className="list-group">
    {sharedLocations.map(loc => (
      <li key={loc.sessionId} className="list-group-item d-flex justify-content-between align-items-center">
        <span>{loc.name || "User"}</span>
        <span className="badge bg-secondary">
          {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
        </span>
      </li>
    ))}
  </ul> */}
</div>

        </div>
    );
};

export default MapWithShare;
