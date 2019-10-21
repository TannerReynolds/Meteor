const { Canvas } = require('canvas-constructor');
const sizeOf = require('image-size');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"pixellate",
    description: "Pixellate images",
    syntax: ")>pixellate | )>pixellate [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
              let dims = sizeOf(incomingBuffer);
              let pixellated = new Canvas(dims.width / 50, dims.height / 50)
              .addImage(incomingBuffer, 0, 0, dims.width / 50, dims.height / 50)
              .toBuffer();
              let image = new Canvas(dims.width, dims.height)
              .addImage(pixellated, 0, 0, dims.width, dims.height)
              .toBuffer();
              return msg.channel.createMessage('', {file: image, name: 'render.jpg'});
            })
        }
    }
}