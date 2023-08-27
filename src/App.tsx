import { useContext, useEffect, useState } from "react";
import { Map, Sidebar } from "./components";
import AppContext from "./context/appContext";

function App() {
  const { newLocation, setShowSide } = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSide(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      <Sidebar coords={newLocation} />
      <Map />
    </div>
  );
}

export default App;
