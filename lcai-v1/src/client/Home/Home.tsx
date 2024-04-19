import { NavLink, Link } from "react-router-dom";
export function Home() {
  return (
    <>
      <header className="flex justify-between items-center -mt-10 bg-white mb-20 font-mono   sticky top-0 z-50">
        <Link to="/">
          <h1 className="absolute top-30 text-xl font-mono font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
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
      <main className=" font-mono">
        <section className="">
          <h2 className="ml-6 mt-20 flex justify-center text-3xl text-wrap mb-10 font-extrabold text-white text-black ">
            Learn how to act, present, and tell stories using AI!
          </h2>

        
          <figure className="flex justify-center mt-20 ">
          <h1 className="text-4xl font-mono font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
            <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI!
          </h1>
          </figure>
          <br></br>
          <div className='h-screen w-screen bg-[url("facialrecognition.png")] bg-no-repeat' ></div>

                    <article className="flex justify-center font-mono pt-40 -mt-60 pb-40 bg-black pr-50 ">
          <Link to="register">
            <button className="text-3xl hover:animate-pulse md:animate-pulse text-blue-700 font-extrabold border-dotted border-2 border-blue-600 rounded hover:cursor-pointer">JOIN NOW!</button>
          </Link>
        </article>
        </section>
      
        <section className="font-mono text-wrap  relative   bg-white h-96 z-20">
          
        <h2 className="pb-10 text-center"></h2>
        <ul className="text-center">
            <li className="font-extrabold md:absolute md:left-10  md:text-2xl">Emotion Scanner</li>
            <p className="md:absolute md:top-20 md:left-10 md:text-xl">The emotion scanner uses power facial recognition technology to recognise the emotions you display</p>
            <li className="font-extrabold md:absolute md:right-10 md:top-40  md:text-2xl mt-20 md:mt-0">AI Generated Videos</li>
            <p className="md:absolute md:top-60 md:right-10 md:text-xl">Create AI generated videos of yourself and have fun with content creation!</p>
          </ul>
        
        
        </section>

        <section className="text-center pt-50  h-96 bg-blue-700">
          <br></br>

          <h1 className="text-3xl text-white">More on facial recognition technology...</h1>

        </section>
        <section className="text-center pt-50   h-96">
          <br></br>
          <h1 className="text-3xl ">TESTIMONIALS...</h1>

        </section>
   

      </main>
      <footer className="text-sm text-center mt-60  font-mono">
      &copy; 2024 Adelayo Adebiyi
      
      </footer>
    </>
  );
}
