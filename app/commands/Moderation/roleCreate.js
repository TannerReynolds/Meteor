module.exports = {
    command: "rolecreate",
    description: "Create a role",
    syntax: ")>rolecreate [Role Name] | [Role Color]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        roleArgs = args.join(" ").split(/ *\| */);
        if(!args[0]) return msg.channel.createMessage('You did not type anything in. The syntax is ")>rolecreate (rolename) | (role color hex code)" The color option is optional.');
        let roleName = roleArgs[0];
        let roleColor = null
        if(roleArgs[1]) {
            roleColor = roleArgs[1].toLowerCase();
            if(roleColor.includes('#')) roleColor = roleArgs[1].toLowerCase().replace('#', '');
        }
        if(!roleArgs[1] || !roleColor.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            return msg.channel.guild.createRole({name: roleName}).then(r => {
                msg.channel.createMessage(`Successfully Created Role \`${roleName}\``);
            })
            .catch(e => {
                msg.channel.createMessage('Could not create role...');
            });
        }
        return msg.channel.guild.createRole({name: roleName, color: parseInt(`0x${roleColor}`)}).then(r => {
                msg.channel.createMessage(`Successfully Created Role \`${roleName}\``);
            })
            .catch(e => {
                msg.channel.createMessage('Could not create role...');
            });
    }
}