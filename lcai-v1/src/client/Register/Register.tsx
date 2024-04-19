import { NavLink, Link } from "react-router-dom";
export function Register() {
  const handleClick = () => {
    console.log("It worked!");
  };
  return (
    <>
    <header className="md:flex md:justify-between md:items-center -mt-10 bg-slate-300 pb-10 font-mono">
        <Link to="/">
          <h1 className="pt-10 text-4xl font-mono font-extrabold ml-6 mt-6 hover:text-white">
            <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-10 md:mt-20 ">
          <ul className="md:flex space-x-2  mr-10	text-center ">
            <li className="text-3xl md:pr-10 uppercase md:capitalize hover:text-white active:text-blue-600 ">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-slate-300 md:hidden">spacing</li>
            <li className="text-3xl uppercase md:capitalize hover:text-white active:text-blue-600">
              Log In
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="font-mono">
          <h2 className="ml-6 mt-20 flex justify-center text-3xl text-wrap mb-10">
            PUT REGISTRATION FORM HERE
          </h2>
          <figure className="flex justify-center ">
            <img
              src="actingmask.jpg"
              alt="actingMask"
              className="w-20 md:w-32 lg:w-60"
            />
          </figure>
        </section>
        <article className="flex justify-center mt-20 font-mono">
          <button onClick={handleClick} className="bg-slate-400 text-3xl">
            JOInN NOW!
          </button>
        </article>
      </main>
    </>
  );
}
