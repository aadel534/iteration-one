import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from '../ContextAPI/UserContext';

interface FacePosition {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface DetectionResponse {
    code: number;
    data: {
        status: string;
        result: {
            face_positions: FacePosition[];
        };
    };
}

export function AIVideo() {
    const { firstName } = useUser();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>("");

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileSize = file.size / 1024 / 1024; // size in MB
            if (fileSize > 10) { // Check if your API has a file size limit
                alert('File size exceeds the limit');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImageURL(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDetection = async (): Promise<FacePosition[] | null> => {
        if (!imageURL) {
            alert('Image URL must be set for detection');
            return null;
        }

        try {
            const response = await axios.post<DetectionResponse>('https://api.nero.com/biz/api/task', {
                type: "FaceAnimation:Detection",
                body: { image: imageURL }
            }, {
                headers: {
                    'x-neroai-api-key': 'LYIWDGQ7KSEF39H66WYU5OWA',
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.code === 0) {
                return response.data.data.result.face_positions;
            }
            throw new Error('API response code indicates failure');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to detect face positions.');
            return null;
        }
    };

    const handleGeneration = async (facePositions: FacePosition[]): Promise<void> => {
        try {
            const response = await axios.post('https://api.nero.com/biz/api/task', {
                type: "FaceAnimation:Generation",
                body: {
                    image: imageURL,
                    face_positions: facePositions
                }
            }, {
                headers: {
                    'x-neroai-api-key': 'your API key',
                    'Content-Type': 'application/json'
                }
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!imageFile) {
            alert('An image file is required to proceed!');
            return;
        }

        const positions = await handleDetection();
        if (positions) {
            await handleGeneration(positions);
        }
    };

    return (
        <>
            {/* Header and Navigation Components */}
            <main className="text-white font-sans subpixel-antialiased font-thin lowercase flex justify-center bg-black">
                <section className="text-center">
                    <h1 className="text-5xl text-blue-200 mt-20 mb-20">
                        AI Video Generator
                    </h1>
                    <form onSubmit={handleSubmit} className="flex justify-center">
                        <label htmlFor="image" className="pr-10">Image:</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        <button type="submit" className="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Generate Video
                        </button>
                    </form>
                </section>
            </main>
            {/* Footer Here */}
        </>
    );
}
