import { LatLng, LatLngExpression } from "leaflet";
import { Cycling, Running } from "../models/Workout";

export type MapProps = {
  displayForm: Function;
  displayMarker:Function
  locations: LatLngExpression[] | undefined;
};

export type SidebarProps = {
  coords: LatLngExpression | undefined;
  showForm: boolean;
  workouts: (Running | Cycling)[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkouts: React.Dispatch<React.SetStateAction<(any)[]>>;
};

export type LocationMarkerProps = {
  position: LatLngExpression | undefined;
};

export type SetLocationsProps = {
  positions?: LatLngExpression[] | undefined;
  displayForm: Function;
};
