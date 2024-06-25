import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
import { UserProvider } from "./ContextAPI/UserContext";
import { Settings } from "./Settings/Settings";
import { Privacy } from "./Privacy/Privacy";
function App() {
  return (
    <>
      {/* Source: https://www.w3schools.com/react/react_router.asp */}
      <BrowserRouter>
        {/* Source: https://react.dev/reference/react/createContext */}

        <UserProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />


            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<Privacy />} />



          </Routes>
        </UserProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
