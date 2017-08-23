const defaultConfig = './config-default.js';
const productionConfig = './config-production.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        console.log(`Load ${productionConfig}...`);
        config = Object.assign(config, require(productionConfig));
    } catch (err) {
        console.log(`Cannot load ${productionConfig}.`);
    }
}

module.exports = config;