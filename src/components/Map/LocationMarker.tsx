import { Ref, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { LocationMarkerProps } from "../types";

export default function LocationMarker({ position }: LocationMarkerProps) {
  const map = useMap();

  const markerRef: Ref<any> = useRef();

  if (!position) return null;

//   useEffect(() => {
//     const marker = markerRef.current;
//     if(marker){
//         //@ts-ignore
//         marker.openPopup()
//     }
//   }, []);

  return position === undefined ? null : (
    <Marker position={position} ref={markerRef}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
