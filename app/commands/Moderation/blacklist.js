module.exports = {
    command:"blacklist",
    description: "blacklist a command",
    syntax: ")>blacklist [cmd name]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        if (args[0].toLowerCase() === "--clean") {
            conn.table('cmdBlacklist').get(msg.channel.guild.id).delete().run()
                .then(res => { msg.channel.createMessage(`Successfully cleaned blacklisted cmds`) })
                .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
        } else if (args[0].toLowerCase() === "--list") {
            let black;
            await conn.table('cmdBlacklist').get(msg.channel.guild.id).run().then(entry => {
                if(!entry) return msg.channel.createMessage('No blacklisted commands')
                black = entry.blacklistedCmds;
            })
            .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
            if(black !== undefined) return msg.channel.createMessage(`The current blacklisted commands are: \`${black.join("`, `")}\``)
        } else {
            let cmdArgs = args.join().toLowerCase(), cmdNames = [];
            for(i = 0; i < commands.length; i++) {
                cmdNames.push(commands[i].command);
            }
            if(!cmdNames.includes(cmdArgs)) return msg.channel.createMessage('Please insert a command to blacklist.')
            if(cmdArgs === "help" || cmdArgs === "blacklist" || cmdArgs === "whitelist") return msg.channel.createMessage('You cannot blacklist this command')
            let before = false
            await conn.table('cmdBlacklist').get(msg.channel.guild.id).run().then(entry => {
                let firstCmd = { guild: msg.channel.guild.id, blacklistedCmds: [cmdArgs] }
                if (!entry) {
                    conn.table('cmdBlacklist').insert(firstCmd).run()
                    .then(res => { msg.channel.createMessage(`Successfully blacklisted command`) })
                    .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
                } else if (entry) {
                    before = entry.blacklistedCmds;
                }
            });
            if(before !== false) {
                if(before.includes(cmdArgs)) return msg.channel.createMessage('This command is already blacklisted')
                before.push(cmdArgs)
                let updated = before
                let replaced = { guild: msg.channel.guild.id, blacklistedCmds: updated }
                conn.table('cmdBlacklist').get(msg.channel.guild.id).replace(replaced).run()
                .then(res => { msg.channel.createMessage(`Successfully blacklisted command`) })
                .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
            }
        }
    }
  }