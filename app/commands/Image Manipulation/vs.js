const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"vs",
    description: "Versus!",
    syntax: ")>vs `|` )>hitler [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        meteor.util.handleImgArgs(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            let vs1 = await fsn.readFile('./img/vs1.png');
            let vs2 = await fsn.readFile('./img/vs2.png');
            imageDownload(msg.author.avatarURL.replace('?size=128', '?size=2048')).then(authorAvi => {
            imageDownload(toBuffer).then(incomingBuffer => {
              let image = new Canvas(958, 720)
              .addImage(vs1, 0, 0, 958, 720)
              .addImage(authorAvi, 0, 158, 479, 405)
              .addImage(incomingBuffer, 479, 158, 479, 405)
              .addImage(vs2, 0, 0, 958, 720)
              .toBuffer();
              return msg.channel.createMessage('', {file: image, name: 'render.jpg'});
            })
        })
        }
    }
}