module.exports = {
  command:"poll",
  description: "Create a poll for people to vote on",
  syntax: ")>poll [text]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
    if(args[0] == undefined || args[0] == null || !args[0]) return msg.channel.createMessage("You need to type something");
    msg.channel.createMessage({
        embed: {
            author: {
                name: `${msg.author.username}#${msg.author.discriminator}`,
                icon_url: msg.author.avatarURL
            },
            fields: [
                {
                    name: "Poll",
                    value: args.join(" ")
                }
            ],
            color: 0x36393E
        }
    }).then(m => {
        m.addReaction("tzTickYes:409660331720310787").then(() => {
            m.addReaction("tzTickNo:409660331577835521");
        })
    });
    msg.delete();
  }
}
