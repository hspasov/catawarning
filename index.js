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
let blob;

const actionButton = document.getElementById("action");

async function record() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const audioContext = new AudioContext;
        recorder = new Recorder(audioContext.createMediaStreamSource(stream));
        recorder.record();
        actionButton.onclick = stop;
        actionButton.innerHTML = "Stop"
    } catch (error) {
        console.log(error);
    }
}

async function stop() {
    recorder.stop();
    recorder.exportWAV(b => {
        blob = b;
        actionButton.onclick = play;
        actionButton.innerHTML = "Play";
    });
}

async function play() {
    const reader = new FileReader();
    reader.onload = e => {
        const player = new Audio(e.target.result);
        player.play();
    };
    reader.readAsDataURL(blob);
}

function submit() {
    const key = document.getElementById("key").value;
    socket.emit("audio", { blob, key });
}

actionButton.onclick = record;
actionButton.innerHTML = "Record";

document.getElementById("submit").onclick = submit;