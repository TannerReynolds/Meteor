module.exports = {
  command:"eval",
  description: "evaluate and execute javascript",
  syntax: ")>eval [code]",
  category: "Developer",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
    String.prototype.charLimitSplit = number => {
      if (typeof number !== "number") {
          number = parseInt(number);
      }
      let newSplit = [];
      if (this.length > number) {
          let splitRegex = new RegExp(`.{1,${number}}`, "g")
          let splitStr = this.match(splitRegex);
          for (let i = 0; i < splitStr.length; i++) {
              newSplit.push(splitStr[i])
          }
          return newSplit;
      }
  }
  try {
      let code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {
          breakLength: Infinity
      });
      if (evaled.length > 2000) {
          let output = clean(evaled).charLimitSplit(1005);

          return msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  fields: [{
                      name: "Input",
                      value: "```JS\n" + code + "```"
                  }, {
                      name: "Output",
                      value: "```JS\n" + output[0] + " | ... |```"
                  }]
              }
          });
      } else {

          return msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  fields: [{
                      name: "Input",
                      value: "```JS\n" + code + "```"
                  }, {
                      name: "Output",
                      value: "```JS\n" + clean(evaled) + "```"
                  }]
              }
          });
      }
  } catch (err) {
      if (err.length > 2000) {
          let error = err.charLimitSplit(1005);

          return msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  fields: [{
                      name: "Input",
                      value: "```JS\n" + code + "```"
                  }, {
                      name: "Error Output",
                      value: "```JS\n" + error[0] + " | ... |```"
                  }]
              }
          });
      } else {

          return msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  fields: [{
                      name: "Input",
                      value: "```JS\n" + code + "```"
                  }, {
                      name: "Error Output",
                      value: "```JS\n" + clean(err) + "```"
                  }]
              }
          });
      }
  }
}
}

function clean(text) {
if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
else
  return text;
}