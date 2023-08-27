import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { MapProps } from "../types";
import SetLocations from "./SetLocations";
import { BiMenu } from "react-icons/bi";

export default function Map({ displayForm, workouts, setShowSide }: MapProps) {
console.log("WORKSSS==>",workouts)

  return (
    <>
      <button
        className="menu-btn"
        onClick={() => setShowSide((prev) => !prev)}
        style={{
          color: "white",
          fontSize: 16,
          // width: "40px",
          // height: "40px",
          padding: "0.5rem",
          zIndex: 100000000,
          position: "absolute",
          top: "1rem",
          right: "1rem",
          backgroundColor: "grey",
          alignSelf: "end",
          cursor: "pointer",
          borderRadius: "0.5rem",
        }}
      >
        <BiMenu />
      </button>
      <MapContainer id="map" center={[51.705, -0.091]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <SetLocations displayForm={displayForm} setShowSide={setShowSide} />
        {workouts?.map((workout) => (
          <LocationMarker key={Math.random()} workout={workout} />
        ))}
      </MapContainer>
    </>
  );
}
