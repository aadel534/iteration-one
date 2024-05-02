// Building a Secure MERN Stack Login
// Source: https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export function Login() {
  useEffect(() => {
    // Tab/Title
    document.title = "Log In";
  }, []);

  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
      <header className="flex justify-between items-center -mt-10 bg-white mb-20 font-sans   sticky top-0 z-50">
        <Link to="/">
          <h1 className="absolute top-30 text-xl font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
            <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="-mt-4 md:mt-7  ">
          <ul className="flex space-x-2  mr-10	text-center ">
            <li className="text-xl  uppercase capitalize hover:text-blue-700 pr-10 hover:animate-pulse">
              <span className="hover:bg-slate-200 rounded">Log In</span>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse text-white">
              <NavLink to="/register">
                <span className="bg-blue-700 rounded">Register</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className=" -mb-40 font-sans relative">
        <section className="flex justify-end -mt-20 md:mr-60">
          <figure className="mr-20 flex items-center mt-10">
            <img src="model-1.jpg" className="hidden md:block h-80" />
          </figure>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg  mr-20 md:mr-0"
          >
            <h1 className="text-center text-2xl mt-20 mb-10">
              Log In To Your Account
            </h1>
            {errorState.length > 0 &&
              errorState.map((err, index) => (
                <p key={index} className="text-red-500 text-center">
                  {err}
                </p>
              ))}

            <div className="flex flex-wrap -mx-3 mb-6">
            </div>
            <div className="mb-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email{" "}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******************"
                />
              </div>
         
            </div>

            <article className="flex justify-center  ">
              <button
                type="submit"
                className="text-3xl hover:animate-pulse md:animate-pulse text-blue-700 font-extrabold border-dotted border-2 border-blue-600 rounded hover:cursor-pointer"
              >
                Log in!
              </button>
            </article>
          </form>
        </section>
      </main>
      <footer className="text-sm text-center mt-60  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
