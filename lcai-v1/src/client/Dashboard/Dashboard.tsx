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

      <main className=" font-sans relative antialiased flex justify-center">
    
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
            </section>

       


          </section>


      
      </main>
      <footer className="text-sm text-center mt-96  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
