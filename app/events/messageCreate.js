async function messageCreate(msg) {
  let pref = this.c.prefix;
  let mentionPrefRegex = /<@(!)?635347873344782337>/;
  if(msg.author.bot) return;
  let sendMessages = msg.channel.permissionsOf(this.bot.user.id).has("sendMessages");
  let embedLinks = msg.channel.permissionsOf(this.bot.user.id).has("embedLinks");
  if(!sendMessages) return;
  if(!embedLinks) msg.channel.createMessage("This bot requires the `embedLinks`/`attachFiles` permissions in order for all of it's functions to work properly")

  //let channelDB = this.db.get('channels').find({ id: msg.channel.id }).value();
  //let guildDB = this.db.get('guilds').find({ id: msg.channel.guild.id }).value();

  let mentionPref = pref
  if(msg.content.match(mentionPrefRegex)) {
    mentionPref = msg.content.match(mentionPrefRegex)[0]
  }
  let commands = this.commands;
  let bot = this.bot
  let meteor = this
  let masscmds = this.masscmds;
  let othercmds = this.othercmds;
  let c = this.c;
/*
  if(channelDB !== undefined) {
      if(channelDB.pollingChannel === true) {
        msg.addReaction("tzTickYes:409660331720310787")
        msg.addReaction("tzTickNo:409660331577835521")
      }
      if(channelDB.linkBlock === true) {
        if(msg.content.match(/\bhttps?:\/\/\S+/i)) {
            let manageMessages = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
            let moderator = msg.channel.permissionsOf(msg.author.id).has("banMembers")
            if(moderator) return;
            if(!manageMessages) return;
            msg.delete().then(m => {
              msg.channel.createMessage(`Sorry <@${msg.author.id}>, all links have been blocked in this channel by an administrator`)
            })
        }
      }
  }
*/
  let customPrefix = false;
  let blacklisted = 0
/*
  if(guildDB !== undefined) {
      if(guildDB.adblock === true) {
        if(msg.content.match(/\b(?:https?:\/\/)?discord(?:app)?\.(?:com\/invite\/|gg)+\/*([A-Za-z_0-9]+)/g)) {
            let mod = msg.channel.permissionsOf(msg.author.id).has("banMembers");
            let canDelete = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
            if(mod) return;
            if(!canDelete) return;
            msg.delete().then(m => {
              msg.channel.createMessage(`<@${msg.author.id}> Please do not post invite links again.`)
            })
        }
      }
      if(guildDB.blacklist.size > 0) {
          blacklisted = guildDB.blacklist
      }
      if(guildDB.prefix) {
          customPrefix = guildDB.prefix
      }
  }
*/

  // Reload function for commands
  if(msg.content === `${pref}rl` && c.devs.includes(msg.author.id)) {
      this.commands = [];
      this.scan(`${__dirname}/../commands/`, (err, files) => {
        for(i = 0; i < files.length; i++) {
            if(files[i].endsWith(".js")) {
              let file = `${files[i]}`
              delete require.cache[require.resolve(file)];
              this.commands.push(require(file))
            }
        }
    })
    return msg.channel.createMessage("Reloaded Commands")
  }


  if(customPrefix === false) {
    if(msg.content.indexOf(pref) !== 0 && msg.content.indexOf(mentionPref) !== 0) return;
    if(msg.content.startsWith(mentionPref)) {
      executeCmd(mentionPref);
    } else {
      executeCmd(pref);
    }
  } else { // If there IS a custom prefix then use it or the mention prefix
    if(msg.content.indexOf(customPrefix) !== 0 && msg.content.indexOf(mentionPref) !== 0) return;
    if(msg.content.startsWith(mentionPref)) {
      executeCmd(mentionPref);
    } else {
      executeCmd(customPrefix);
    }
  }


  // Function used to actually execute commands
  async function executeCmd(thePrefix) {

    // Defining args and command
    const args = msg.content.slice(thePrefix.length).trim().split(/ +/g);
    const command = args.shift().toString().toLowerCase();

    // Checking the guild's command blacklist
    let isBlacklisted = false;
    if(blacklisted.length > 0) {
        for(i = 0; blacklisted.length > i; i++) {
            if(blacklisted[i] === command) { 
              isBlacklisted = true
            }
        }
    }
    if(isBlacklisted === true) return msg.channel.createMessage("This command has been blacklisted by an administrator.");

    // Cycling through commands to find a match
    for(i=0;commands.length>i;i++){
      if(commands[i].command == command){

        // Checking for category-specific requirements
        if(commands[i].category === "Developer" && !c.devs.includes(msg.author.id)) return msg.channel.createMessage("You must be a developer to use this command");

        let nitroBooster
        bot.guilds.get("299075280503308288").members.get(msg.author.id) && bot.guilds.get("299075280503308288").members.get(msg.author.id).roles.includes("585647474362810378") 
        ? nitroBooster = true
        : nitroBooster = false
        
        // Checking to see if the author and bot actually have permissions to execute this command effectively
        let perms = msg.channel.permissionsOf(msg.author.id).has(commands[i].permission) && msg.channel.permissionsOf(bot.user.id).has(commands[i].botPermission);
        if(!perms && !c.devs.includes(msg.author.id)) return msg.channel.createMessage(`You require the \`${commands[i].permission}\` permission, and the bot requires the \`${commands[i].botPermission}\` permission.`)
        
        // if command is a mass command to add/remove/respond to cooldown. Mass cooldown is an hour
        if(commands[i].command.startsWith("mass")) {
          if(masscmds.has(msg.author.id) && nitroBooster === false) {
              cooldown = 3600000
              return msg.channel.createMessage("Please wait an hour before running another `mass` command\nYou can lower the ratelimit to just 10 minutes if you nitro boost Meteor's server @ https://meteorbot.space/discord")
          } else if(masscmds.has(msg.author.id) && nitroBooster === true) {
              cooldown = 600000
              return msg.channel.createMessage("Please wait 10 minutes before running another `mass` command\nThank you for being a nitro booster on Meteor's server!")
          } else {
              if(nitroBooster === false) {
                masscmds.add(msg.author.id);
                setTimeout(() => masscmds.delete(msg.author.id), 3600000);
              } else {
                masscmds.add(msg.author.id);
                setTimeout(() => masscmds.delete(msg.author.id), 600000);
              }
          }
        } else { // Otherwise use the default cooldown of 3 second
          if(othercmds.has(msg.author.id) && nitroBooster === false) {
            return msg.channel.createMessage("Please wait 3 seconds before running another command\nYou can get rid of the ratelimit if you nitro boost Meteor's server @ https://meteorbot.space/discord")
          } else {
              if(nitroBooster === false) {
                othercmds.add(msg.author.id);
                setTimeout(() => othercmds.delete(msg.author.id), 3000);
              }
          }
        }

        // Run the command
        await commands[i].execute(meteor, bot, msg, args);
        break;
      }
    }
  }
}
module.exports = messageCreate;