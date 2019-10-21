module.exports = {
    command:"adblock",
    description: "Set the guild's ad block functionality on or off",
    syntax: ")>adblock [On | Off]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "manageMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "off") {
            conn.table('adblock')
                .get(msg.channel.guild.id)
                .delete()
                .run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off ad block`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else if(args[0].toLowerCase() === "on"){
            conn.table('adblock').get(msg.channel.guild.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('adblock')
                        .insert({
                            guild: msg.channel.guild.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully turned ad blocking on`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('adblock')
                        .get(msg.channel.guild.id)
                        .replace({
                            guild: msg.channel.guild.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully turned ad blocking on`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }