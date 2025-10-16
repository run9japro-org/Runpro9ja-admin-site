import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom delivery icon
const deliveryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      location: [6.5244, 3.3792], // Victoria Island
      name: "Victoria Island",
      status: "In Transit",
      rider: "Samuel Biyomi",
    },
    {
      id: 2,
      location: [6.5355, 3.3954], // Ikoyi
      name: "Ikoyi",
      status: "Pending",
      rider: "Adeola Johnson",
    },
    {
      id: 3,
      location: [6.528, 3.385], // UNILAG
      name: "UNILAG",
      status: "Delivered",
      rider: "Chinedu Okoro",
    },
    {
      id: 4,
      location: [6.52, 3.39], // Shomolu Bariga
      name: "Shomolu Bariga",
      status: "In Transit",
      rider: "Fatima Bello",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveries((prev) =>
        prev.map((delivery) => ({
          ...delivery,
          location: [
            delivery.location[0] + (Math.random() - 0.5) * 0.001,
            delivery.location[1] + (Math.random() - 0.5) * 0.001,
          ],
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const center = [6.5244, 3.3792]; // Lagos center

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Delivery Realtime Map
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {deliveries.map((delivery) => (
                  <Marker
                    key={delivery.id}
                    position={delivery.location}
                    icon={deliveryIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <strong>{delivery.name}</strong>
                        <br />
                        Status: {delivery.status}
                        <br />
                        Rider: {delivery.rider}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Delivery List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Active Deliveries
          </h3>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {delivery.name}
                    </h4>
                    <p className="text-sm text-gray-600">{delivery.rider}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      delivery.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : delivery.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {delivery.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Delivery Locations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
            <span className="text-sm font-medium">Victoria Island</span>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <span className="text-sm font-medium">Shomolu Bariga</span>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
            <span className="text-sm font-medium">UNILAG</span>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
            <span className="text-sm font-medium">Ikoyi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
