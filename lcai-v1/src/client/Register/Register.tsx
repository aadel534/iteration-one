import signup from "./Register.module.css";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  useEffect(() => {
    // Tab/Title
    document.title = "Sign Up";
  }, []);

  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorState, setErrors] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);


  const navigate = useNavigate();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    // Prevent page refresh
    e.preventDefault();
    // Reset the error as there are different validation errors
    // Same error functionality as login page 
    let errorMessages = [];
    if (password !== passwordConfirmation) {
      errorMessages.push("Please ensure both passwords match!");
    }
    if (!forename) {
      errorMessages.push("First name is required.");
    }
    if (!surname) {
      errorMessages.push("Last name is required.");
    }
    if (!email) {
      errorMessages.push("Email is required.");
    }
    if (!password) {
      errorMessages.push("Password is required.");
    }
    if (!consent) {
      errorMessages.push("You must consent to the processing of your data.");
    }
    if (errorMessages.length > 0) {
      setErrors(errorMessages); // Set all accumulated errors
      return;
    }
    axios
      .post("/api/register", {
        forename,
        surname,
        email,
        password,
        passwordConfirmation,
      })
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
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
      <header className={signup.nav}>
        <nav >
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
      <main>
        <section className={signup.section}>
          <form
            onSubmit={handleSubmit}
            className={signup.form}
          >
            <h1>
              Create Your Account
            </h1>
            <div>
              {errorState.length > 0 &&
                <ul className={signup.errorList}>
                  {errorState.map((err, index) => (
                    <li key={index} style={{ color: "red" }}>
                      {err}
                    </li>
                  ))}
                </ul>
              }
            </div>

            <label
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              name="forename"
              onChange={(e) => setForename(e.target.value)}
            />
            <label
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              name="surname"
              onChange={(e) => setSurname(e.target.value)}
            />
            <label
              htmlFor="email"
            >
              Email{" "}
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
              Choose a Password
            </label>

            <input
              id="grid-password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
            <label
              htmlFor="grid-password"
            >
              Confirm Password
            </label>
            <input
              id="grid-password"
              type="password"
              name="confirmpassword"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="******************"
            />
            <div>
              <input id="consent-checkbox" style={{ position: "absolute", left: "25vw", width: "10vw" }} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <label htmlFor="consent-checkbox" style={{ fontSize: "1vw" }}>I agree to the processing of my personal data in accordance with the <Link to="/privacy">privacy policy</Link>.</label>
            </div>
            <button
              type="submit"
            >
              Sign Up!
            </button>
          </form>
        </section>
      </main>
    </>
  )

}
