module.exports = {
    command: "striproles",
    description: "Take all roles away from somebody (can take 10 roles away at a time)",
    syntax: ")>striproles [User Mention | User ID]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        if(!args) return msg.channel.createMessage('You did not say anything. The syntax is ")>roletake (user mention or user id) | (name role to take)"');
        if(msg.mentions.length >= 1) {
            stripRoles(msg.mentions[0].id)
        }
        if(isNaN(args[0]) || args[0].length > 18 && args[0].length < 16) return msg.channel.createMessage('This is not a user mention or an ID. The syntax is ")>roletake (user mention or user id) | (name role to take)"');
        if(!msg.channel.guild.members.filter(m => m.id === args[0])) return msg.channel.createMessage('Unable to find this user...');
        stripRoles(args[0])

        async function stripRoles(id) {
            let target = msg.channel.guild.members.filter(m => m.id === id)[0];
            let targetRoles = target.roles;
            try {
                for(i = 0; i < targetRoles.length; i++) {
                    if(i > 10) return;
                    msg.channel.guild.removeMemberRole(id, targetRoles[i])
                }
                msg.channel.createMessage(`Successfully stripped roles from ${target.username}#${target.discriminator}`)
            } catch (e) {
                msg.channel.createMessage(`There was an error stripping roles from ${target.username}#${target.discriminator}`)
            }
        }
    }
}