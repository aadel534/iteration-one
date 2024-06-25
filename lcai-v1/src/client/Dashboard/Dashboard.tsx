import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';
import dashboardcss from './Dashboard.module.css';
export function Dashboard() {


  // Show user's first name on navigation and greeting
  const { userId, navbarname } = useUser();
  const [userFirstName, setUserFirstName] = useState("");
  const [status, setStatus] = useState('');

  // Set title text
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  // Set the user's name
  useEffect(() => {
    axios.post("/api/dashboard", userId)
      .then(response => {
        const { firstName } = response.data;
        setUserFirstName(firstName);
        navbarname(firstName);

      })
      .catch(error => {
        console.error("Error fetching user information: ", error);
      });

  }, []);

  const startEmotionAI = async () => {
    try {
        const response = await axios.post('/api/start_emotion_recognition');
        setStatus(response.data.status);
    } catch (error) {
        setStatus('Error starting emotion AI');
        console.error('Error:', error);
    }
};



  return (
    <>
       <header>
        <nav>
        <NavLink to="/dashboard">
          <h1>
            LC<span>AI</span>!
          </h1>
          <h1>Lights, Camera, AI!</h1>
          </NavLink>

          <NavLink to="/">
              <li className={dashboardcss.linkLogout}>
                <span className={dashboardcss.logout}>Logout {userFirstName}?</span>

              </li>
            </NavLink>
            <NavLink to="/settings">
              <li style={{ marginRight: "10vw" }} className={dashboardcss.linkSettings}>
                <span className={dashboardcss.settings} >Settings</span>

              </li>
            </NavLink>
        </nav>
      </header>


      <main>

        <section className={dashboardcss.section}>
          <h2>
            Hello {userFirstName}!
          </h2>
          <article>
          <p>Our emotion recognition technology below is designed to recognise and detect
            your emotions in real-time. Please click on the button below to start the 
            emotion recognition process. Please note that our current technology 
            only detects the following emotions: happiness, neutrality, disgust, surprise, and anger. Future iterations
            will include fear, sadness, and confusion.
            sadness, and surprise.
             </p>
           
          </article>


          <figure>
         
            <button onClick={startEmotionAI}>Start Emotion AI!</button>
          </figure>
         
        </section>
      </main>
    
    </>

  );
}
