const { exec } = require('child_process');
module.exports = {
  command:"exec",
  description: "execute commands from Discord",
  syntax: ")>exec [cmds]",
  category: "Developer",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute: async (meteor, bot, msg, args) => {
    if (!args.join(" ")) return msg.channel.createMessage('No arguments were given');
    msg.channel.createMessage(`\`INPUT\`\n\`\`\`ini\n${args.join(" ")}\n\`\`\``);
    exec(args.join(" "), {shell: "/bin/bash"}, (error, stdout, stderr) => {
      if (error) {
        msg.channel.createMessage(`\`ERROR\`\n\`\`\`ini\n${error}\n\`\`\``);
      } else {
        msg.channel.createMessage(`\`OUTPUT\`\n\`\`\`ini\n${stdout}\n\`\`\``);
      }
    });
  }
}