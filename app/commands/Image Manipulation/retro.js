const RetroText = require('retrotext');
module.exports = {
  command:"retro",
  description: "Make a retro text photo",
  syntax: ")>retro [First Line] | [Second Line] | [Third Line]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
      if(!args[0]) return msg.channel.createMessage('You gotta type a message first. The syntax is retro ("first line" | "second line" | "third line"')
      let newArgs = args.join(" ").split(/ *\| */);
      if(!newArgs[0]) return msg.channel.createMessage('You have to type something in to retro-fy')
      if(!newArgs[1]) newArgs[1] = " ";
      if(!newArgs[2]) newArgs[2] = " ";
      msg.channel.createMessage('Processing...');
      const retroPic = new RetroText()
        .setLine1(newArgs[0])
        .setLine2(newArgs[1])
        .setLine3(newArgs[2])
        .setBackgroundStyle('palmCircle')
        .setTextStyle('chrome');
      let buffer = await retroPic.fetchBuffer();
      return msg.channel.createMessage('', {file: buffer, name: 'retro.png'});
  }
}