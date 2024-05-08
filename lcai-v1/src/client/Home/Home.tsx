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
  
      <main className="lowercase font-sans font-thin relative subpixel-antialiased	bg-black">
        <section className=" pt-10 bg-black">
          {/* <figure className="flex justify-center mt-20 ">
            <h1 className="transition-colors ease-in-out delay-150 duration-300 text-white text-3xl md:text-4xl font-extrabold ml-6 -mt-6 hover:text-yellow-500   ">
              <span id="lcaiLogoLeft " className="text-blue-200 pr-4">
                LCAI!
              </span>
              <span className="animate-pulse ">LightsCameraAI!</span>
            </h1>
          </figure> */}
          <br></br>

          <section className="md:block flex -z-20 md:animate-pulse">
            <h1 className="ml-6 text-blue-200 block absolute  left-20 text-wrap top-60 md:left-0 md:top-96 flex justify-center text-5xl md:text-7xl text-wrap mb-10   text-white z-20 md:animate-bounce lowercase  ">
              ACTING, PRESENTING, STORYTELLING ALL POWERED BY AI
            </h1>
            <div className="w-screen h-screen bg-black pb-120"></div>


          </section>
       
        </section>
        <figure className="bg-black md:pt-96 md:pb-96">

        <img 
              src="model-4.jpg"
              className="h-screen w-screen md:animate-ping "
            />
            


        </figure>
        <Link to="register">
        <article className="pt-96 pb-96 sticky top-0 hover:cursor-pointer">
        <h1 className="text-blue-200 text-5xl md:text-7xl text-wrap mb-10 text-center lowercase  md:pt-0 md:animate-bounce">
             #jointhemovement
            </h1>
        </article>
        </Link>

    
        <section className="text-wrap  relative  bg-black text-white h-96 z-20 ">
          <h2 className="pb-10 text-center"></h2>
          <ul className="text-center">
            <li className=" md:absolute md:left-10  md:text-2xl text-blue-200">
              Emotion Scanner
            </li>
            <p className="md:absolute md:top-20 md:left-10 md:text-xl">
              The emotion scanner uses power facial recognition technology to
              recognise the emotions you display
            </p>
            <li className=" md:absolute md:right-10 md:top-40  md:text-2xl mt-20 md:mt-0 text-blue-200">
              AI Generated Videos
            </li>
            <p className="md:absolute md:top-60 md:right-10 md:text-xl">
              Create AI generated videos of yourself and have fun with content
              creation!
            </p>
          </ul>
        </section>
        <section className=" pt-10  text-center items-center md:flex justify-center pb-20 bg-black text-white md:animate-pulse">
            <article className=" text-m textwrap ">
              <h3 className="text-xl md:left-40 textwrap mt-10 italic text-blue-200  ">Emotion Scanner</h3>
              <p>Use the emotion scanner to have fun
                with our emotion recognition technology. For example, start off by pulling a "happy" face or a "sad" face
                and our technology will recognise it. Then practise speeches or monologues to see what your facial
                expressions are saying about you while you are communicating. Try practising for an interview.
                Are you communicating correctly? Do you appear sad for example? Use the emotion scanner as you like
                to help you improve the way you present yourself to others. </p>
            </article>

            <article className=" text-m textwrap ">
            <h3 className="text-xl md:left-40 textwrap mt-10 italic  text-blue-200 ">Create AI Video</h3>
              <p>
                Use our third-party APIs to generate fun video content. Upload a clear head shot and audio sample
                of your (or use a voice sample) and voila! You will receive an AI generated video of yourself
                using the prompts you have provided.

                Use case example:
                Unsure about that new song you wrote?
                Try inserting some original lyrics, e.g. spoken, rapped, sung, and watch and listen to the AI video
                that is generated. We will also pass the lyrics to our third-party AI to analyse and give you feedback
                on your lyrics, so you can see how your lyrics may be received or interpreted by an audience.

              </p>
            </article>

            <article className=" text-m textwrap ">
            <h3 className="text-xl md:left-40 textwrap mt-10 italic  text-blue-200  ">Saved Videos</h3>
              <p>
                Your AI videos and feedback for them - they feedback to those cool lyrics and that cool
                video you created - You can choose to save them after creating them. If you do not, they will be lost forever!
                You can choose to delete them here if you'd like also. A maximum of five videos can be saved at a time.
                But don't worry, you can download them also!
              </p>
            </article>

        
          </section>
    
        <section className="text-center bg-black text-white h-96 pb-60   ">
          <br></br>
          <h1 className="text-3xl mb-10 text-blue-200 ">Testimonials...</h1>

          <h2 className="mb-10 md:animate-pulse">&#x0022;The greatest application ever!&#x0022; -  Leanardio DiCapriosa, five-time Oscare Award Winner</h2>
          <h2 className="mb-10 md:animate-pulse">&#x0022;Where was this when I was a young girl and needed to practise at 3am!?&#x0022; -  Isha Raye three-time NAACT Award Winner</h2>
          <h2 className="md: animate-pulse">&#x0022;This is what technology is all about!&#x0022; - Marcus Zuckerberzge, founder of Facelibrary</h2>
        </section>

        <header className="lowercase flex justify-between items-center -mt-16 font-sans font-thin    subpixel-antialiased	 bg-black lowercase sticky top-0 z-20 ">
        <Link to="/">
          <h1 className=" absolute top-30 text-xl md:text-xl  ml-6  hover:text-yellow-500 text-white  md:pt-6 ">
            <span id="lcaiLogoLeft" className="text-blue-200 pr-4  ">
              LCAI 
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-4 md:mt-7  ">
          <ul className="flex space-x-2  mr-10	text-center pt-14 ">
            <li className="text-xl  hover:text-blue-700  ">
              <NavLink to="login">
              <span className="hover:bg-slate-200 rounded text-white">Log In</span>

              </NavLink>
            </li>
            <li className="text-xl mb-10  text-white md:animate-pulse ">
              <NavLink to="register">
                <span className="bg-blue-200 rounded ">Register</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
        <article className="flex justify-center pt-40 -mt-100 pb-96 bg-black pr-50 z-20 pt-96 font-sans font-thin hover:cursor-pointer  ">
             {/* Join now will appear here */}
          </article>

      </main>
      <footer className="text-sm text-center pt-60  font-sans bg-black text-white  ">

       <p> &copy; 2024 Adelayo Adebiyi</p>


      </footer>
    </>
  );
}
