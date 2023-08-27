import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { MapProps } from "../types";
import SetLocations from "./SetLocations";

export default function Map({ displayForm, locations }: MapProps) {
  return (
    <MapContainer id="map" center={[51.705, -0.091]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <SetLocations displayForm={displayForm} />
      {locations?.map((location) => (
        <LocationMarker key={Math.random()} position={location} />
      ))}
    </MapContainer>
  );
}
