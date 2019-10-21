module.exports = {
    command: "massremoverole",
    description: "Take a role away from everybody on your server that has that role",
    syntax: ")>massremoverole [Role Name]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        let interval = 1000;
        let promise = Promise.resolve();
        let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
        if(!targetRole) msg.channel.createMessage("Could not find that role")
        targetRole = targetRole.id
        msg.channel.createMessage("Now removing the role");
        msg.channel.guild.members.filter(m => m.roles.includes(targetRole)).forEach(m => {
            promise = promise.then(() => {
                msg.channel.guild.removeMemberRole(m.id, targetRole);
                return new Promise(resolve => {
                    setTimeout(resolve, interval);
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`<@${msg.author.id}> Finished mass role removing!`)
        });
    }
}