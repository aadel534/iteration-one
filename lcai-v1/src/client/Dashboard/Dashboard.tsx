import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';

export function Dashboard() {
  const { userId, navbarname } = useUser();

  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  useEffect(() => {
    axios.post("/api/dashboard", userId)
      .then(response => {
        const { firstName } = response.data;
        setUserFirstName(firstName);
        navbarname(firstName);

      })
      .catch(error => {
        console.error("Error fetching user information: ", error);
      });

  }, []);
  return (
    <>
      <header className="lowercase flex justify-between items-center -mt-16 font-sans font-thin  text-white  subpixel-antialiased	 bg-black lowercase sticky top-0 z-20 ">
        <Link to="/dashboard">
          <h1 className=" absolute top-6 md:top-30  md:pb-0 text-xs md:text-xl md:text-xl  ml-6  hover:text-yellow-500 text-white  md:pt-6 ">
            <span id="lcaiLogoLeft" className="text-blue-200 pr-4  ">
              LCAI
            </span>
            LightsCameraAI!
          </h1>
        </Link>

        <nav className="mt-4 md:mt-7  ">
          <ul className="flex space-x-2  mr-10	text-center pt-14 ">
            <NavLink to="/aivideo">

              <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                <span className="hover:bg-slate-200 rounded">AI Video Generator</span>
              </li>
            </NavLink>
            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">
              <NavLink to="/emotionscanner">
                <span className="hover:bg-slate-200 rounded">Emotion Scanner</span>
              </NavLink>
            </li>
            <NavLink to="/settings">

              <li className="text-xl   hover:text-blue-200 pr-10 hover:animate-pulse">
                <span className="hover:bg-slate-200 rounded">Settings</span>
              </li>
            </NavLink>
            <li className="text-xl   mb-10 hover:animate-pulse  hover:text-blue-200 ">
              <NavLink to="/register">
                <span className=" hover:bg-slate-200  rounded">Log Out {userFirstName}?</span>
              </NavLink>
            </li>
          </ul>

        </nav>
      </header>;



      <main className=" lowercase font-thin font-sans relative  subpixel-antialiased flex justify-center bg-black text-white">

        <section className="md:block ">
          <h1 className="mt-20 flex  text-5xl text-wrap w-80 text-center">
            Hello {userFirstName}!
          </h1>
          <section>
            <h2 className="text-2xl  text wrap mt-10 text-center w-80">How to use this website:</h2>
            <article className="text-m text-center textwrap w-80 ">
              <h3 className="text-xl textwrap mt-10 italic font-bold w-80 text-center">Emotion Scanner</h3>
              <p className="">Use the emotion scanner to have fun
                with our emotion recognition technology. For example, start off by pulling a "happy" face or a "sad" face
                and our technology will recognise it. Then practise speeches or monologues to see what your facial
                expressions are saying about you while you are communicating. Try practising for an interview.
                Are you communicating correctly? Do you appear sad for example? Use the emotion scanner as you like
                to help you improve the way you present yourself to others. </p>
            </article>

            <article className="text-m text-center textwrap w-80 ">
              <h3 className="text-xl textwrap mt-10 italic font-bold w-80 text-center">Create AI Video</h3>
              <p className="">
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

            <article className="text-m text-center textwrap w-80 ">
              <h3 className="text-xl textwrap mt-10 italic font-bold w-80 text-center">Saved Videos</h3>
              <p>
                Your AI videos and feedback for them - they feedback to those cool lyrics and that cool
                video you created - You can choose to save them after creating them. If you do not, they will be lost forever!
                You can choose to delete them here if you'd like also. A maximum of five videos can be saved at a time.
                But don't worry, you can download them also!
              </p>
            </article>

            <article className="text-m text-center textwrap w-80 ">
              <h3 className="text-xl textwrap mt-10 italic font-bold w-80 text-center">Settings</h3>
              <p>
                You can choose to update your password, email, and delete your account here.
              </p>
            </article>
          </section>




        </section>



      </main>
      <footer className="text-sm text-center pt-96  subpixel-antialiased font-sans bg-black text-white font-thin">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>

  );
}
