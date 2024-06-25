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
                <span>Logout {userFirstName}?</span>

              </li>
            </NavLink>
            <NavLink to="/settings">
              <li style={{ marginRight: "10vw" }} className="signup-link">
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

          <form>
            <label htmlFor="change-password">Change your password: </label>
            <input type="password" name="change-password"/>
            <label htmlFor="old-password">Enter old password:</label>
            <input type="password" name="old-password"/>

          </form>





        </section>
      </main>

    </>

  );
}
