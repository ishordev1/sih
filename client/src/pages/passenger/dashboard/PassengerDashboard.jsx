import React from "react";

import SearchBar from "../../../component/Pessenger/search/SearchBar";
import NearByVehicle from "../../../component/Pessenger/nearBy/NearByVehicle";
import Map from "../../../component/Pessenger/map/Map";
import MapWithShare from "../../../component/common/MapWithShare";



const PassengerDashboard = () => {
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


  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Panel: Search Vehicles */}
        <SearchBar />

        {/* Middle Panel: Map */}
        <div className="col-md-9 p-0">
         <MapWithShare />
        </div>

        {/* Right Panel: Nearby Vehicles */}
        {/* <div className="col-md-3 bg-light p-3 border-start">
         <NearByVehicle/>
        </div> */}
      </div>
    </div>
  );
};

export default PassengerDashboard;
