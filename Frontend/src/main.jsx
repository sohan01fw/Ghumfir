import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { AppProvider } from "./Store/Reducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
