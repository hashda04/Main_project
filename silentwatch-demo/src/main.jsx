// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createSilentWatch, attachSilentWatchDetectors } from "silent-watch";


attachSilentWatchDetectors({
  backendUrl: "http://localhost:5000/log",
  apiKey: "G7d!9q2X@bL6r#N8vP4y",
});




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
