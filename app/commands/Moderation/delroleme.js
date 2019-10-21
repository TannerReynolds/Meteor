module.exports = {
    command:"delroleme",
    description: "delete a role from roleme list",
    syntax: ")>delroleme [role name]",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "--clean") {
            conn.table('roleme').get(msg.channel.guild.id).delete().run()
                .then(res => { msg.channel.createMessage(`Successfully cleaned the roleme list`) })
                .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
        } else {
            let before = false;
            await conn.table('roleme').get(msg.channel.guild.id).run().then(entry => {
                if (!entry) {
                    msg.channel.createMessage('There is nothing to delete')
                } else if (entry) {
                    before = entry.roles
                }
            });
            if(before !== false) {
                if(!msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0]) return msg.channel.createMessage('Could not find this role');
                let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0].id;
                if(!before.includes(targetRole)) return msg.channel.createMessage('This role is not on the roleme list');
                let roleToDel = before.indexOf(targetRole);
                if (roleToDel > -1) {
                    before.splice(roleToDel, 1);
                }
                let replaced = { guild: msg.channel.guild.id, roles: before }
                conn.table('roleme').get(msg.channel.guild.id).replace(replaced).run()
                .then(res => { msg.channel.createMessage(`Successfully removed a role from roleme`) })
                .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
            }
        }
    }
  }