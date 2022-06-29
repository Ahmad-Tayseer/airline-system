'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3030;

const socket = require('socket.io');
const ioServer = socket(PORT);

const { v4: uuid } = require('uuid');

let queue = {
    flights: {

    }
}

const airline = ioServer.of('/airline');
airline.on("connection", (socket) => {
    console.log('connected to airline ', socket.id);

    socket.on('took-off', notifyTookOff);

    function notifyTookOff(payLoad) {
        console.log('Flight', {
            event: 'took-off',
            time: new Date().toLocaleString(),
            Details: payLoad,
        });
        airline.emit('took-off', payLoad);
    }
});


ioServer.on("connection", (socket) => {
    console.log('Connected to global ', socket.id);

    socket.on('new-flight', notifyFlight);

    function notifyFlight(payLoad) {
        console.log('------------------------------------------------------------');
        console.log('Flight', {
            event: 'new-flight',
            time: new Date().toLocaleString(),
            Details: payLoad,
        });
        ioServer.emit('new-flight', payLoad);

        let id = uuid();

        let details = {
            event: 'new-flight',
            time: new Date().toLocaleString(),
            Details: payLoad,
        }

        queue.flights[id] = details;
    }


    socket.on('get-all', () => {
        console.log('get all flights');
        
        Object.keys(queue.flights).forEach((id) => {
            socket.emit('flight', {
                id: id,
                details: queue.flights[id],
            })
        })
    })

    socket.on('delete', (flight) => {
        delete queue.flights[flight.id];
        console.log('flight seen and deleted');
        console.log(queue.flights[flight.id]);
    })


    socket.on('arrived', notifyArrived);

    function notifyArrived(payLoad) {
        console.log('Flight', {
            event: 'arrived',
            time: new Date().toLocaleString(),
            Details: payLoad,
        });
        ioServer.emit('arrived', payLoad);
    }
});
