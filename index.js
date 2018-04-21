const Recorder = require("recorderjs");
const FileSaver = require("file-saver");

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
            console.log(blob);
            FileSaver.saveAs(blob, "it_works.wav");
            let sound = URL.createObjectURL(blob);
            console.log(sound);
            document.getElementById("audioplay").setAttribute("src", sound);
        });
    }, 5000);
}).catch(error => {
    console.log(error);
});