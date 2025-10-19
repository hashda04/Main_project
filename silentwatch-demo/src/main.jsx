import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { attachSilentWatchDetectors } from "silent-watch";

attachSilentWatchDetectors({
  backendUrl: "http://localhost:5000/log",
  logToBackend: true,
  apiKey: "SW-9xY7!fQ2@LpM4v",
  debug: true,
  ignoreSelectors: ["#root", ".page-container"],
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
