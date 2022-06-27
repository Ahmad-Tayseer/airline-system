'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}/`;
const systemConnection = io.connect(host);

const { v4: uuid } = require('uuid');
const { faker } = require('@faker-js/faker');

setInterval(() => {
    console.log('------------------------------------------------------------');
    let flightID = uuid();
    console.log(`Manager: new flight with ID ‘${flightID}’ have been scheduled`);
    let Details = {
        airLine: 'Royal Jordanian Airlines',
        flightID: flightID,
        pilot: `${faker.name.firstName()} ${faker.name.lastName()}`,
        destination: faker.address.city(),
    }
    systemConnection.emit('new-flight', Details);
}, 10000);


systemConnection.on('arrived', notifyArrived);

function notifyArrived(payLoad) {
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${payLoad['pilot']}`);
}