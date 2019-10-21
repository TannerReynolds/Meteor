const fs = require('fs');
module.exports = {
  command:"guilds",
  description: "Lists all guilds that the bot is on with some information in a json format",
  syntax: ")>guilds",
  category: "Developer",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
    let guildInfo = bot.guilds.map(g => `"${g.name}": { 
    "MEMBER COUNT": "${g.memberCount}", 
    "GUILD ID": "${g.id}", 
    "OWNER ID": "${g.ownerID}", 
    "LARGE GUILD": "${g.large}", 
    "HAS ADMIN": "${g.members.get(bot.user.id).permission.allow === 2146958591}", 
    "REGION": "${g.region}" 
},`).join("\n");
    fs.writeFile(`${msg.id}${bot.uptime}GUILDINFO.json`, JSON.stringify(guildInfo), err => {
      if(err){
        console.log(err);
        return msg.channel.createMessage('Error while processing guild information.');
      }else{
        msg.channel.createMessage(`Guild Info file made! Reporting info on ${bot.guilds.size} guilds!`);
        let fileContent = `{\n${guildInfo}\n}`.replace("\\", "/");
        return msg.channel.createMessage('', {name: "GuildInfo.json", file: fileContent});
      }
    });
  }
}