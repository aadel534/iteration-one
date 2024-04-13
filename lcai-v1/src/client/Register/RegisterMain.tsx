import React from "react";
import ReactDOM from "react-dom/client";
import 'tailwindcss/tailwind.css';
import Register from "./Register";

ReactDOM.createRoot(document.getElementById("register") as HTMLElement).render(
  <React.StrictMode>
    <Register/>
  </React.StrictMode>,
);
