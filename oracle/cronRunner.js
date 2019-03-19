'use strict'

const shell  = require('shelljs');
const cron   = require('node-cron');

// Each 2 Minute
// cron.schedule('*/2 * * * *', function() {

// Each 1 Minute
cron.schedule('* * * * *', function() {
    shell.exec('node index.js');
});