const faceapp = require('faceapp'),
      superagent = require('superagent');
      const argHandler = require('../../util/imgHandler.js')
module.exports = {
  command:"hitman",
  description: "Make somebody look like a hitman",
  syntax: ")>hitman `|` )>hitman [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
    meteor.utils.imgHandler.parse(bot, msg, args, renderImage);
    async function renderImage(img) {
      let res = await superagent.get(img)
      await faceapp.process(res.body, 'hitman').then(hitmanPic => {
        return msg.channel.createMessage('', {file: hitmanPic, name: 'hitman.png'});
      }).catch(e => msg.channel.createMessage('Couldn\'t detect any faces'));
    }
  }
}