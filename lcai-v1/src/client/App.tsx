import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home} from "./Home/Home";
import { Register } from "./Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
import { UserProvider } from "./ContextAPI/UserContext";
import { AIVideo } from "./AIVideo/AIVideo";
import { Settings } from "./Settings/Settings";
function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />


            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings/>}/>



          </Routes>
        </UserProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
