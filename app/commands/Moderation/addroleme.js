module.exports = {
    command:"addroleme",
    description: "add a role to the roleme list",
    syntax: ")>addroleme [role name] `|`",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if(!msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0]) return msg.channel.createMessage('Could not find this role');
        let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0].id;
        let before = false
        await conn.table('roleme').get(msg.channel.guild.id).run().then(entry => {
            let firstRole = { guild: msg.channel.guild.id, roles: [targetRole] }
            if (!entry) {
                conn.table('roleme').insert(firstRole).run()
                .then(res => { msg.channel.createMessage(`Successfully added a role`) })
                .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
            } else if (entry) {
                before = entry.roles;
            }
        });
        if(before !== false) {
            if(before.includes(targetRole)) return msg.channel.createMessage('This role already a part of roleme')
            before.push(targetRole)
            let updated = before
            let replaced = { guild: msg.channel.guild.id, roles: updated }
            conn.table('roleme').get(msg.channel.guild.id).replace(replaced).run()
            .then(res => { msg.channel.createMessage(`Successfully added a role`) })
            .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
        }
    }
  }