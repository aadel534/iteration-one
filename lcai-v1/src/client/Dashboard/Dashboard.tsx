import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';
import dashboardcss from './Dashboard.module.css';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';
import { model } from "mongoose";
export function Dashboard() {
  // Configure CSRF tokens for Django backend
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  // Show user's first name on navigation and greeting
  const { userId, navbarname } = useUser();
  const [userFirstName, setUserFirstName] = useState("");

  // Set title text
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  // Set the user's name
  useEffect(() => {
    axios.post("/api/dashboard", userId)
      .then(response => {
        const { firstName } = response.data;
        setUserFirstName(firstName);
        navbarname(firstName);

      })
      .catch(error => {
        console.error("Error fetching user information: ", error);
      });

  }, []);

  const webcamRef = useRef<Webcam>(null);
  const [imageState, setImage] = useState();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [FERResult, setFERResult] = useState('Your projected emotion will be displayed here!');
  const [start, setStart] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all(
        [
          faceapi.nets.tinyFaceDetector.loadFromUri('/faceapi'),
        ]
      );
      console.log("Face detection models loaded successfully!");
      setModelsLoaded(true);

  };
  loadModels();
}, []);

useEffect(() => {
    if (start && webcamRef.current) {
      const captureFrame = async () => {
        const frame = webcamRef.current?.getScreenshot();
        if (modelsLoaded && frame) {
          console.log("Frame captured successfully");
          try {
            const image = new Image();
            image.src = frame;
            image.onload = async () => {
              setImage(imageState);
              await detectFace(image);
            };
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };

      const detectFace = async (image: HTMLImageElement) => {
        const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions());
        if (detection) {
          if (detection) {
            console.log("Face detected", detection);

            classifyFrame(detection);

          }
        } else {
          setFERResult("Hold on I am trying to detect your face! - AI");
          console.log("No face detected");

        }
      };




      const classifyFrame = async (detection: faceapi.FaceDetection) => {
        console.log("Classifying frame...");
        const regionsToExtract = [
          new faceapi.Rect(detection.box.x, detection.box.y, detection.box.width, detection.box.height)
        ];

        if (webcamRef.current?.video) {
          try {
            const canvas = await faceapi.extractFaces(webcamRef.current.video, regionsToExtract);
            if (canvas.length > 0) {
              const blob = await convertCanvasToBlob(canvas[0]);
              const image = await faceapi.bufferToImage(blob);
              renderCroppedImage(image, detection);
            } else {
              console.log("No face detected in the webcam feed.");
            }
          } catch (error) {
            console.error('Error during face detection:', error);
          }
        } else {
          console.log("Webcam video feed not available.");
        }
      };

      const renderCroppedImage = async (image: HTMLImageElement, detection: faceapi.FaceDetection) => {
        console.log("Rendering cropped image...");
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = 48;
        croppedCanvas.height = 48;
        const ctx = croppedCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, detection.box.x, detection.box.y, detection.box.width, detection.box.height, 0, 0, 48, 48);
          console.log("Cropped image drawn:", croppedCanvas);
          await predictFromCroppedImage(croppedCanvas);
        };
      }
      const predictFromCroppedImage = async (croppedCanvas: HTMLCanvasElement) => {
        console.log("Predicting from cropped image...");
        try {
          const image = new Image();
          const imageURL = croppedCanvas.toDataURL('image/jpeg');
          const imageResponse = await fetch(imageURL);
          const blob = await imageResponse.blob();
          const formData = new FormData();
          formData.append("image", blob)

          const response = await axios.post("http://127.0.0.1:8000/image_upload/", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          setFERResult(response.data.predictedEmotion);
        }
        catch (error) {
          console.error("Error during prediction", error);


        }
      }






      const convertCanvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert canvas to blob'));
              }
            },
            'image/jpeg',
          );
        });
      };


      captureFrame();

      const intervalId = setInterval(captureFrame, 1); // Capture frame every millisecond

      return () => {
        // Clear interval when component unmounts
        clearInterval(intervalId);
      };
    }
  }, [start, webcamRef]);



  const handleClick = () => {
    setStart(true);
    console.log("handleClick function called!")
  };

  return (
    <>
       <header>
        <nav>
        <NavLink to="/dashboard">
          <h1>
            LC<span>AI</span>!
          </h1>
          <h1>Lights, Camera, AI!</h1>
          </NavLink>

        </nav>
      </header>


      <main>

        <section className={dashboardcss.section}>
          <h2>
            Hello {userFirstName}!
          </h2>
          <article>
          <p>Our emotion recognition technology below is designed to recognise and detect
            your emotions in real-time. Please click on the button below to start the 
            emotion recognition process. Please note that our current technology 
            only detects the following emotions: anger, disgust, fear, happiness, neutrality,
            sadness, and surprise.
             </p>
           
          </article>


          <figure>
          <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              width={600}
              height={600}
              mirrored={true}
            />
            <figcaption> <p style={{fontSize: "3vh", color: "red", textAlign:"left", top: "-2vh", left:"-3vw"}}>
              {FERResult == "Hold on I am trying to detect your face! - AI" ? "" : "The emotion your face is currently projecting is: "}
               <span>{FERResult}</span> </p></figcaption>
            <button onClick={handleClick}>Start Emotion AI!</button>
          </figure>
         
        </section>
      </main>
    
    </>

  );
}
