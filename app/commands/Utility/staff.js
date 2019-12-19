module.exports = {
  command:"staff",
  description: "See the staff that are online",
  syntax: ")>staff",
  category: "Moderation",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
      let staffOnline = [];
      let staffOffline = [];
      let staffAway = [];
      let staffDnd = [];
      msg.channel.guild.members.filter(m => {
          let kickMembers = msg.channel.permissionsOf(m.id).has("kickMembers");
          let banMembers = msg.channel.permissionsOf(m.id).has("banMembers");
          if(kickMembers || banMembers) {
              if(m.status === "online" && m.bot === false) {
                  staffOnline.push(`\`${m.username}#${m.discriminator}\``);
                }
                if(m.status === "offline" && m.bot === false) {
                    staffOffline.push(`\`${m.username}#${m.discriminator}\``);
                }
                if(m.status === "idle" && m.bot === false) {
                    staffAway.push(`\`${m.username}#${m.discriminator}\``);
                }
                if(m.status === "dnd" && m.bot === false) {
                    staffDnd.push(`\`${m.username}#${m.discriminator}\``);
                }
            }
        });
        if(!staffOnline[0]) staffOnline = ["none"];
        if(!staffDnd[0]) staffDnd = ["none"];
        if(!staffAway[0]) staffAway = ["none"];
        if(!staffOffline[0]) staffOffline = ["none"];
        msg.channel.createMessage({ embed: {
            color:0x36393E,
            author: {
                icon_url: msg.author.avatarURL,
                name: `${msg.author.username}#${msg.author.discriminator}`
            },
            title: `${msg.channel.guild.name} Staff`,
            fields: [
                {name: `${meteor.emojis.online} Online`, value: staffOnline.join(", ")},
                {name: `${meteor.emojis.dnd} DND`, value: staffDnd.join(", ")},
                {name: `${meteor.emojis.away} Idle`, value: staffAway.join(", ")},
                {name: `${meteor.emojis.offline} Offline`, value: staffOffline.join(", ")},
            ]
        }})
  }
}
