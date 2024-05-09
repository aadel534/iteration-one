import { NavLink, Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';



export function AIVideo() {
    const { firstName } = useUser();
    // Post to https://api.d-id.com/talks
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);

    // Handle image file change
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageFile(event.target.files[0]);

        }
    };

    // Handle audio file change
    const handleAudioChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files) {

                setAudioFile(event.target.files[0]);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!imageFile || !audioFile) {
            alert('image and audio file required to generate your ai content!');
            return;
        }

        const formData = new FormData();
        formData.append('source_url', imageFile);
        formData.append('script[type]', 'audio');
        formData.append('script[audio_url]', audioFile);

        try {
            const response = await axios.post('https://api.d-id.com/talks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Basic YWRlbGF5by5hZGViaXlpQGdtYWlsLmNvbQ:Tna3pniieKCohohu6q_kB'
                },
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

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
                        <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                            <span className="hover:bg-slate-200 rounded">AI Video Generator</span>
                        </li>

                        <NavLink to="/emotionscanner">

                            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                                <span className="hover:bg-slate-200 rounded">Emotion Scanner</span>
                            </li>
                        </NavLink>
                        <NavLink to="/settings">

                            <li className="text-xl   hover:text-blue-200 pr-10 hover:animate-pulse">
                                <span className="hover:bg-slate-200 rounded">Settings</span>
                            </li>
                        </NavLink>

                        <li className="text-xl   mb-10 hover:animate-pulse  hover:text-blue-200 ">
                            <NavLink to="/">
                                <span className=" hover:bg-slate-200  rounded">Log Out {firstName}?</span>
                            </NavLink>
                        </li>
                    </ul>

                </nav>
            </header>;

            <main className=" text-white font-sans relative subpixel-antialiased font-thin lowercase flex justify-center text-white bg-black">

                <section className="md:block text-center ">
                    <h1 className="mt-20 text-5xl text-wrap  text-center ml-16 text-blue-200">
                        AI Video Generator
                    </h1>
                    <form onSubmit={handleSubmit} className="flex justify-center text-center">
                        <label htmlFor="image" className="pr-10">image </label>
                        <input name="image" type="file" onChange={handleImageChange} accept="image/*" />
                        <label htmlFor="audio" className="pr-10">audio</label>
                        <input type="file" onChange={handleAudioChange} accept="audio/*" />
                        <button type="submit" className="mt-4 bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Generate Video
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
