module.exports = {
    command:"serverinfo",
    description: "Get information on the current server you're in",
    syntax: ")>serverinfo",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        if(!msg.channel.guild) return;
        let guild = msg.channel.guild;
        let icon = meteor.defaults.guildIcon;
        let name = guild.name;
        let memCount = getMemberCount("user");
        let botCount = getMemberCount("bot");
        let region = guild.region;
        let id = guild.id;
        let owner = `<@${guild.ownerID}>`;
        let made = getDate(guild.createdAt)
        if(guild.iconURL) {
            icon = guild.iconURL
        }
        msg.channel.createMessage({ embed: {
            color:0x36393E,
            author: {
                icon_url: msg.author.avatarURL,
                name: `${msg.author.username}#${msg.author.discriminator}`
            },
            title: name,
            fields: [
                {name: "Icon URL", value: icon},
                {name: "Member Count", value: memCount, inline: true},
                {name: "Bot Count", value: botCount, inline: true},
                {name: "Region", value: region},
                {name: "Owner", value: owner},
                {name: "ID", value: id},
                {name: "Created At [MM/DD/YYYY]", value: made}
            ],
            thumbnail: {
                url: icon
            }
        }})
        function getMemberCount(type) {
            let online = [];
            let offline = [];
            let away = [];
            let dnd = [];
            let toMap
            type === "user" ? toMap = msg.channel.guild.members : toMap = msg.channel.guild.members.filter(m => m.bot)
            toMap.map(m => {
                if(m.status === "online") {
                    online.push(m.id);
                  }
                  if(m.status === "offline") {
                      offline.push(m.id);
                  }
                  if(m.status === "idle") {
                      away.push(m.id);
                  }
                  if(m.status === "dnd") {
                      dnd.push(m.id);
                  }
              });
              online.length >= 1 ? online = online.length : online = "0";
              dnd.length >= 1 ? dnd = dnd.length : dnd = "0";
              away.length >= 1 ? away = away.length : away = "0";
              offline.length >= 1 ? offline = offline.length : offline = "0";
              return `\n**${meteor.emojis.online} Online**: \`${online}\` \n**${meteor.emojis.dnd} DND**: \`${dnd}\` \n**${meteor.emojis.away} Idle**: \`${away}\` \n**${meteor.emojis.offline} Offline**: \`${offline}\` \n** ${meteor.emojis.success} Total**: \`${type === "user" ? toMap.size : toMap.length}\``;
        }
    }
  }
  function getDate(timestamp) {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let newDate = `${month}/${day}/${year}`
      return newDate;
  }