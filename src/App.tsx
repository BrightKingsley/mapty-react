import { useState } from "react";
import { Map, Sidebar } from "./components";
import { LatLngExpression } from "leaflet";
import { Cycling, Running } from "./models/Workout";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [newLocation, setNewLocation] = useState<LatLngExpression>();
    const [showSide, setShowSide] = useState(true);

  const [workouts, setWorkouts] = useState<(Running | Cycling)[]>([]);

  // ADD_TYPES
  const displayForm = (latlng :  LatLngExpression ) => {
    setNewLocation(latlng);
    setShowForm(true);
  };

  const displayMarker = () => {
    if (!newLocation) return;
  };

  return (
    <div className="app">
      <Sidebar
        coords={newLocation}
        showSide={showSide}
        setShowSide={setShowSide}
        showForm={showForm}
        workouts={workouts}
        setWorkouts={setWorkouts}
        setShowForm={setShowForm}
      />
      <Map
        displayForm={displayForm}
        displayMarker={displayMarker}
        workouts={workouts}
        setShowSide={setShowSide}
      />
    </div>
  );
}

export default App;
