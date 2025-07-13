import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { Filters } from '../App';

import 'leaflet/dist/leaflet.css';


const createImageIcon = (src: string) =>
  new L.Icon({
    iconUrl: src,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "", // remove default shadow
  });


interface CropEntry {
  name: string;
  yield: {
    [year: string]: number;
  };
}

interface Node {
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
  const [nodes, setNodes] = useState<Node[]>([]);

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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredNodes.map((node, idx) => {
          // Get the first crop that has a corresponding icon
          const availableIcons = ['barley', 'canola', 'corn', 'oats', 'soybeans', 'wheat'];
          const firstCropWithIcon = node.crops.find(crop => 
            availableIcons.includes(crop.name.toLowerCase())
          );
          
          // Use the first crop with an icon, or fallback to default
          const cropName = firstCropWithIcon?.name.toLowerCase() || 'default';
          const iconPath = `/icons/${cropName}.svg`;
          console.log(`Node ${idx}: crop=${cropName}, icon=${iconPath}`);
          
          return node.location?.coordinates && (
            <Marker
              key={idx}
              position={[
                node.location.coordinates[1], // latitude
                node.location.coordinates[0], // longitude
              ]}
              icon={createImageIcon(iconPath)}
            >
              <Popup>
                <strong>{node.deviceId || "Unit"}</strong><br />
                Region: {node.CARUID}<br />
                Crops: {node.crops.map(c => c.name).join(", ")}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}
