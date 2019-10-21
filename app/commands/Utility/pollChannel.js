module.exports = {
    command:"pollchannel",
    description: "Set a channel to be the specified poll channel. All messages sent in this channel will have reactions added to them for making polls",
    syntax: ")>pollchannel [On | Off]",
    category: "Utility",
    permission: "manageChannels",
    botPermission: "addReactions",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "off") {
            conn.table("poll")
                .get(msg.channel.id)
                .delete()
                .run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully turned off this poll channel`).then(m => {
                        setTimeout(() => {
                            m.delete();
                        }, 1500)
                    })
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else if(args[0].toLowerCase() === "on"){
            conn.table("poll").get(msg.channel.id).run().then(function(entry) {
                if (!entry) {
                    conn.table("poll")
                        .insert({
                            channel: msg.channel.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully made this a poll channel`).then(m => {
                                setTimeout(() => {
                                    m.delete();
                                }, 1500)
                            })
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table("poll")
                        .get(msg.channel.id)
                        .replace({
                            channel: msg.channel.id,
                            setting: "on"
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully made this a poll channel`).then(m => {
                                setTimeout(() => {
                                    m.delete();
                                }, 1500)
                            })
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }