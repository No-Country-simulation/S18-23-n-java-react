import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

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
/*   const CenterMap = () => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    return null;
  }; */

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
        <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
