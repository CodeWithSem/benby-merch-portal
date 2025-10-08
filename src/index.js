import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/style/global.css";
import App from "./App";

const ResizeObserverOriginal = window.ResizeObserver;

window.ResizeObserver = class ResizeObserverSafe extends (
  ResizeObserverOriginal
) {
  constructor(callback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (err) {
        if (!err.message.includes("ResizeObserver loop")) {
          throw err;
        }
        // otherwise ignore
      }
    });
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
