import React, { createContext, useState } from "react";
import { LatLngExpression } from "leaflet";
import type { Map } from "leaflet";
import { Cycling, Running } from "../models/Workout";

type AppContextTypes = {
  displayForm: Function;
  flyToLocation: Function;
  workouts: (Running | Cycling)[];
  //   setWorkouts: React.Dispatch<React.SetStateAction<(Running | Cycling)[]>>;
  setWorkouts: React.Dispatch<React.SetStateAction<any[]>>;
  showSide: boolean;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  newLocation: LatLngExpression;
  currentWorkout: Running | Cycling | null;
  // setCurrentWorkout: React.Dispatch<
  //   React.SetStateAction<Running | Cycling | null>
  // >;
  setCurrentWorkout: React.Dispatch<
    React.SetStateAction<any>
  >;
};

const AppContext = createContext<AppContextTypes>({
  displayForm: () => {},
  flyToLocation: Function,
  workouts: [],
  setWorkouts: () => {},
  showSide: false,
  setShowSide: () => {},
  showForm: false,
  setShowForm: () => {},
  newLocation: [0, 0],
  currentWorkout: null,
  setCurrentWorkout: () => {},
});

export const AppContextProvoider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSide, setShowSide] = useState(true);
  const [workouts, setWorkouts] = useState<(Running | Cycling)[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newLocation, setNewLocation] = useState<LatLngExpression>([0, 0]);
  const [currentWorkout, setCurrentWorkout] = useState<
    Running | Cycling | null
  >(null);

  const displayForm = (latlng: LatLngExpression) => {
    setNewLocation(latlng);
    setShowForm(true);
  };

  const flyToLocation = ({
    map,
    coords,
  }: {
    map: Map;
    coords: LatLngExpression;
  }) => {
    map.flyTo(coords, 13, {
      animate: true,
      duration: 1,
    });
  };
  return (
    <AppContext.Provider
      value={{
        displayForm,
        flyToLocation,
        workouts,
        setWorkouts,
        showSide,
        setShowSide,
        showForm,
        setShowForm,
        newLocation,
        currentWorkout,
        setCurrentWorkout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
