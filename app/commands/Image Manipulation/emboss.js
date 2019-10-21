const gm = require('gm');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"emboss",
    description: "emboss an image",
    syntax: ")>emboss `|` )>emboss [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
              gm(incomingBuffer).emboss().toBuffer('PNG', (err, buffer) => {
                  return msg.channel.createMessage('', {file: buffer, name: 'render.png'});
              });
            })
        }
    }
}