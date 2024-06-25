import { useEffect } from "react";
import "../Home/Home.css";
;
import {NavLink} from "react-router-dom";

export function Privacy() {
  useEffect(() => {
    document.title = "LCAI! | Privacy Policy";
  }, []);

  return (
    <>
      <header>
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
            <h1>Privacy Policy</h1>
            <p style={{fontSize: "2vw"}}>

Welcome to Lights, Camera, Artificial Intelligence! We are committed to protecting your personal data and ensuring transparency regarding how we collect, use, and share it. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our service.
LCAI! collects information necessary for the application to function.

Personal information is collected. When you register for an account, we collect personal information such as your first name, last name, email address, and password. This information is used to create and manage your account.


Media information is collected. When you use our emotion recognition features, we collect and process video streaming input from your webcam. This is provided to the emotion recognition service and is not stored permanently.


To Provide and Maintain Our Service we use your personal information to create and manage your account, and to provide the features of our service.


To communicate with you we may use your personal information to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you.

To ensure compliance with legal obligations we may disclose your personal information to comply with legal obligations, regulations, or valid legal requests.


We do not share your personal information with third parties except as described in this Privacy Policy or with your explicit consent. 


We are committed to ensuring the security of your personal information. We use technical measures to protect your data from unauthorized access, use, alteration, and disclosure. However, please be aware that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.

Your Data Protection Rights are detailed as follows.

You have the right to: access Your data  and you can request copies of your personal data;
rectify Your data and you can request that we correct any information you believe is inaccurate or complete information you believe is incomplete, and you may
erase your data by requesting that we erase your personal data.
</p>
        


        </section>
        <section>
   
        </section>
      </main>
    </>
  );
};

