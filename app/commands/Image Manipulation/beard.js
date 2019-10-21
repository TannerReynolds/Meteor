const faceapp = require('faceapp'),
      superagent = require('superagent');
      const argHandler = require('../../util/imgHandler.js')
module.exports = {
  command:"beard",
  description: "Give somebody a beard",
  syntax: ")>beard `|` )>beard [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
    meteor.util.handleImgArgs(bot, msg, args, renderImage);
    async function renderImage(img) {
      let res = await superagent.get(img)
      await faceapp.process(res.body, 'pan').then(panPic => {
        return msg.channel.createMessage('', {file: panPic, name: 'pan.png'});
      }).catch(e => msg.channel.createMessage('Couldn\'t detect any faces'));
    }
  }
}