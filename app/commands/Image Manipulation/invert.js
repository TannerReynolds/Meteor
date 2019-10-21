const gm = require('gm');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"invert",
    description: "Invert an image's colors",
    syntax: ")>invert `|` )>invert [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
              gm(incomingBuffer).negative().toBuffer('PNG', (err, buffer) => {
                  return msg.channel.createMessage('', {file: buffer, name: 'render.png'});
              });
            })
        }
    }
}