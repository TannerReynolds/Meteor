const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
const { registerFont, createCanvas } = require('canvas');
registerFont('./fonts/discord.ttf', {family: 'discord'});
module.exports = {
    command:"quote2",
    description: "Generate a ribbon based on the text you input",
    syntax: ")>ribbon [text]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || args[0] === undefined) {
            return msg.channel.createMessage('You need to give me a user to quote')
        } else if(msg.mentions.length >= 1) {
            let id = msg.mentions[0].id;
            let quote = args.slice(1).join(" ")
            return quoteUser(id, quote);
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            let id = msg.content.match(/[0-9]{16,18}/)[0];
            let quote = args.slice(1).join(" ");
            return quoteUser(id, quote) 
        } else {
            return msg.channel.createMessage('Nothing to quote.');
        }
        async function quoteUser(id, quote) {
            let user = bot.users.get(id);
            let member = msg.channel.guild.members.filter(m => m.id === user.id)[0];
            // role color
            let roleNums = [];
            msg.channel.guild.roles.map(r => {
                for(i = 0; i < member.roles.length; i++) {
                    if(member.roles[i] === r.id) {
                        if(r.color !== 0) {
                            roleNums.push(r.position);
                        }
                    }
                }
            })
            let rolePos = Math.max.apply(null, roleNums);
            let roleColor = msg.channel.guild.roles.filter(r => r.position === rolePos)[0].color;
            let defaultNum = "ffffff";
            roleColor ? roleColor = roleColor.toString(16) : roleColor =  defaultNum;
            if(roleColor.length === 5) roleColor = `0${roleColor}`;
            if(roleColor.length === 4) roleColor = `00${roleColor}`;
            if(roleColor.length === 3) roleColor = `000${roleColor}`;
            // Timestamp
            let timeX = 64
            let chars = user.username.split("");
            for(i = 0; chars.length > i; i++) {
                timeX = timeX + 7.7
            }
            // images
            let avi = user.avatarURL;
            let message = await fsn.readFile('./img/msg.png');
            imageDownload(avi).then(incomingBuffer => {
              let image = new Canvas(1018, 89)
              .addImage(incomingBuffer, 3, 24, 40, 40)
              .addImage(message, 0, 0, 1018, 89)
              .setTextFont('14px discord')
              .setColor("#b3bbc2")
              .addText(quote, 64, 59)
              .setTextFont('15px discord')
              .setColor(`#${roleColor}`)
              .addText(member.username, 64, 37)
              .setTextFont('11px discord')
              .setColor("#5b5e62")
              .addText("Today at 12:27 AM", timeX, 37)
              .toBuffer();
              return msg.channel.createMessage('', {file: image, name: 'render.jpg'});
            })
        }
    }
}