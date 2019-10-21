module.exports = {
    command:"modlog",
    description: "Set the guild's modLog channel",
    syntax: ")>modlog [channel mention] `|` )>modlog off",
    category: "Moderation",
    permission: "manageChannels",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "off") {
            conn.table('modlogs')
                .get(msg.channel.guild.id)
                .delete()
                .run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off modlogs`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else {
            if(!args[0].match(/[0-9]{16,18}/)) return msg.channel.createMessage('Please mention a channel to set the mod logs');
            let channelID = args[0].match(/[0-9]{16,18}/);
            if(msg.channel.guild.channels.filter(c => c.id === channelID && c.type === 0)[0]) return msg.channel.createMessage('This channel does not exist.')
            conn.table('modlogs').get(msg.channel.guild.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('modlogs')
                        .insert({
                            guild: msg.channel.guild.id,
                            channel: channelID
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the channel`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('modlogs')
                        .get(msg.channel.guild.id)
                        .replace({
                            guild: msg.channel.guild.id,
                            channel: channelID
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the channel`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }