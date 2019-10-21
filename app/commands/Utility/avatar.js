module.exports = {
  command:"avatar",
  description: "Get a user's avatar",
  syntax: ")>avatar [User Mention | User ID]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
    if(!args[0] || args[0] === undefined) {
      msg.channel.createMessage("You did not supply a user to get an avatar from");
    } else if(msg.mentions.length >= 1) {
      displayAvatar(msg.mentions[0].avatarURL, msg.mentions[0].username)
    } else if(msg.content.match(/[0-9]{16,18}/)) {
      let id = msg.content.match(/[0-9]{16,18}/)[0];
      let avi = bot.users.get(id).avatarURL
      let usrname = bot.users.get(id).username
      displayAvatar(avi, usrname)
    } else {
      let name = args.join(" ").toLowerCase();
      try {
          if(msg.channel.guild.members.get(msg.author.id) && msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )) {
              let avi = msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )[0].avatarURL;
              let usrname = msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )[0].username
              displayAvatar(avi, usrname)
          }
      } catch (e) {
          return msg.channel.createMessage("You did not supply a user to get an avatar from");
      }
    }
    async function displayAvatar(avi, usrname) {
     return msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: usrname, icon_url: avi}, image: {url: avi}}});
    }
  }
}