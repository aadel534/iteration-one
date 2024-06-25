import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';
import dashboardcss from "../Dashboard/Dashboard.module.css";
import signup from "../Register/Register.module.css";
import Modal from 'react-modal';


// Settings component for user to change password or delete account
export function Settings() {
  const { userId, navbarname } = useUser(); 
  const [userFirstName, setUserFirstName] = useState<string>(""); 
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [successPasswordChange, setSuccessPasswordChange] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Settings";
  }, []);

  
  // Handle the logout functionality
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Handle change password button 
  const handleChangePassword = () => {
    setModalAction("changePassword");
    openModal();
  };

  // Handle delete account 
  const handleDeleteAccount = () => {
    setModalAction("deleteAccount");
    openModal();


  }

  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleModalSubmit = () => {
    if (modalAction === "changePassword") {
      axios.post("/api/changepassword", {
        oldPassword,
        newPassword,
        userId


      }).then(response => {
        setSuccessPasswordChange("Password successfully changed.");
        setModalAction("");

        closeModal();


      })
      .catch(error => {
        console.error("Error changing password ", error);
      })

  }
  else if (modalAction === "deleteAccount"){
    axios.post("/api/deleteaccount", {oldPassword, userId})
    .then(response => {
      setModalAction("");
      closeModal();
      navigate("/");
    })
    .catch(error => {
      console.error("Error deleting account ", error);
    })

}
  }
  return (
    <>
      <header>
        <nav>
          <NavLink to="/dashboard">
            <h1>LC<span>AI</span>!</h1>
            <h1>Lights, Camera, AI!</h1>
          </NavLink>
          <ul>
            <li className="login-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <span>Logout {userFirstName}?</span>
            </li>
            <NavLink to="/settings">
              <li style={{ marginRight: "10vw" }} className="signup-link">
                <span>Settings</span>
              </li>
            </NavLink>
          </ul>
        </nav>
      </header>
      <main>
        <section className={dashboardcss.section}>
          <h2>Settings</h2>
          {successPasswordChange && <p style={{ color: "green", position: "absolute", top: "20vh", textAlign: "center" }}>{successPasswordChange}</p>}

          <form className={signup.form} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="change-password">Enter new password:</label>
            <input type="password" name="change-password"onChange={(e) => setNewPassword(e.target.value)}/>
            <button type="button" style={{position: "absolute", top: "20vh"}} onClick={handleChangePassword}>
              Change Password
            </button>
            <Modal
        isOpen={modalIsOpen}
            onRequestClose={closeModal}
        contentLabel="Confirm with your password">
                    <form className={signup.form} onSubmit={(e) => e.preventDefault()}>
                    <label style={{color: "black", fontFamily:"sans-serif"}} htmlFor="confirm-password">Enter old password:</label>
            <input type="password" name="confirm-password" onChange={(e) => setOldPassword(e.target.value)}/>
            <button type="button" style={{position: "absolute", top: "20vh"}} onClick={handleModalSubmit}>
              Confirm
            </button>
                      </form>


          </Modal>
                 <button name="confirm" type="button" style={{position: "absolute", top: "40vh", backgroundColor:"red", color: "white"}}  onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </form>
        </section>
      </main>
  
    </>
  );

}