const stream = require("stream");
const Speaker = require("speaker");
const io = require("socket.io-client");

const socket = io("http://localhost:3000/audio");

socket.on("connect", () => {
    console.log("connected");
});

socket.on("warning", data => {
    const speaker = new Speaker({
        channels: 1,
        bitDepth: 32,
        sampleRate: 44100
    });
    let bufferStream = new stream.PassThrough();
    bufferStream.end(data);
    bufferStream.pipe(speaker);
});
