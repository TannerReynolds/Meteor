  
/* eslint-disable global-require */
/* eslint-disable no-console */
const Meteor = require(`${__dirname}/app/meteor`);
/** Setting definitions for the config file and server class */
let c;
let app;
console.log('Loading Meteor...')  
async function loadConfig() {
    process.argv[2] === '-test'
        ? c = require(`${__dirname}/config.real.json`)
        : c = require(`${__dirname}/config.json`);
}

loadConfig().then(() => {
    /** Starting server using the selected config file */
    app = new Meteor(c);
});
process.on('SIGINT', async () => {
    app.log.warning('Gracefully exiting..');
    process.exit();
});

process.on('unhandledRejection', async err => console.log(err.stack));
process.on('uncaughtException', async err => console.log(err.stack));