import { Ref, useContext, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { LocationMarkerProps } from "../types";
import { LatLngExpression } from "leaflet";
import AppContext from "../../context/appContext";

export default function LocationMarker({ workout }: LocationMarkerProps) {
  const map = useMap();

  const { currentWorkout } = useContext(AppContext);

  const markerRef: Ref<any> = useRef();


  if (!workout.coords) return null;

  const flyToLocation = (coords: LatLngExpression) => {
    map.flyTo(coords, 13, {
      animate: true,
      duration: 1,
    });
  };

  useEffect(() => {
    if (!currentWorkout) return;
    flyToLocation(currentWorkout?.coords);
    const marker = markerRef.current;
    if (marker) {
      //@ts-ignore
      marker.openPopup();
    }
  }, [currentWorkout]);

  useEffect(() => {
    if (!currentWorkout) return;
    flyToLocation(currentWorkout.coords);
  }, [currentWorkout]);

  return workout.coords === undefined ? null : (
    <Marker position={workout.coords} ref={markerRef}>
      <Popup className={workout.type + "-popup"}>
        {`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}`} {workout.descripiton}
      </Popup>
    </Marker>
  );
}
