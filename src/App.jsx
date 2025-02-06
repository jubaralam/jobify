/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
      <Router />
    </BrowserRouter>
  );
};

export default App;
