import axios from "axios";

function Home() {
const handleClick = () => {
 axios.get("http://localhost:3000/register");
}
  return (
    <>
    <header className="md:flex md:justify-between md:items-center -mt-10 bg-slate-300 pb-10 font-mono">
      <h1 className="pt-10 text-4xl font-mono font-extrabold ml-6 mt-6"><span id="lcaiLogoLeft" className="text-rose-700 pr-4">LCAI!</span>LightsCameraAI!</h1>
      <nav className="mt-10 md:mt-20 ">
        <ul className="md:flex space-x-2  mr-10	text-center ">

          <li><a href="#" className="text-3xl md:pr-10 uppercase md:capitalize">Register</a></li>
          <li className="text-slate-300 md:hidden"><a href="#">spacing</a></li>
          <li><a href="#" className="text-3xl uppercase md:capitalize">Log In</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section className="font-mono">
        <h2 className="ml-6 mt-20 flex justify-center text-3xl text-wrap mb-10">Learn how to act, present, and tell stories using AI!</h2>
        <figure className="flex justify-center ">
          <img src="actingmask.jpg" alt="actingMask" className="w-20 md:w-32 lg:w-60" />
        </figure>
      </section>
      <article className="flex justify-center mt-20 font-mono">
      <button onClick={handleClick} className="bg-slate-400 text-3xl" >JOIN NOW!</button>
      </article>

    </main>
    </>
  );
}

export default Home;
