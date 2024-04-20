import { NavLink, Link } from "react-router-dom";
export function Register() {
  const handleClick = () => {
    console.log("It worked!");
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

        <nav className="mt-7 mt-28 ">
          <ul className="flex space-x-2  mr-10	text-center ">
          <li className="text-xl  uppercase capitalize hover:text-blue-700 pr-10 hover:animate-pulse">
              <span className="hover:bg-slate-200 rounded">Log In</span>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse text-white">
              <NavLink to="/register"><span className="bg-blue-700 rounded">Register</span></NavLink>
            </li>
         
          </ul>
        </nav>
      </header>
      <main className=" -mb-40 font-sans relative">
      
        <section className="flex justify-end -mt-20 mr-60">

        <figure className="mr-20 flex items-center mt-10">
          <img src="model-8.jpg" className="h-80"/>
        </figure>

        <form className="w-full max-w-lg  ">
        <h1 className="text-center text-2xl mt-20 mb-10">Create Your Account</h1>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        First Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Last Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
  </div>
  <div className="mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="text" placeholder="Username"/>
    </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3 mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " htmlFor="grid-password">
        Choose a Password
      </label>
      <p className="text-gray-600 text-xs italic">Choose wisely!</p>

      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
    </div>
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
Confirm Password      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
    </div>
  </div>

  <article className="flex justify-center  ">
          <Link to="register">
          <button className="text-3xl hover:animate-pulse md:animate-pulse text-blue-700 font-extrabold border-dotted border-2 border-blue-600 rounded hover:cursor-pointer">Sign Up!</button>
          </Link>
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
