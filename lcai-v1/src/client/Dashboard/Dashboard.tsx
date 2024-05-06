import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext'; 

export function Dashboard() {
  const { userId } =  useUser();
  const [userFirstName, setUserFirstName] = useState("");
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  useEffect(() =>{
    axios.post("/api/dashboard", userId )
    .then(response => {
      const {firstName} = response.data;
      setUserFirstName(firstName);
    })
    .catch(error => {
      console.error("Error fetching user information: ", error);
    });

  }, []);
  return (

    <>
     <header className="flex justify-between items-center -mt-10 bg-white  font-sans   sticky top-0 z-50 antialiased">
        <Link to="/dashboard">
          <h1 className="absolute top-30 text-xl font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
            <span id="lcaiLogoLeft" className="text-red-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI! 
          </h1>
        </Link>

        <nav className="-mt-4 md:mt-7  ">
          <ul className="flex space-x-2  mr-10	text-center ">
            <li className="text-xl  uppercase capitalize hover:text-blue-700 pr-10 hover:animate-pulse">
              <span className="hover:bg-slate-200 rounded">Settings</span>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse  hover:text-blue-700 ">
              <NavLink to="/register">
                <span className=" hover:bg-slate-200  rounded">Log Out</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className=" font-sans relative antialiased">
    
          <section className="md:block flex ">
            <h1 className="mt-20 flex justify-center text-5xl text-wrap ">
              Hello {userFirstName}!
            </h1>
            <section></section>

       


          </section>


      
      </main>
      <footer className="text-sm text-center mt-60  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
