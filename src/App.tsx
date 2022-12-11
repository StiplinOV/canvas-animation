import React from 'react';
import './App.css';
import {P5Component} from "./P5Component";

const chunks: Blob[] = [];
let recorder: MediaRecorder | null = null

function App() {

    return (
        <>
            <div className="App">
                <P5Component/>
            </div>
            <button
                type="button"
                style={{position: "absolute", top: 900}}
                onClick={() => {
                    if (recorder) {
                        recorder.stop();
                    } else {
                        let stream = document.querySelector('canvas')?.captureStream(30)
                        if (!stream) {
                            return
                        }
                        recorder = new MediaRecorder(stream);
                        recorder.ondataavailable = e => {
                            if (e.data.size) {
                                chunks.push(e.data);
                            }
                        };
                        recorder.onstop = exportVideo;
                        recorder.start();
                    }
                }}
            >Export Video</button>
        </>
    );
}

function exportVideo(e: Event) {
    var blob = new Blob(chunks);
    var vid = document.createElement('video');
    vid.id = 'recorded'
    vid.controls = true;
    vid.src = URL.createObjectURL(blob);
    vid.style.top = "10000"
    document.body.appendChild(vid);
    vid.play();
}

export default App;
