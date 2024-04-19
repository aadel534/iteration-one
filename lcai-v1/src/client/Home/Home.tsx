import { NavLink, Link } from "react-router-dom";
export function Home() {
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
            <li className="text-3xl md:pr-10 uppercase md:capitalize hover:text-yellow-500 ">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-3xl uppercase md:capitalize hover:text-yellow-500 ">
              Log In
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-gradient-to-t from-indigo-300 -mb-40">
        <section className="font-mono ">
          <h2 className="ml-6 mt-20 flex justify-center text-3xl text-wrap mb-10 md:animate-pulse font-extrabold text-white text-black">
            Learn how to act, present, and tell stories using AI!
          </h2>
        
          <figure className="flex justify-center mt-20 ">
          <img src="face-recog.jpg"
          alt="face-recog"
          className="w-80  md:w-100 lg:w-60 "/>
          </figure>
          <article className="flex justify-center font-mono mt-20">
          <Link to="register">
            <button className="text-3xl hover:text-yellow-500 md:animate-pulse text-green-500 font-extrabold border-dotted border-2 border-green-600 rounded hover:cursor-pointer">JOIN NOW!</button>
          </Link>
        </article>
        </section>
        <section className="font-mono text-wrap pb-20 relative">
        <h2 className="pb-10 text-center"></h2>
        <ul className="text-center">
            <li className="font-extrabold md:absolute md:left-10 md:animate-pulse md:text-2xl">Emotion Scanner</li>
            <p className="md:absolute md:top-20 md:left-10 md:text-xl">The emotion scanner uses power facial recognition technology to recognise the emotions you display</p>
            <li className="font-extrabold md:absolute md:right-10 md:top-40 md:animate-pulse text-2xl">AI Generated Videos</li>
            <p className="md:absolute md:top-60 md:right-10 md:text-xl">Create AI generated videos of yourself and have fun with content creation!</p>
          </ul>
         
        
        </section>
      <footer className="text-sm text-center mt-60  font-mono">
      &copy; 2024 Adelayo Adebiyi
      
      </footer>
      </main>
    </>
  );
}
