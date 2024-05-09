import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';
import Webcam from 'react-webcam';
import * as faceapi from "face-api.js";

// Configure CSRF tokens for Django backend
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export function EmotionScanner() {
  const { firstName } = useUser();

  const webcamRef = useRef<Webcam>(null);
  const [imageState, setImage] = useState();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [FERResult, setFERResult] = useState('Your projected emotion will be displayed here!');
  const [start, setStart] = useState(false);


  useEffect(() => {
    document.title = "Emotion Scanner";
  }, []);

  useEffect(() => {

    const loadModels = async () => {

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/faceapi'),
      ]);
      console.log('Face detection models loaded successfully');
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
            <NavLink to="/aivideo">

              <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">

                <span className="hover:bg-slate-200 rounded">AI Video Generator</span>
              </li>
            </NavLink>


            <li className="text-xl hover:text-blue-200 pr-10 hover:animate-pulse">
              <span className="hover:bg-slate-200 rounded">Emotion Scanner</span>
            </li>
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

      <main className=" font-sans relative subpixel-antialiased font-thin lowercase flex justify-center text-white bg-black">

        <section className="md:block text-center ">
          <h1 className="mt-20 text-5xl text-wrap  text-center ml-16 text-blue-200">
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

            <p className="absolute right-6 w-80 mt-20 ">{FERResult == "Hold on I am trying to detect your face! - AI" ? "" : "The emotion your face is currently projecting is:"} <span className="text-blue-200 animate-pulse">{FERResult}</span> </p>
          </article>

          <article className="mt-20 flex justify-center ">
            <Webcam
              // ref={webcamRef}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              width={600}
              height={600}
            />
            <button className={`${start ? "hidden" : "block"} cursor-pointer shadow bg-blue-200 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded `}
              onClick={handleClick}>Start AI! </button>
          </article>
          <article className="text-m mt-20">



          </article >


        </section>




      </main>
      <footer className="text-sm text-center pt-96 text-white font-thin bg-black lowercase font-sans">
        &copy; 2024 Adelayo Adebiyi
      </footer>
    </>
  );
}
