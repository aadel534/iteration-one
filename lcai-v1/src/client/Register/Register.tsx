import { NavLink, Link } from "react-router-dom";
export function Register() {
  const handleClick = () => {
    console.log("It worked!");
  };
  return (
    <>
      <header className="md:flex md:justify-between md:items-center -mt-10 bg-white -mb-20 pb-10 font-mono bg-gradient-to-b from-indigo-300">
        <Link to="/">
          <h1 className="pt-10 text-4xl font-mono font-extrabold ml-6 mt-6 hover:text-yellow-500">
            <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-10 md:mt-20 ">
          <ul className="md:flex space-x-2  mr-10	text-center ">
            <li className="text-3xl md:pr-10 uppercase md:capitalize text-yellow-500 ">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-3xl uppercase md:capitalize hover:text-yellow-500 ">
              Log In
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-gradient-to-t from-indigo-300 -mb-40 font-mono">
  
      <h1 className="text-center text-2xl mt-20 mb-10">REGISTER</h1>



        <section className="flex justify-center ">


        <form className="w-full max-w-lg ">
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

   

</form>





       
        </section>
        <article className="flex justify-center font-mono mt-20">
          <Link to="register">
            <button className="text-3xl hover:text-yellow-500 md:animate-pulse text-green-500 font-extrabold border-dotted border-2 border-green-600 rounded hover:cursor-pointer">JOIN NOW!</button>
          </Link>
        </article>
      <footer className="text-sm text-center mt-60  font-mono">
      &copy; 2024 Adelayo Adebiyi
      
      </footer>
      </main>
    </>
  );
  
}
