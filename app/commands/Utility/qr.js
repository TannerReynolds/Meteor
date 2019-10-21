let qr = require("qr-image");
module.exports = {
    command: "qr",
    description: "Generate qr code based on text",
    syntax: ")>qr [text]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("You must type something in to turn into a QR Code")
        let qrText = args.join(" ")
        let qrBuffer = await qr.imageSync(qrText, { type: "png" });
        msg.channel.createMessage("", {file: qrBuffer, name: "render.jpg"})
    }
}