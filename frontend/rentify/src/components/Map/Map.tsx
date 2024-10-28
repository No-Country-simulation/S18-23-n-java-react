import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Popup,
  AttributionControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface MapProps {
  isView: boolean;
  latitude: number;
  longitude: number;
  changePosition?: (latitude: number, longitude: number) => void;
}

const Map: React.FC<MapProps> = ({
  isView,
  latitude,
  longitude,
  changePosition,
}) => {
  const [position, setPosition] = useState<[number, number] | null>([
    latitude,
    longitude,
  ]);

  // Custom hook to keep the map centered on the new position
  const CenterMap = () => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    return null;
  };

  useEffect(() => {
    if (isView && latitude !== undefined && longitude !== undefined) {
      setPosition([latitude, longitude]);
    }
  }, [isView, latitude, longitude]);

  const LocationMarker = () => {
    useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        if (!isView) {
          const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
          setPosition(newPosition);
          if (changePosition != null) {
            changePosition(newPosition[0], newPosition[1]);
          }
        }
      },
    });

    if (position) {
      return (
        <Marker position={position}>
          <Popup></Popup>
        </Marker>
      );
    }
    return null;
  };

  return (
    <MapContainer
      center={position || [latitude, longitude]}
      zoom={20}
      style={{ height: '50vh', width: '100%' }}
    >
      <AttributionControl position="bottomright" />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CenterMap />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
