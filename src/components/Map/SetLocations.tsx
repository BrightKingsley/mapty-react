import { useMapEvent } from "react-leaflet";
import { SetLocationsProps } from "../types";

export default function SetLocations({ displayForm, setShowSide }: SetLocationsProps) {
  const mapEvents = useMapEvent("click", (e) => {
    // mapEvents.setView(e.latlng, mapEvents.getZoom(), {
    //   animate: true,
    //   duration: 1,
    // });
    setShowSide(true);
    displayForm(e.latlng);
  });

  return <></>;
}
