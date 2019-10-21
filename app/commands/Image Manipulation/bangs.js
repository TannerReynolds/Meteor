const faceapp = require('faceapp'),
superagent = require('superagent');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
command: "bangs",
description: "Give somebody bangs",
syntax: ")>bangs `|` )>bangs [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
category: "Image Manipulation",
permission: "sendMessages",
botPermission: "attachFiles",
execute: async (meteor, bot, msg, args) => {
    meteor.util.handleImgArgs(bot, msg, args, renderImage);
    async function renderImage(img) {
        let res = await superagent.get(img)
        await faceapp.process(res.body, 'bangs').then(facePic => {
            msg.channel.createMessage('', {
                file: facePic,
                name: 'face.png'
            });
        }).catch(e => msg.channel.createMessage('Couldn\'t detect any faces'));
    }
  }
}