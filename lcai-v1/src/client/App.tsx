import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
import { EmotionScanner } from "./EmotionScanner/EmotionScanner";
import { UserProvider } from "./ContextAPI/UserContext";
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
            <Route path="/emotionscanner" element={<EmotionScanner/>}/>



          </Routes>
        </UserProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
