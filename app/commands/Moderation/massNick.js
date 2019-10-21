module.exports = {
    command: "massnickname",
    description: "Give everybody on your guild the same nickname",
    syntax: ")>massnick [text]",
    category: "Moderation",
    permission: "administrator",
    botPermission: "manageNicknames",
    execute: async (meteor, bot, msg, args) => {
        let interval = 1000;
        let promise = Promise.resolve();
        let newName = args.join(" ");
        if(newName.length > 32) return msg.channel.createMessage("Make sure the nickname is 32 or fewer in length")
        msg.channel.createMessage("Now mass nicknaming")
        msg.channel.guild.members.forEach(m => {
            promise = promise.then(() => {
                m.edit({nick: newName})
                return new Promise(resolve => {
                    setTimeout(resolve, interval);
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`Finished Nicknaming! <@${msg.author.id}>`)
        });
    }
}