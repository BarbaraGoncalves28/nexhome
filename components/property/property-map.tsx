"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

type Props = {
  latitude: number;
  longitude: number;
  title: string;
};

export function PropertyMap({
  latitude,
  longitude,
  title,
}: Props) {
  return (
    <MapContainer
      center={[
        latitude,
        longitude,
      ]}
      zoom={15}
      scrollWheelZoom={false}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          latitude,
          longitude,
        ]}
      >
        <Popup>
          {title}
        </Popup>
      </Marker>
    </MapContainer>
  );
}