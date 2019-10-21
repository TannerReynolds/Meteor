module.exports = {
    command:"autorole",
    description: "Set a default role for the guild. all members who join will be put into this role",
    syntax: ")>autorole [role name] `|` )>autorole --off",
    category: "Moderation",
    permission: "manageRoles",
    botPermission: "manageRoles",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "--off") {
            conn.table('autorole').get(msg.channel.guild.id).delete().run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off the auto role`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else {
            if(!msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0]) return msg.channel.createMessage('Could not find this role');
            let targetRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0].id;
            conn.table('autorole').get(msg.channel.guild.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('autorole')
                        .insert({
                            guild: msg.channel.guild.id,
                            role: targetRole
                        }).run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the auto role`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('autorole').get(msg.channel.guild.id)
                        .replace({
                            guild: msg.channel.guild.id,
                            role: targetRole
                        }).run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully replaced the auto role`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }