import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { Filters } from '../App';

import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue in some bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface CropEntry {
  name: string;
  yield: {
    [year: string]: number;
  };
}

interface VictoryNode {
  CARUID: number;
  deviceId?: string;
  location: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  crops: CropEntry[];
}

interface MapViewProps {
  filters: Filters;
}

export default function MapView({ filters }: MapViewProps) {
  const [nodes, setNodes] = useState<VictoryNode[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/crops')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched crop nodes:", data);
        setNodes(data);
      })
      .catch(err => console.error("Error fetching crop data:", err));
  }, []);

  const filteredNodes = nodes.filter(node =>
    node.crops.some(crop => {
      const cropMatch = !filters.crop || filters.crop === 'All' || crop.name === filters.crop;
      const yearMatch = !filters.year ||  (crop.yield[filters.year] !== undefined && crop.yield[filters.year] !== -999);
      return cropMatch && yearMatch;
    })
  );

  return (
    <>
      <h2 style={{ textAlign: 'center', padding: '0.5rem' }}>CropViz Map</h2>
      <MapContainer
        center={[54, -100]}
        zoom={4}
        style={{ height: "90vh", width: "100%" }}
        maxBounds={[
          [40, -140],
          [70, -50],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredNodes.map((node, idx) => (
          node.location?.coordinates && (
            <Marker
              key={idx}
              position={[
                node.location.coordinates[1], // latitude
                node.location.coordinates[0], // longitude
              ]}
              icon={customIcon}
            >
              <Popup>
                <strong>{node.deviceId || "Victory Unit"}</strong><br />
                Region: {node.CARUID}<br />
                Crops: {node.crops.map(c => c.name).join(", ")}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </>
  );
}
