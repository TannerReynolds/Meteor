module.exports = {
    command:"autonick",
    description: "Set a default nickname for the guild. all members who join will have this nickname",
    syntax: ")>autonick [nickname] `|` )>autonick --off",
    category: "Moderation",
    permission: "manageNicknames",
    botPermission: "manageNicknames",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "--off") {
            conn.table('autonick').get(msg.channel.guild.id).delete().run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off the auto nick`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else {
            if(args.length > 32) return msg.channel.createMessage('Nicknames can only be 32 characters long.')
            let targetNick = args.join(" ");
            conn.table('autonick').get(msg.channel.guild.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('autonick')
                        .insert({
                            guild: msg.channel.guild.id,
                            nick: targetNick
                        }).run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the auto nick`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('autonick').get(msg.channel.guild.id)
                        .replace({
                            guild: msg.channel.guild.id,
                            nick: targetNick
                        }).run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully replaced the auto nick`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }