module.exports = {
    command: "roledelete",
    description: "Delete a role",
    syntax: ")>roledelete [Role Name]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        targetRole = null;
        if(!args) return msg.channel.createMessage('You did not specify a role to delete. The syntax is ")>roledelete (name role to delete)"');
        if(!msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0]) return msg.channel.createMessage('Could not find this role');
        targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0].id;
        return msg.channel.guild.deleteRole(targetRole).then(r => {
            msg.channel.createMessage(`Successfully deleted role \`${args.join(" ")}\``);
        })
        .catch(e => {
            msg.channel.createMessage(`Could not delete role \`${args.join(" ")}\``);
        });
    }
}