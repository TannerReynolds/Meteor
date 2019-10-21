const gm = require('gm');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"quality",
    description: "Create a quality image. Only the best image. The greatest image.",
    syntax: ")>quality `|` )>quality [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
              gm(incomingBuffer).quality(8).toBuffer('JPG', (err, buffer) => {
                  return msg.channel.createMessage('', {file: buffer, name: 'render.jpg'});
              });
            })
        }
    }
}