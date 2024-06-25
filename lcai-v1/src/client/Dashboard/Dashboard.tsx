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

  // Source: https://react.dev/reference/react/useEffect
  // Set title text
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  // Source: https://axios-http.com/docs/post_example
  // Set the user's name on dashboard
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

  // Logout user
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <>
      <header>
        {/* Spurce: https://reactrouter.com/en/main/components/nav-link */}
        <nav>
          <NavLink to="/dashboard">
            <h1>
              LC<span>AI</span>!
            </h1>
            <h1>Lights, Camera, AI!</h1>
          </NavLink>

          <li className={dashboardcss.linkLogout}>
            <form action="/api/logout" method="POST">
              <span className={dashboardcss.logout} onClick={handleLogout}>Logout {userFirstName}?</span>
            </form>
          </li>

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
            <p style={{ position: "absolute", top: "80vh" }}>Help: Press 'q' to exit the emotion AI.</p>


          </article>


          <figure>
            {/* Call function to start webcam and expression detection */}
            <button onClick={startEmotionAI}>Start Emotion AI!</button>
          </figure>

        </section>
      </main>

    </>

  );
}
