import { LatLng, LatLngExpression } from "leaflet";
import { Cycling, Running } from "../models/Workout";

export type MapProps = {
  displayForm: Function;
  displayMarker: Function;
  locations: LatLngExpression[] | undefined;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarProps = {
  coords: LatLngExpression | undefined;
  showForm: boolean;
  showSide:boolean
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
  workouts: (Running | Cycling)[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkouts: React.Dispatch<React.SetStateAction<any[]>>;
};

export type LocationMarkerProps = {
  position: LatLngExpression | undefined;
};

export type SetLocationsProps = {
  positions?: LatLngExpression[] | undefined;
  displayForm: Function;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
};
