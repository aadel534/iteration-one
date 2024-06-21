import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';
import dashboardcss from "../Dashboard/Dashboard.module.css"; 
export function Settings() {

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
          <ul>
         
          <NavLink to="/">
            <li className="login-link">
            <span>Log put {userFirstName}?</span>

            </li>
            </NavLink>
            <NavLink to="/settings">
            <li style={{marginRight: "10vw"}} className="signup-link">
            <span >Settings</span>

            </li>
            </NavLink>
          </ul>
        
        </nav>
      </header>


      <main>

        <section className={dashboardcss.section}>
          <h2>
            Hello {userFirstName}!
          </h2>
          <article>
          <p>Use our facial expression reader to detect different emotions. LCAI! technology currently detects the following emotions: happiness, neutrality, disgust, surprise, and anger. 
            Future iterations will include fear, sadness, and confusion.
             </p>
           
          </article>


         
         
        </section>
      </main>
    
    </>

  );
}
