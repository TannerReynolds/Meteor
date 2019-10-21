const urban = require("urban");
module.exports = {
  command:"urban",
  description: "Get an urban dictionary definition for something",
  syntax: ")>urban [text]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
      word = urban(args.join(" "));
      if(!args) word = urban.random();
      word.first(function(res) {
          if(!res) return msg.channel.createMessage("Nothing on urban for that one, buddy.");
          if (res.definition.length > 1024) return msg.channel.createMessage(`\`\`\`ini\n${res.definition}\n\`\`\``);
          return msg.channel.createMessage({embed: {
              color: 0x36393E,
              author:{
                  name: res.word,
                  icon_url: msg.author.avatarURL
                },
                fields:[
                    {name: "Definition", value: res.definition},
                    {name: "Example", value: res.example},
                    {name: "Upvotes ✔️", value: res.thumbs_up, inline: true},
                    {name: "Downvotes ❌", value: res.thumbs_down, inline: true}
                ]
            }
        });
        });
  }
}