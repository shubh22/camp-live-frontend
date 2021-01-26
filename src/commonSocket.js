const io = require('socket.io-client');

const socket = io("localhost:5000", {
    transports: ['websocket']
});

export default socket