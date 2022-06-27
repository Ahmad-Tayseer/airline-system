'usr strict';

require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}`;
let host2 = `http://localhost:${process.env.PORT}/airline`;
const systemConnection = io.connect(host);
const airlineConnection = io.connect(host2);

systemConnection.on('new-flight', notifyTookOff);

function notifyTookOff(payLoad) {
    setTimeout(() => {
        console.log('------------------------------------------------------------');
        console.log(`Pilot: flight with ID ‘${payLoad['flightID']}’ took-off`);
        airlineConnection.emit('took-off', payLoad);
    }, 4000);
}

airlineConnection.on('took-off', notifyArrived);

function notifyArrived(payLoad) {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ‘${payLoad['flightID']}’ has arrived`);
        systemConnection.emit('arrived', payLoad);
    }, 3000);
}
