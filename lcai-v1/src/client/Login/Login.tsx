import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from '../ContextAPI/UserContext';
import logincss from "./Login.module.css";

export function Login() {
  // Retrieve login method shared to the component through the UserContext
  const { userId, login } = useUser();
  useEffect(() => {
    if (userId) {
      console.log("userid", userId);
      navigate('/dashboard');
    }
   
  }, [userId]);

  useEffect(() => {
    document.title = "LCAI! | Log in";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Store errors for login form
  const [errorState, setErrors] = useState<string[]>([]);
  // Navigate to a different page
  const navigate = useNavigate();

  // When login button is pressed and the form is submitted
  const handleSubmit = (e: { preventDefault: () => void }) => {
    // Prevent page refresh
    e.preventDefault();
    // Reset the error as there are different validation errors
    let errorMessages = [];
    if (!email) {
      errorMessages.push("Email is required.");
    }
    if (!password) {
      errorMessages.push("Password is required.");
    }
    if (errorMessages.length > 0) {
      // Set total errors
      setErrors(errorMessages);
      return;
    }
    // Send login details to server
    axios
      .post("/api/login", {
        email,
        password,
      }, { withCredentials: true })
      .then((result) => {
        (result);
        // Store userid retrieved from database in UserContext
        const { userIdResponse } = result.data;

        login(userIdResponse);
      })
      // Handle error
      .catch((error) => {
        if (error.response) {
          setErrors([error.response.data.message]);
        } else {
          setErrors(["Unable to connect to server. Please try again later."]);
        }
      });
  };

  return (
    <>
      <header className={logincss.nav}>
        <nav>
          <NavLink to="/">
            <h1>
              LC<span>AI</span>!
            </h1>
            <h1>Lights, Camera, AI!</h1>
          </NavLink>

          <ul>
            <li className="login-link">
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <span >Log in</span>
              </NavLink>
            </li>
            <li className="signup-link">
              <NavLink to="/register">
                <span >Sign up</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main >
        <section className={logincss.section}>

          <form
            // Submit when login button is pressed
            onSubmit={handleSubmit}
            className={logincss.form}
          >
            <h1>
              Log In
            </h1>
            {/* Display each error in a list if errors are present */}
            {errorState.length > 0 &&
              <ul className={logincss.errorList}>
                {errorState.map((err, index) => (
                  <li key={index} style={{ color: "red" }}>
                    {err}
                  </li>
                ))}
              </ul>
            }

            <label
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />


            <label
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              id="grid-password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />


            <button
              type="submit">
              Log in
            </button>
          </form>
        </section>
      </main>
    </>
  )

}
