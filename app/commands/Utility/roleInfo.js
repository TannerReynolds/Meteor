module.exports = {
    command:"roleinfo",
    description: "Get information on a specific role",
    syntax: ")>roleinfo [Role Name]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined) {
            return msg.channel.createMessage("You need to insert a role to find info on")
        } else {
            let target = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
            let made = getDate(target.createdAt);
            let permissions = require("util").inspect(target.permissions.json);
            
            msg.channel.createMessage({ embed: {
                color:0x36393E,
                author: {
                    icon_url: msg.author.avatarURL,
                    name: `${msg.author.username}#${msg.author.discriminator}`
                },
                fields: [
                    {name: "Name", value: target.name},
                    {name: "ID", value: target.id},
                    {name: "Position", value: target.position},
                    {name: "Color", value: target.color},
                    {name: "Hoisted", value: target.hoist},
                    {name: "Mentionable", value: target.mentionable},
                    {name: "Permissions", value: `\`\`\`json\n${permissions}\n\`\`\``},
                    {name: "Created At [MM/DD/YYYY]", value: made}
                ]
            }})
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