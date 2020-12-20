const express = require('express');
const http = require('http');
const { disconnect } = require('process');
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000;
const router = require('./router');
var cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


io.on('connection', (socket) => {
    console.log('we have a connection... !!!');

    socket.emit('msg', 'testing...');

    socket.on('inputMessage', (msgData) => {
      io.emit('responseMessage', msgData);
    })

    socket.on('disconnect', () => {
        console.log('user left...!!!')
    })


})

app.use(router);

server.listen(PORT, () => {
    console.log(`Servcer is running on port ${PORT}`)
})