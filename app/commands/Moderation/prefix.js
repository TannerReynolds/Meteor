module.exports = {
    command:"prefix",
    description: "Set the guild's prefix. bot mention will always be accepted",
    syntax: ")>prefix [prefix] `|` )>prefix reset `|` )>prefix",
    category: "Moderation",
    permission: "administrator",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) {
            return conn.table('prefixes').get(msg.channel.guild.id).run().then(function(entry) {
                if(!entry) return msg.channel.createMessage('This guild\'s prefix is `)>`');
                msg.channel.createMessage(`this guild's prefix is \`${entry.prefix}\``)
              })
        }
        if (args[0].toLowerCase() === "reset") {
            conn.table('prefixes')
                .get(msg.channel.guild.id)
                .delete()
                .run()
                .then(function(res) {
                    msg.channel.createMessage(`Successfully reset the prefix`);
                })
                .error(function(e) {
                    msg.channel.createMessage(`An error occurred\n${e}`);
                })
        } else {
            conn.table('prefixes').get(msg.channel.guild.id).run().then(function(entry) {
                if (!entry) {
                    conn.table('prefixes')
                        .insert({
                            guild: msg.channel.guild.id,
                            prefix: args.join(" ")
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the prefix`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                } else if (entry) {
                    conn.table('prefixes')
                        .get(msg.channel.guild.id)
                        .replace({
                            guild: msg.channel.guild.id,
                            prefix: args.join(" ")
                        })
                        .run()
                        .then(function(res) {
                            msg.channel.createMessage(`Successfully set the prefix`);
                        })
                        .error(function(e) {
                            msg.channel.createMessage(`An error occurred\n${e}`);
                        })
                }
            });
        }
    }
  }