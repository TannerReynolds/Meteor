const express = require('express');
const fs = require('fs-extra');
const app = express();
const bodyParser = require('body-parser');
const Eris = require('eris');
const path = require('path');
const utils = require(`${__dirname}/util`);
const routes = require(`${__dirname}/routes`);
const events = require(`${__dirname}/events`);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const helmet = require('helmet');
const scan = require("recursive-readdir")

class Meteor {
  /**
 * Starting server and bot, handling routing, and middleware
 * @param {object} c - configuration json file
 */
  constructor(c) {
      this.db = db;
      /** Setting LowDB Defaults */
      db.defaults({
          guilds: [],
          channels: [],
          users: [],
      })
          .write();
      this.app = app;
      this.c = c;
      this.utils = utils;
      this.events = events;
      this.log = this.utils.logger;
      this.scan = scan;
      this.masscmds = new Set();
      this.othercmds = new Set();

      this.app.set('view engine', 'ejs');
      this.app.set('views', path.join(__dirname, '/views'));
      this.app.use(helmet());
      this.app.use(bodyParser.text());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({
        extended: true,
      }));

      this.app.get('/', res.send('<h1>Web Works'));
    }

    async runDiscordBot() {
      this.bot = new Eris(this.c.discordToken, { maxShards: "auto", getAllUsers: true, disableEveryone: false, defaultImageSize: 2048, defaultImageFormat: "png" })
      this.log.verbose('Connecting to Discord...');
      this.commands = [];
      this.loadCommands();
      this.bot
        .on('messageCreate', this.events.messageCreate.bind(this))
        .on('ready', this.events.ready.bind(this))
        .on('guildCreate', this.events.guildCreate.bind(this))
        .on('guildDelete', this.events.guildDelete.bind(this))
        .on('guildMemberAdd', this.events.guildMemberAdd.bind(this))
        .on('guildMemberRemove', this.events.guildMemberRemove.bind(this))
        .on('messageDelete', this.events.messageDelete.bind(this))
        .on('messageUpdate', this.events.messageUpdate.bind(this))
        .on('guildBanAdd', this.events.guildBanAdd.bind(this))
        .on('guildBanRemove', this.events.guildBanRemove.bind(this))
      this.bot.connect();
    }

    async loadCommands() {
      this.scan(`${__dirname}/commands/`, (err, files) => {
        for(i = 0; i < files.length; i++) {
            if(files[i].endsWith(".js")) {
              let file = `./${files[i]}`
              delete require.cache[require.resolve(file)];
              this.commands.push(require(file))
            }
        }
      });
    }
  }

module.exports = Meteor;