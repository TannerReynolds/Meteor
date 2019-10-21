module.exports = {
    command:"whitelist",
    description: "whitelist a blacklisted command",
    syntax: ")>whitelist [cmd name]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return;
        let cmdArgs = args.join().toLowerCase(), cmdNames = [];
        for(i = 0; i < commands.length; i++) {
            cmdNames.push(commands[i].command);
        }
        if(!cmdNames.includes(cmdArgs)) return msg.channel.createMessage('Please insert a command to whitelist.')
        if(cmdArgs === "help" || cmdArgs === "blacklist" || cmdArgs === "whitelist") return msg.channel.createMessage('You cannot whitelist this command');
        let blacklisted = false;
        await conn.table('cmdBlacklist').get(msg.channel.guild.id).run().then(entry => {
            if (!entry) {
                msg.channel.createMessage('There is nothing to whitelist')
            } else if (entry) {
                blacklisted = entry.blacklistedCmds
            }
        });
        if(blacklisted !== false) {
            if(!blacklisted.includes(cmdArgs)) return msg.channel.createMessage('This command is not blacklisted');
            let cmd = blacklisted.indexOf(cmdArgs);
            if (cmd > -1) {
                blacklisted.splice(cmd, 1);
            }
            let replaced = { guild: msg.channel.guild.id, blacklistedCmds: blacklisted }
            conn.table('cmdBlacklist').get(msg.channel.guild.id).replace(replaced).run()
            .then(res => { msg.channel.createMessage(`Successfully whitelisted command`) })
            .error(e => { msg.channel.createMessage(`An error occurred\n${e}`) })
        }
    }
  }