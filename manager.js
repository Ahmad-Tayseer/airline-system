'use strict';

const events = require('./events');


const { v4: uuid } = require('uuid');

require('./system');
require('./pilot');
const { faker } = require('@faker-js/faker');

// events.on('new-flight', setInterval(notifyFlight, 3000));

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
    events.emit('new-flight', Details);
}, 10000);


events.on('arrived', notifyArrived);

function notifyArrived(payLoad) {
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${payLoad['pilot']}`);
}