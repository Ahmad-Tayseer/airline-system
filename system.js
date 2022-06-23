'use strict';

const events = require('./events');
events.on('new-flight', notifyFlight);

function notifyFlight(payLoad) {
    console.log('Flight', {
        event: 'new-flight',
        time: new Date().toLocaleString(),
        Details: payLoad,
    });
}

events.on('took-off', notifyTookOff);

function notifyTookOff(payLoad) {
    console.log('Flight', {
        event: 'took-off',
        time: new Date().toLocaleString(),
        Details: payLoad,
    });
}

events.on('arrived', notifyArrived);

function notifyArrived(payLoad) {
    console.log('Flight', {
        event: 'arrived',
        time: new Date().toLocaleString(),
        Details: payLoad,
    });
}

