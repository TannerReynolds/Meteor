const faceapp = require('faceapp'),
      superagent = require('superagent');
      const argHandler = require('../../util/imgHandler.js')
module.exports = {
  command:"smile",
  description: "Make somebody smile",
  syntax: ")>smile `|` )>smile [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
    meteor.utils.imgHandler.parse(bot, msg, args, renderImage);
    async function renderImage(img) {
      let res = await superagent.get(img)
      await faceapp.process(res.body, 'smile').then(smilePic => {
        return msg.channel.createMessage('', {file: smilePic, name: 'smile.png'});
      }).catch(e => msg.channel.createMessage('Couldn\'t detect any faces'));
    }
  }
}