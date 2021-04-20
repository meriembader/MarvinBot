import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";

import { useState } from 'react';
import './VC.css';
export default function VirtualConsultation() {
    const [playing, setPlaying] = useState(false);

    const HEIGHT = 400;
    const WIDTH = 400;

    const startVideo = () => {
        setPlaying(true);
        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)
        );
    };

    const stopVideo = () => {
        setPlaying(false);
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    };



    return (
        <>
            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/img/doctors-day.jpg").default + ")",
                        }}
                    > <div className="container mx-auto items-center flex flex-wrap">
                            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                                <div className="pt-32 sm:pt-0">
                                    <br></br>
                                    <h1 className="text-white font-semibold text-5xl">
                                        Virtual Online Consultation                </h1>
                                    <br></br>
                                    <h4 className="text-white font-semibold text-3xl">
                                        How Does It Work?                </h4>
                                    <p className="mt-4 text-lg text-Black-200">
                                        <strong>
                                            Through our secure platform, you can review your detailed health information with a doctor over a live audio/visual connection. You will be discussing
                  your condition with the physician in real-time, so you will be able to ask them any questions during your conversation. They will work directly with you to educate you about all treatment options..<br />

                                        </strong>  </p>
                                </div>
                            </div>
                        </div>

                        <div className="app">
                            <div className="container">
                                <div className="flex content-center items-center justify-center h-full">

                                    <video

                                        height={HEIGHT}
                                        width={WIDTH}
                                        muted
                                        autoPlay
                                        className="app__videoFeed"
                                    ></video>


                                </div>
                            </div>

                            <br></br>
                            <button
                                className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-3 mb-3 ease-linear transition-all duration-150"
                                type="button"
                            >
                                {playing ? (
                                    <button onClick={stopVideo}>Stop Conversation</button>
                                ) : (
                                    <button onClick={startVideo}>Start Conversation</button>
                                )}
                            </button>



                        </div>




                    </div>


	);



        </section>


            </main>

        </>
    );
}
