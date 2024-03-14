import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./main.css";
import App from "./App.jsx";
import { AppProvider } from "./Store/Reducer.jsx";
import axios from "axios";

// Set Axios defaults
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AppProvider>
  </BrowserRouter>
);
