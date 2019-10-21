module.exports = {
  command:"reply",
  description: "Reply to a user in their DMs",
  syntax: ")>reply [text]",
  category: "Developer",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute: async (meteor, bot, msg, args) => {
        if(!devs.includes(msg.author.id)) return msg.channel.createMessage("You cant use this");
        if (args[0] === undefined || args[0] === null || !args[0] || !bot.users.get(args[0])) return bot.createMessage(msg.channel.id, `This user is no longer within reach`);
        if (isNaN(args[0]) === true) return bot.createMessage(msg.channel.id, `${args[0]} is not an id`);
        else {
            let guy = bot.users.get(args[0]);
            let rep = args.slice(1).join(" ");
            if (!rep) return bot.createMessage(msg.channel.id, 'You didn\'t type a reply');
            guy.getDMChannel().then(pm => pm.createMessage(`\`MESSAGE FROM DEVELOPER\`\n\`\`\`${rep}\n\`\`\`\nIf you need further assistance or want to contact the developer, you can either add "${msg.author.username}#${msg.author.discriminator}" or join the Discord https://discord.gg/J2E8GRM`))
            bot.createMessage(msg.channel.id, `Sent a dev reply to ${guy.username}#${guy.discriminator}`);
        }
  }
}