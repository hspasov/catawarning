const Recorder = require("recorderjs");
const FileSaver = require("file-saver");
const io = require("socket.io-client");

const socket = io("http://localhost:3000/audio");

socket.on("connect", () => {
    console.log("connected with socket");
});

const constraints = {
    audio: true,
    video: false
};

let recorder;

navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    let audioContext = new AudioContext;
    recorder = new Recorder(audioContext.createMediaStreamSource(stream));
    console.log(recorder);
    recorder.record();
    console.log("Started recording");
    setTimeout(() => {
        recorder.stop();
        console.log("Stopped recording");
        recorder.exportWAV(blob => {
            socket.emit("audio", blob);
        });
    }, 5000);
}).catch(error => {
    console.log(error);
});