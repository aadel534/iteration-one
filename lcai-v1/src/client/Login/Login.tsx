// Building a Secure MERN Stack Login
// Source: https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate  } from "react-router-dom";
import { useUser } from '../ContextAPI/UserContext'; 

export function Login() {
    // Import the login function from useUser hook to persist user information across pages through access to userId
    const { login } = useUser(); 
  useEffect(() => {
    // Tab/Title
    document.title = "Log In";
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
          <header className="lowercase font-thin flex justify-between items-center -mt-16 font-sans font-thin    subpixel-antialiased	 bg-black lowercase sticky top-0 z-20 ">
        <Link to="/">
          <h1 className=" absolute top-30 text-xl md:text-xl  ml-6  hover:text-yellow-500 text-white  md:pt-6 ">
            <span id="lcaiLogoLeft" className="text-blue-200 pr-4  ">
              LCAI 
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-4 md:mt-7 font-thin ">
          <ul className="flex space-x-2  mr-10	text-center pt-14 ">
            <li className="text-xl  hover:text-blue-700  ">
              <span className="hover:bg-slate-200 rounded text-white">Log In</span>

            </li>
            <li className="text-xl mb-10  text-white md:animate-pulse ">
              <NavLink to="/register">
                <span className="bg-blue-200 rounded ">Register</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="lowercase pt-40 -mb-40 font-sans font-thin relative bg-black text-white">
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
                className="block tracking-wide text-white text-xs  mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none text-black block w-full bg-gray-200  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  className="block tracking-wide text-xs mb-2 "
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="appearance-none text-black block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                className="lowercase font-thin text-3xl hover:animate-pulse md:animate-bounce text-blue-200  rounded hover:cursor-pointer"
              >
                Log in
              </button>
            </article>
          </form>
        </section>
      </main>
      <footer className="text-sm text-center pt-60  font-sans bg-black pb-60">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
