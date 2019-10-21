const gm = require('gm');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"implode",
    description: "implode an image",
    syntax: ")>implode `|` )>implode [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
              gm(incomingBuffer).implode().toBuffer('JPG', (err, buffer) => {
                  return msg.channel.createMessage('', {file: buffer, name: 'render.jpg'});
              });
            })
        }
    }
}