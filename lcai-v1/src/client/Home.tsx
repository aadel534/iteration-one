function Home() {

  return (
    <>
    <header>
      <h1 className="pt-10 text-4xl font-mono font-extrabold	"><span id="lcaiLogoLeft" className="text-rose-700 pr-4">LCAI!</span>LightsCameraAI!</h1>
      <nav className="bg-white">
        <ul className="flex space-x-2 float-right mr-10	">

          <li><a href="#" className="text-3xl pr-10">Register</a></li>
          <li><a href="#" className="text-3xl">Log In</a></li>
        </ul>
      </nav>
    </header>
    <main>
      {/* First commit to Github */}
      <section className="flex justify-center">
        <h2>Learn how to act, present, and tell stories using AI!</h2>
        <figure className="flex justify-center">
          <img src="actingmask.jpg" alt="actingMask" />
        </figure>
        <button>JOIN NOW!</button>
      </section>
    </main>
    </>
  );
}

export default Home;
