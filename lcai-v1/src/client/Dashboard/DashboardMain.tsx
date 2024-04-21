import React from "react";
import ReactDOM from "react-dom";
import 'tailwindcss/tailwind.css';
import { Dashboard } from "./Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <Dashboard/>
  </React.StrictMode>,
  document.getElementById("dashboard")
);
