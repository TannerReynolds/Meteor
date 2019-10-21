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
        let icon = "https://i.imgur.com/RHagTDg.png"
        let name = guild.name;
        let memCount = getMemberCount();
        let botCount = getBotCount();
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
        function getMemberCount() {
            let online = [];
            let offline = [];
            let away = [];
            let dnd = [];
            msg.channel.guild.members.map(m => {
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
              let mems = `**<:online:409660331401412608> Online**: \`${online}\`\n**<:DND:409660329736404992> DND**: \`${dnd}\`\n**<:away:409660329702719488> Idle**: \`${away}\`\n**<:Offline:409660331267457025> Offline**: \`${offline}\`\n**<:tzTickYes:409660331720310787> Total**: \`${msg.channel.guild.memberCount}\``;
              return mems;
        }
        function getBotCount() {
            let bots = msg.channel.guild.members.filter(m => m.bot)
            let online = [];
            let offline = [];
            let away = [];
            let dnd = [];
            bots.map(m => {
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
              let botString = `**<:online:409660331401412608> Online**: \`${online}\`\n**<:DND:409660329736404992> DND**: \`${dnd}\`\n**<:away:409660329702719488> Idle**: \`${away}\`\n**<:Offline:409660331267457025> Offline**: \`${offline}\`\n**<:tzTickYes:409660331720310787> Total**: \`${bots.length}\``;
              return botString;
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