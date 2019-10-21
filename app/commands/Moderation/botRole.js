module.exports = {
    command: "botrole",
    description: "assign a role to all bots in the server",
    syntax: ")>botrole [Role Name]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        let interval = 750;
        let promise = Promise.resolve();
        let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
        if(!targetRole) msg.channel.createMessage('Could not find that role')
        targetRole = targetRole.id
        let bots = msg.channel.guild.members.filter(m => m.bot);
        msg.channel.createMessage(`Now assigning this role to ${bots.length} bots`);
        bots.forEach(function (m) {
            promise = promise.then(function () {
                msg.channel.guild.addMemberRole(m.id, targetRole);
                return new Promise(function (resolve) {
                    setTimeout(resolve, interval);
                });
            });
        });
        promise.then(function () {
            msg.channel.createMessage(`<@${msg.author.id}> Finished Giving Bot Roles!`)
        });
    }
}