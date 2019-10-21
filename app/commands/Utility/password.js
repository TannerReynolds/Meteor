module.exports = {
    command:"password",
    description: "Generate a random string/password in your DMs",
    syntax: ")>password [number (number is amount of characters you want. Must be between 3 and 64 characters long)]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined ||parseInt(args[0]) > 10000 || parseInt(args[0]) < 3 || isNaN(args[0])) {
            return msg.channel.createMessage("Please input a number between 3 and 10000 for password character length");
        } else {
            bot.users.get(msg.author.id).getDMChannel().then(pm=> pm.createMessage(`**[Randomly Generated Token]**\n\`${makeID(args[0])}\``)).then(m => {
                msg.channel.createMessage("Successfully generated password!");
            }).catch(err => {
                msg.channel.createMessage(`**[Error]**\n\`\`\`${err}\n\`\`\``);
            })
        }
    }
}
function makeID(number) {
    number = parseInt(number)
    let text = "";
    let possible = "!@#$%^&*()/;:[]}{-_~?.,<>|=+!@#$%^&*()/;:[]}{-_~?.,<>|=+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < number; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}