import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: iconShadow,
  shadowSize: [41, 41]
});

export default function IpMap({ lat, lng }) {
  if (lat == null || lng == null) return null;

  // Detect mobile screen
  const isMobile = window.innerWidth < 640;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={false} // Disable default zoom control
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            IP Location
          </Popup>
        </Marker>
        {/* Place zoom controls at bottom right on mobile, top right on desktop */}
        <ZoomControl position={isMobile ? "bottomright" : "topright"} />
      </MapContainer>
    </div>
  );
}
