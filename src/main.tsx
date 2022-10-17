import React from "react";
import ReactDOM from "react-dom/client";
import packages from "../data/packages.json";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {packages.length ? (
      <App />
    ) : (
      <>
        Please initialize the game data:{" "}
        <code>npm run fetch-packages-data</code>
      </>
    )}
  </React.StrictMode>
);
