import React from "react";
import { Router } from "./react-router";
import Routes from "./navigation/Routes";

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
