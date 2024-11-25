const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send('Chat server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages
    socket.on('message', (msg) => {
        io.emit('message', msg);  // Broadcast message to all connected users
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
