module.exports = {
    command:"pingstaff",
    description: "Ping all available staff with a reason",
    syntax: ")>pingstaff [text]",
    category: "Moderation",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        let staff = [];
        msg.channel.guild.members.filter(m => {
            let kickMembers = msg.channel.permissionsOf(m.id).has('kickMembers');
            let banMembers = msg.channel.permissionsOf(m.id).has('banMembers');
            if(kickMembers || banMembers) {
                if(m.status === "online" && m.bot === false) {
                    staff.push(`<@${m.id}>`);
                }
            }
        });
        if(!args[0] || args[0] === undefined) {
            msg.channel.createMessage(`**[STAFF PING]**\n**Pinged by**: <@${msg.author.id}>\n**Reason**: No Reason Specified\n**Staff**: ${staff.join(", ")}`)
        } else {
            msg.channel.createMessage(`**[STAFF PING]**\n**Pinged by**: <@${msg.author.id}>\n**Reason**: ${args.join(" ")}\n**Staff**: ${staff.join(", ")}`)
        }
    }
  }