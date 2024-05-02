import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
