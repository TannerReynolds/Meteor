module.exports = {
    command: "announce",
    description: "Announce something to all servers the bot is in, mentioning everybody if possible",
    syntax: ")>announce [text]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(msg.author.id !== "205912295837138944") return
        msg.channel.createMessage(`Sending the announcement to ${bot.guilds.size} guilds ... This process will take a while ...`);
        let blacklisted = ['110373943822540800', '330777295952543744', '112319935652298752', '293379346188599296', '338678403521576960', '264445053596991498'];
        let interval = 750;
        let promise = Promise.resolve();
        bot.guilds.forEach(g => {
            promise = promise.then(() => {
                if(!g || !g.name) return console.log('guild doesnt exist');
                if(blacklisted.includes(g.id)) return console.log(`Skipped Guild | ${g.name} | ${g.id}`);
                const gC = g.channels.filter(c => c.permissionsOf(bot.user.id).has('sendMessages') && c.type === 0)[0]
                if(!gC) {
                    console.log('skipped guild due to no permission to send messages')
                } else {
                    let everyone = gC.permissionsOf(bot.user.id).has('mentionEveryone')
                    if(!everyone) {
                        gC.createMessage(args.join(" ")).catch(err => console.log('Had trouble sending an announcement'));
                        console.log(`announcement sent to [${g.name}]`)
                    } else {
                        gC.createMessage(`@everyone ${args.join(" ")}`).catch(err => console.log('Had trouble sending an announcement'));
                        console.log(`EVERYONE | announcement sent to [${g.name}]`)
                    }
                    return new Promise(resolve => {
                        setTimeout(resolve, interval);
                    });
                }
            });
        });
        promise.then(() => {
            console.log('Finished Announcing!');
        });
    }
}