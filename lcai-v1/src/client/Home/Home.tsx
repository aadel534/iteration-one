import { NavLink, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect } from "react";
export function Home() {
  useEffect(() => {
    document.title = "Home"; // Set the title to "Sign Up" when component mounts
  }, []);

  const handleRegisterClick = () => {
    axios.get("/register")
    .then(result => {console.log(result)
    })
    .catch(err => console.log(err))
  }
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
              <span className="hover:bg-slate-200 rounded">Log In</span>
            </li>
            <li className="text-xl  uppercase capitalize mb-10 hover:animate-pulse text-white">
              <NavLink to="/register">
                <span onClick={handleRegisterClick} className="bg-blue-700 rounded">Register</span>
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
     
          <section className="md:block flex md:block">
            <h1 className="ml-6 block capitalize absolute  left-20 text-wrap top-60 md:left-0 md:top-80 flex justify-center text-5xl text-wrap mb-10 font-extrabold  text-white z-20">
              Acting, presenting, storytelling...All powered by AI...
            </h1>
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              <SwiperSlide>
                <img
                  src="model-4.jpg"
                  className="h-32 h-screen w-screen -z-10"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="model-6.jpg"
                  className="h-32 h-screen w-screen -z-10"
                />
              </SwiperSlide>
            </Swiper>
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
          <h1 className="text-3xl ">TESTIMONIALS...</h1>
        </section>
      </main>
      <footer className="text-sm text-center mt-60  font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
