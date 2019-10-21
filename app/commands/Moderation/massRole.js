module.exports = {
    command: "massrole",
    description: "Give everybody on your guild a role",
    syntax: ")>massrole [Role Name]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        let interval = 1000;
        let promise = Promise.resolve();
        let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
        if(!targetRole) msg.channel.createMessage("Could not find that role")
        targetRole = targetRole.id
        msg.channel.createMessage("Now mass role giving to all members of the guild.");
        msg.channel.guild.members.filter(m => !m.roles.includes(targetRole)).forEach(m => {
            promise = promise.then(() => {
                msg.channel.guild.addMemberRole(m.id, targetRole);
                return new Promise(resolve => {
                    setTimeout(resolve, interval);
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`<@${msg.author.id}> Finished mass role giving!`)
        });
    }
}