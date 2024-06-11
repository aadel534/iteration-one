import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home} from "./Home/Home";
import { Register } from "./Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
import { EmotionScanner } from "./EmotionScanner/EmotionScanner";
import { UserProvider } from "./ContextAPI/UserContext";
import { AIVideo } from "./AIVideo/AIVideo";
import { Settings } from "./Settings/Settings";
import { SavedVideos } from "./SavedVideos/SavedVideos";
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
            <Route path="/aivideo" element={<AIVideo/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/savedvideos" element={<SavedVideos/>}/>



          </Routes>
        </UserProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
