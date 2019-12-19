const express = require('express');
const fs = require('fs-extra');
const app = express();
const bodyParser = require('body-parser');
const Eris = require('eris');
const path = require('path');
const utils = require(`${__dirname}/util`);
const routes = require(`${__dirname}/routes`);
const events = require(`${__dirname}/events`);
const helmet = require('helmet');
const scan = require("recursive-readdir")

class Meteor {
  /**
 * Starting server and bot, handling routing, and middleware
 * @param {object} c - configuration json file
 */
  constructor(c) {
      this.app = app;
      this.c = c;
      this.utils = utils;
      this.events = events;
      this.log = this.utils.logger;
      this.scan = scan;
      this.commands = [];
      this.masscmds = new Set();
      this.othercmds = new Set();
      this.emojis = {
        error: '<:error:636070048867287041>',
        success: '<:tzTickYes:502703803154432010>',
        dnd: '<:DND:502703802936459274>',
        offline: '<:Offline:502703802915356672>',
        online: '<:online:502703803133591553>',
        away: '<:away:502703802919419924>',
      }
      this.defaults = {
        guildIcon: "https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png"
      }

      this.runDiscordBot();
      this.startWebsite();

      this.app.set('view engine', 'ejs');
      this.app.set('views', path.join(__dirname, '/views'));
      this.app.use(helmet());
      this.app.use(bodyParser.text());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({
        extended: true,
      }));
      this.app.use(express.static(`${__dirname}/views/`, {
        extensions: ['css', 'js', 'png', 'jpg', 'gif', 'svg', 'html'],
      }));

      this.app.get('/', routes.main.bind(this));
    }

    async runDiscordBot() {
      this.bot = new Eris(this.c.discordToken, { maxShards: "auto", getAllUsers: true, disableEveryone: false, defaultImageFormat: "png" })
      this.log.verbose('Connecting to Discord...');
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
        for(let i = 0; i < files.length; i++) {
            if(files[i].endsWith(".js")) {
              let file = `${files[i]}`
              this.log.success(files[i])
              delete require.cache[require.resolve(file)];
              this.commands.push(require(file))
            }
        }
      });
    }

    async startWebsite() {
      this.app.listen(this.c.port, '0.0.0.0', () => {
        this.log.success(`Server listening on port ${this.c.port}`);
      });
    }
  }

module.exports = Meteor;