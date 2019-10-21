const snekfetch = require("snekfetch");
module.exports = {
    command: "github",
    description: "shows github page for Havana",
    syntax: ")>github",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        msg.channel.createMessage("Here is a link to Havana's Github: https://github.com/TannerReynolds/Havana")
    }
}