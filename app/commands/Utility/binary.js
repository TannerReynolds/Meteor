module.exports = {
    command:"binary",
    description: "Convert strings to binary",
    syntax: ")>binary [text]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, conn) => {
        msg.channel.createMessage(`\`\`\`\n${binary(args.join(" "))}\n\`\`\``)
    }
  }
function binary(string) {
    return string.split('').map(char => {
        return char.charCodeAt(0).toString(2);
    }).join(" ");
}