import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";



export function Home() {
  useEffect(() => {
    // Tab/title
    document.title = "Home";
  }, []);


  return (
    <>
      <header className="flex justify-between items-center -mt-10 bg-white  font-sans   sticky top-0 z-50 antialiased">
        <Link to="/">
          <h1 className=" absolute top-30 text-xs md:text-xl font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
            <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
              LCAI!
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-4 md:mt-7  ">
          <ul className="flex space-x-2  mr-10	text-center ">
            <li className="text-xl  uppercase capitalize hover:text-blue-700 pr-10 hover:animate-pulse">
              <NavLink to="login">
              <span className="hover:bg-slate-200 rounded">Log In</span>

              </NavLink>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse text-white">
              <NavLink to="register">
                <span className="bg-blue-700 rounded">Register</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className=" font-sans relative antialiased">
        <section className="">
          <figure className="flex justify-center mt-20 ">
            <h1 className="text-3xl md:text-4xl font-extrabold ml-6 -mt-6 hover:text-yellow-500 border  border-4 border-red-500 hover:animate-pulse ">
              <span id="lcaiLogoLeft" className="text-rose-700 pr-4">
                LCAI!
              </span>
              LightsCameraAI!
            </h1>
          </figure>
          <br></br>

          <section className="md:block flex ">
            <h1 className="ml-6 block capitalize absolute  left-20 text-wrap top-60 md:left-0 md:top-80 flex justify-center text-5xl text-wrap mb-10 font-extrabold  text-white z-20">
              Acting, presenting, storytelling...All powered by AI...
            </h1>

            <img
              src="model-4.jpg"
              className="h-screen w-screen -z-10"
            />


          </section>
          <article className="flex justify-center pt-40 -mt-100 pb-40 bg-black pr-50 ">
            <Link to="register">
              <button className="text-3xl hover:animate-pulse md:animate-pulse text-blue-700 font-extrabold border-dotted border-2 border-blue-600 rounded hover:cursor-pointer">
                JOIN NOW!
              </button>
            </Link>
          </article>
        </section>

        <section className="text-wrap  relative   bg-white h-96 z-20">
          <h2 className="pb-10 text-center"></h2>
          <ul className="text-center">
            <li className="font-extrabold md:absolute md:left-10  md:text-2xl">
              Emotion Scanner
            </li>
            <p className="md:absolute md:top-20 md:left-10 md:text-xl">
              The emotion scanner uses power facial recognition technology to
              recognise the emotions you display
            </p>
            <li className="font-extrabold md:absolute md:right-10 md:top-40  md:text-2xl mt-20 md:mt-0">
              AI Generated Videos
            </li>
            <p className="md:absolute md:top-60 md:right-10 md:text-xl">
              Create AI generated videos of yourself and have fun with content
              creation!
            </p>
          </ul>
        </section>

        <section className="text-center pt-50  h-96 bg-blue-700">
          <br></br>

          <h1 className="text-3xl text-white">
            More on facial recognition technology...
          </h1>
        </section>
        <section className="text-center pt-50   h-96">
          <br></br>
          <h1 className="text-3xl mb-10">Testimonials...</h1>
          <h2 className="mb-10">&#x0022;The greatest application ever!&#x0022; -  Leanardio DiCapriosa, five-time Oscare Award Winner</h2>
          <h2 className="mb-10">&#x0022;Where was this when I was a young girl and needed to practise at 3am!?&#x0022; -  Isha Raye three-time NAACT Award Winner</h2>
          <h2>&#x0022;This is what technology is all about!&#x0022; - Marcus Zuckerberzge, founder of Facelibrary</h2>
          <figure className="flex justify-center mt-10">

          </figure>
        </section>
        <section className="text-center pt-50 bg-red-700  h-96">
          <h1 className="text-3xl text-white ">About the founder...</h1>
          <figure className="flex justify-center">
            <img src="adelayo.png" />

          </figure>
        </section>
      </main>
      <footer className="text-sm text-center mt-60  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
