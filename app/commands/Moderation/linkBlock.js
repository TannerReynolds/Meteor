module.exports = {
    command:"linkblock",
    description: "Set the guild's link block functionality on or off. Run this in a channel you want to block links/urls in. This will delete all links sent by non-staff",
    syntax: ")>linkblock [On | Off]",
    category: "Moderation",
    permission: "manageMessages",
    botPermission: "manageMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "off") {
            conn.table('linkblock')
                .get(msg.channel.id)
                .delete()
                .run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off link blocking`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else if(args[0].toLowerCase() === "on"){
            conn.table('linkblock').get(msg.channel.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('linkblock')
                        .insert({
                            channel: msg.channel.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully turned on link blocking`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('linkblock')
                        .get(msg.channel.id)
                        .replace({
                            channel: msg.channel.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully turned on link blocking`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }