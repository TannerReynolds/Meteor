module.exports = {
    command:"userinfo",
    description: "Get information on a specific user",
    syntax: ")>userinfo [User Mention | User ID | User Name]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined) {
            return userInfo(msg.author.id)
        } else if(msg.mentions.length >= 1) {
            return userInfo(msg.mentions[0].id)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            let id = msg.content.match(/[0-9]{16,18}/)[0];
            return userInfo(id) 
        } else {
            let name = args.join(" ").toLowerCase();
            try {
                if(msg.channel.guild.members.get(msg.author.id) && msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )) {
                    let id = msg.channel.guild.members.filter(m => m.username.toLowerCase() === name )[0].id;
                    return userInfo(id)
                }
            } catch (e) {
                return msg.channel.createMessage("No user given");
            }
        }
        async function userInfo(id) {
            let target = msg.channel.guild.members.filter(m => m.id === id)[0];
            let made = getDate(target.user.createdAt);
            let allRoles = []
            for(i = 0; i < target.roles.length; i++) {
                let rolePush = msg.channel.guild.roles.get(target.roles[i]).mention;
                allRoles.push(rolePush)
            }
            msg.channel.createMessage({ embed: {
                color:0x36393E,
                author: {
                    icon_url: target.avatarURL,
                    name: `${target.username}#${target.discriminator}`
                },
                fields: [
                    {name: "Avatar URL", value: target.avatarURL},
                    {name: "ID", value: target.id},
                    {name: "Bot?", value: target.user.bot},
                    {name: "Permissions", value: `${getPerms()}`},
                    {name: "Status", value: target.status},
                    {name: "Roles", value: allRoles.join(", ") ? allRoles.join(", ") : "This user has no roles"},
                    {name: "Created At [MM/DD/YYYY]", value: made}
                ]
            }})
            function getPerms() {
                let perms = target.permission.json;
                perms = Object.keys(perms);
                let permString = [];
                for(i = 0; i < perms.length; i++) {
                    permString.push(`\`${perms[i]}\``);
                }
                permString = permString.join(", ")
                return permString;
            }
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