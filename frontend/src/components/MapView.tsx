// src/components/MapView.tsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';                       // optional if you later add icons
import { Filters } from '../App';              // type exported from App.tsx



/* ------------ Types ----------------------------------------------------- */
export type CropNode = {
  CARUID: number;
  deviceId: string;
  CROP: string;
  location?: { coordinates: [number, number] };   // [lng, lat]
  crops: { name: string; yield: Record<string, number> }[];
  [key: string]: any; // allows Y#### / A#### fields
};

type MapViewProps = { filters: Filters };

/* ------------ Component ------------------------------------------------- */
export default function MapView({ filters }: MapViewProps) {
  const [allNodes, setAllNodes] = useState<CropNode[]>([]);
  const [filtered, setFiltered] = useState<CropNode[]>([]);

  /* ---- Fetch once on mount ---- */
  useEffect(() => {
    fetch('http://localhost:5000/api/crops')
      .then((res) => res.json())
      .then((data: CropNode[]) => {
        console.log('📥 Raw crop-nodes:', data.length);
        setAllNodes(data);
      })
      .catch((err) => console.error('Error fetching crop data:', err));
  }, []);

  /* ---- Re-filter whenever filters or data change ---- */
  useEffect(() => {
    const result = allNodes.filter((node) => {
      /* crop filter */
      const cropOk =
        filters.crop === 'All' ||
        node.CROP?.toLowerCase() === filters.crop.toLowerCase();

      /* year filter */
      const yearKey = `Y${filters.year}`;
      const yVal = node[yearKey];
      const yearOk =
        filters.year == 0 || (yVal !== undefined && yVal !== -999);

      return cropOk && yearOk;
    });
    console.log('🔎 After filter:', result.length);
    setFiltered(result);
  }, [filters, allNodes]);

  /* --------------------------------------------------------------------- */
  return (
    <>
      <h2 className="text-center py-2">
        CropViz Map — showing {filtered.length} nodes
      </h2>

      <MapContainer
        center={[54, -100]}
        zoom={4}
        style={{ height: '90vh', width: '100%' }}
        maxBounds={[
          [40, -140], // SW corner of Canada-ish
          [70, -50],  // NE corner
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filtered.map((node, idx) => {
          const coords = node.location?.coordinates;
          if (!coords || coords.length !== 2) return null;

          const [lng, lat] = coords; // stored as [lng, lat]

          return (
            <Marker key={idx} position={[lat, lng]}>
              <Popup>
                <strong>{node.deviceId}</strong>
                <br />
                Region (CARUID): {node.CARUID}
                <br />
                Crop: {node.CROP}
                <br />
                Yield {filters.year}: {node[`Y${filters.year}`] ?? 'N/A'}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}
