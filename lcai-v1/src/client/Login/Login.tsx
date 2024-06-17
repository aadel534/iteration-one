import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate  } from "react-router-dom";
import { useUser } from '../ContextAPI/UserContext'; 
import logincss from "./Login.module.css";

export function Login() {
  const { login } = useUser(); 
useEffect(() => {
document.title = "LCAI! | Log in";
}, []);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorState, setErrors] = useState<string[]>([]);
const navigate = useNavigate();
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
    setErrors(errorMessages); // Set all accumulated errors
    return;
  }
  axios
    .post("/api/login", {
      email,
      password,
    }, { withCredentials: true })
    .then((result) => {
      console.log(result);
      const { userId } = result.data;
      login(userId);
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
              <NavLink to="/login" style= {{textDecoration: "none"}}>
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
            onSubmit={handleSubmit}
            className={logincss.form}
          >
          <h1>
              Log In 
            </h1>
            {errorState.length > 0 &&
            <ul className={logincss.errorList}>
            {errorState.map((err, index) => (
              <li key={index} style={{color:"red"}}>
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
