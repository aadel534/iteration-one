import { useEffect } from "react";
import "./Home.css";
import FaceRecognition from "/images/face-recognition.svg";
import Sparkles from "/images/sparkles.svg";
import { Link, NavLink } from "react-router-dom";

export function Home() {
  useEffect(() => {
    document.title = "LCAI! | Convey emotions with AI";
  }, []);

  return (
    <>
      <header>
        {/* Spurce: https://reactrouter.com/en/main/components/nav-link */}

        <nav>
          <NavLink to="/">
            <h1>
              LC<span>AI</span>!
            </h1>
            <h1>Lights, Camera, AI!</h1>
          </NavLink>

          <ul>
            <NavLink
              to="/login">
              <li className="login-link">
                <span>Log in</span>
              </li>
            </NavLink>
            <NavLink
              to="/register">
              <li className="signup-link">
                <span>Sign up</span>
              </li>
            </NavLink>


          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Emotional AI for Emotional Intelligence</h1>
          <p>Real-time emotion recognition software</p>

          <figure className="emotions">
            <img src={FaceRecognition} alt="facerecog" />

          </figure>
          <figure>
            <img src={Sparkles} />
          </figure>


        </section>
        <section>

          <article>
            <h6>Detect facial expressions</h6>
            <p>LCAI! uses convolutional neural networks trained on a dataset of facial expressions to
              predict the emotion you are showing

            </p>

          </article>
          <article>
            <h6>Improve communication</h6>
            <p> Whether you're studying to communicate emotions in visual art or you need
              to boost your customer service skills, LCAI! can help.
            </p>
          </article>
          <article>
            <h6>Understand students</h6>
            <p>Detect how students are engaging with the study material from emotion data reports</p>
          </article>
          <article>
            <h6>Understand patients</h6>
            <p>Use in the context of mental health to understand how patients
              are feeling during talking therapy</p>
          </article>
          <article>
            <h6>Improve performances</h6>
            <p>Practise monologues and improve your ability to portray emotion using the
              real-time emotion feedback
            </p>
          </article>
          <form>

            <button type="submit" ><Link style={{ color: "gold", textDecoration: "none" }} to="/register">Sign up</Link></button>

          </form>
        </section>
      </main>
    </>
  );
};

