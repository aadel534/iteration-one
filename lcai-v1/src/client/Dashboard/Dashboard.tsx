import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
export function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
     <header className="flex justify-between items-center -mt-10 bg-white  font-sans   sticky top-0 z-50 antialiased">
        <Link to="/dashboard">
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

    <main>
        Welcome home!
      </main>
      <footer className="text-sm text-center mt-60  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
