import { LatLngExpression } from "leaflet";

export interface Workout {
  date: number;
  id: string;
  descripiton: string;
  coords: LatLngExpression;
  distance: number;
  duration: number;
}

export interface Running extends Workout {
  cadence: number;
  pace: number;
  type: "running";
}

export interface Cycling extends Workout {
  elevationGain: number;
  speed: number;
  type: "cycling";
}
