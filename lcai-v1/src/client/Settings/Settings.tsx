import { NavLink, Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';



export function Settings() {
    const { firstName } = useUser();
    const {userId} = useUser();
    const [password, setPassword] = useState<String>("");
    const [passwordConf, setPasswordConf] = useState<String>("");


    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setPassword(event.target.value);

        }
    };

    const handlePasswordConfChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setPasswordConf(event.target.value);

        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    if (password !== passwordConf) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('/api/updatePassword', {
        userId,
        password: password
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password: " + error);
    }

    }

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
                        <NavLink to="/savedvideos">

                            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                                <span className="hover:bg-slate-200 rounded">Saved Videos</span>
                            </li>
                        </NavLink>
                        <NavLink to="/aivideo">

                            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                                <span className="hover:bg-slate-200 rounded">AI Video Generator</span>
                            </li>
                        </NavLink>
                        <NavLink to="/emotionscanner">

                            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                                <span className="hover:bg-slate-200 rounded">Emotion Scanner</span>
                            </li>
                        </NavLink>

                        <li className="text-xl   hover:text-blue-200 pr-10 hover:animate-pulse">
                            <span className="hover:bg-slate-200 rounded">Settings</span>
                        </li>
                        <li className="text-xl   mb-10 hover:animate-pulse  hover:text-blue-200 ">
                            <NavLink to="/">
                                <span className=" hover:bg-slate-200  rounded">Log Out {firstName}?</span>
                            </NavLink>
                        </li>
                    </ul>

                </nav>
            </header>;

            <main className=" font-sans relative subpixel-antialiased font-thin lowercase flex justify-center text-white bg-black">

                <section className="md:block text-center ">
                    <h1 className="mt-20 text-5xl text-wrap  text-center ml-16 text-blue-200 mb-20">
                      settings
                    </h1>
                    <form onSubmit={handleSubmit} className=" text-center">
                        <label htmlFor="password" className="pr-10">enter a new password </label>
                        <input name="password" type="password" className="text-black" onChange={handlePasswordChange} accept="image/*" />
                        <label htmlFor="passwordconf" className="pr-10 ml-2">confirm password</label>
                        <input type="password" name="passwordconf"  className="text-black mr-20" onChange={handlePasswordConfChange} accept="audio/*" />
                        <button type="submit" className="mt-4 bg-blue-200 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded">
                            change password
                        </button>
                    </form>

                </section>




            </main>
            <footer className="text-sm text-center pt-96 text-white font-thin bg-black lowercase font-sans">
                &copy; 2024 Adelayo Adebiyi
            </footer>
        </>
    );
}
