module.exports = {
    command:"binary",
    description: "Convert strings to binary",
    syntax: ")>binary [text]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (meteor, bot, msg, args) => {
        msg.channel.createMessage(`\`\`\`\n${binary(args.join(" "))}\n\`\`\``)
    }
  }
function binary(string) {
    return string.split('').map(char => {
        char.charCodeAt(0).toString(2);
    }).join(" ");
}