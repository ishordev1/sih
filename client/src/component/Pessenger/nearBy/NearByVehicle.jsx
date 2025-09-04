import React from 'react'

const NearByVehicle = () => {
      // Dummy nearby vehicles
  const nearbyVehicles = [
    { id: 1, name: "Vehicle-101", location: "Alkapuri", eta: "5 min" },
    { id: 2, name: "Vehicle-202", location: "Sayajigunj", eta: "8 min" },
    { id: 3, name: "Vehicle-303", location: "Kalupur", eta: "12 min" },
  ];
  return (
    <>
     <h5 className="mb-3">🚗 Nearby Vehicles</h5>
          {nearbyVehicles.map((vehicle) => (
            <div key={vehicle.id} className="card mb-3 shadow-sm">
              <div className="card-body p-2">
                <h6 className="mb-1">{vehicle.name}</h6>
                <p className="mb-1 small text-muted">{vehicle.location}</p>
                <span className="badge bg-success">{vehicle.eta}</span>
              </div>
            </div>
          ))}
    </>
  )
}

export default NearByVehicle