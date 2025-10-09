import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createSilentWatch, attachSilentWatchDetectors } from "silent-watch";

// Correct way to pass API key
attachSilentWatchDetectors({
  backendUrl: "http://localhost:5000/log",
  apiKey: "SW-9xY7!fQ2@LpM4v",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
