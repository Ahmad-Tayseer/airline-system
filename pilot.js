'usr strict';

const events = require('./events');

events.on('new-flight', notifyTookOff);

function notifyTookOff(payLoad) {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ‘${payLoad['flightID']}’ took-off`);
        events.emit('took-off', payLoad);
    }, 4000);
}

events.on('took-off', notifyArrived);

function notifyArrived(payLoad) {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ‘${payLoad['flightID']}’ has arrived`);
        events.emit('arrived', payLoad);
    }, 3000);
}