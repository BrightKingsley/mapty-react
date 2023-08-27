import { useState } from "react";
import { Map, Sidebar } from "./components";
import { LatLngExpression } from "leaflet";
import { Cycling, Running } from "./models/Workout";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [newLocation, setNewLocation] = useState<LatLngExpression>();
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
        showForm={showForm}
        workouts={workouts}
        setWorkouts={setWorkouts}
        setShowForm={setShowForm}
      />
      <Map
        displayForm={displayForm}
        displayMarker={displayMarker}
        locations={workouts.map((workout) => workout.coords)}
      />
    </div>
  );
}

export default App;
