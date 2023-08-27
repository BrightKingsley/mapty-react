import { Ref, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { LocationMarkerProps } from "../types";

export default function LocationMarker({ workout }: LocationMarkerProps) {
  const map = useMap();

  const markerRef: Ref<any> = useRef();

console.log("desc", workout.descripiton)

  if (!workout.coords) return null;

  useEffect(() => {
    map.flyTo(workout.coords, 13, {
      animate: true,
      duration: 1,
    });
    const marker = markerRef.current;
    if (marker) {
      //@ts-ignore
      marker.openPopup();
    }
  }, []);

  return workout.coords === undefined ? null : (
    <Marker position={workout.coords} ref={markerRef}>
      <Popup className={workout.type+"-popup"}>
        {`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}`} {workout.descripiton}
      </Popup>
    </Marker>
  );
}
