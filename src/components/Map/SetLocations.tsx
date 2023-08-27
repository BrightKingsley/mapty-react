import { useMapEvent } from "react-leaflet";
import { SetLocationsProps } from "../types";
import AppContext from "../../context/appContext";
import { useContext } from "react";

export default function SetLocations({}: SetLocationsProps) {
  const { displayForm, setShowSide } = useContext(AppContext);

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
