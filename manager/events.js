'use strict';

const events = require('events');

const eventsPool = new events();

module.exports = eventsPool;
