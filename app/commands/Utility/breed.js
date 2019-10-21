const wd = require("what-dog");
module.exports = {
  command:"breed",
  description: "find out a dog's breed by inputting a photo of a dog",
  syntax: ")>breed [imageURL]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
    if(!args[0]) return msg.channel.createMessage("Please input a photo url")
    wd(args[0])
    .then(doggyData => {
        return msg.channel.createMessage({embed: {
            color: 0x36393E,
            image: {url: args[0]},
            fields: [
                {name: "Breed", value: doggyData.breed},
                {name: "About", value: doggyData.about}
            ]
        }})
    })
    .catch(e => {
        return msg.channel.createMessage(e);
    });
  }
}
