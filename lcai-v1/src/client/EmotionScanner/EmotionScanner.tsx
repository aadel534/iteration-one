import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext'; 
import Webcam from 'react-webcam';

export function EmotionScanner() {
    const {firstName} = useUser();

  useEffect(() => {
    document.title = "Emotion Scanner";
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
              <span className="hover:bg-slate-200 rounded">Emotion Scanner</span>
            </li>
            <li className="text-xl  uppercase capitalize hover:text-blue-700 pr-10 hover:animate-pulse">
              <span className="hover:bg-slate-200 rounded">Settings</span>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse  hover:text-blue-700 ">
              <NavLink to="/register">
                <span className=" hover:bg-slate-200  rounded">Log Out {firstName}? </span>
              </NavLink>
            </li>

          </ul>
        </nav>
      </header>

      <main className=" font-sans relative antialiased flex justify-center">
    
          <section className="md:block ">
            <h1 className="mt-20 flex  text-5xl text-wrap w-80 text-center ml-28">
              Emotion Scanner
            </h1>
          <article className="text-m ">
          <h3 className="italic font-bold absolute left-6 w-80 mt-20 text-center">How it works:</h3>
              <p className="absolute left-6 w-80 mt-28 ">Use the emotion scanner to have fun
                with our emotion recognition technology. For example, start off by pulling a "happy" face or a "sad" face
                and our technology will recognise it. Then practise speeches or monologues to see what your facial
                expressions are saying about you while you are communicating. Try practising for an interview.
                Are you communicating correctly? Do you appear sad for example? Use the emotion scanner as you like
                to help you improve the way you present yourself to others. </p>

                <p className="absolute right-6 w-80 mt-20">The emotion your face is currently projecting is: </p>
            </article>

            <article className="mt-20">
                    <Webcam
                // ref={webcamRef}
                screenshotFormat="image/jpeg"
                audio={true}
                width={600}
                height={600}
            />
            </article>
            <article className="text-m mt-20">
         


            </article >

       
          </section>



      
      </main>
      <footer className="text-sm text-center mt-96  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
