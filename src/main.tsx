import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppContextProvoider } from "./context/appContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvoider>
      <App />
    </AppContextProvoider>
  </React.StrictMode>
);
