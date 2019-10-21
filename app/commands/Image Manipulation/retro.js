const RetroText = require('retrotext');
module.exports = {
  command:"retro",
  description: "Make a retro text photo",
  syntax: ")>retro [First Line] | [Second Line] | [Third Line] | [Background Style Number] | [Text Style Number]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute: async (meteor, bot, msg, args) => {
      if(!args[0]) return msg.channel.createMessage('You gotta type a message first. The syntax is retro ("first line" | "second line" | "third line" | "background number" | "text style number")')
      let newArgs = args.join(" ").split(/ *\| */);
      if(!newArgs[0]) return msg.channel.createMessage('You have to type something in to retro-fy')
      if(!newArgs[1]) newArgs[1] = " ";
      if(!newArgs[2]) newArgs[2] = " ";
      msg.channel.createMessage('Processing...');
      if(parseInt(newArgs[3], 10) > 5 || isNaN(newArgs[3]) || !newArgs[3]) newArgs[3] = '5';
      if(parseInt(newArgs[4], 10) > 4 || isNaN(newArgs[4]) || !newArgs[4]) newArgs[4] = '4';
      const retroPic = new RetroText()
        .setLine1(newArgs[0])
        .setLine2(newArgs[1])
        .setLine3(newArgs[2])
        .setBackgroundStyle(newArgs[3])
        .setTextStyle(newArgs[4]);
      let buffer = await retroPic.fetchBuffer();
      return msg.channel.createMessage('', {file: buffer, name: 'retro.png'});
  }
}