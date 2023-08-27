import { useMapEvent } from "react-leaflet";
import { SetLocationsProps } from "../types";

export default function SetLocations({ displayForm }: SetLocationsProps) {
  const mapEvents = useMapEvent("click", (e) => {
    mapEvents.setView(e.latlng, mapEvents.getZoom(), {
      animate: true,
      duration:1
    });
    displayForm(e.latlng);
  });

  return <></>;
}
