const ostb = require("os-toolbox");
const { exec } = require("child_process");
module.exports = {
  command:"stats",
  description: "See bot stats",
  syntax: ")>stats",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (meteor, bot, msg, args) => {
    await msg.channel.createMessage("<a:loading:393670580232257538> Performing speedtests...")
    .then((message)=> {
      let servers = bot.guilds.size,
          mintime = ostb.uptime() / 60,
          uptime = Math.floor(mintime / 60),
          serversLarge = bot.guilds.filter(m => m.large).size,
          botPing = Math.floor(msg.channel.guild.shard.latency),
          regionInfo;
      
      regionsUsed().then(r => {
        regionInfo = r;
      })

      exec("speedtest-cli --simple", (error, stdout, stderr) => {
      ostb.cpuLoad().then((cpuusage)=> { ostb.memoryUsage().then((memusage)=> { ostb.currentProcesses().then((processes)=> {
        const curpro = processes;
        const meuse = memusage;
        const acusage = cpuusage;
        message.delete()
        msg.channel.createMessage({ embed: {
          color: 0x36393E,
          author: { name: `${msg.author.username}#${msg.author.discriminator}`, icon_url: msg.author.avatarURL },
          title: "Statistics",
          footer: { text: msg.channel.guild.name, icon_url: msg.channel.guild.iconURL },
          fields: [
            { name: "Server Memory Usage", value: `${meuse}%` },
            { name: "Nodejs Memory Usage", value: `${processMemoryMB().toString()} MB` },
            { name: "Nodejs Version", value: process.version },
            { name: "Shard Count", value: bot.shards.size },
            { name: "Guild Count", value: bot.guilds.size },
            { name: "Member Count", value: bot.users.size },
            { name: "Guild Region Information", value: regionInfo},
            { name: "Client Uptime", value: `${Math.floor(((bot.uptime / (1000*60*60)) % 24))} hours` },
            { name: "Server Uptime", value: `${JSON.stringify(uptime)} hours` },
            { name: "Speed Test Results", value: `\`\`\`\n${stdout}\n\`\`\`` }
          ]
        }});
      });});});});
    });
    async function regionsUsed() {
      let usa = [];
      let europe = [];
      let russia = [];
      let china = [];
      let brazil = [];
      let japan = [];
      let au = [];
      let sig = [];
      let gC = bot.guilds.size;
      await bot.guilds.map(g => {
        if(g.region === "us-central" || g.region === "us-west" || g.region === "us-south" || g.region === "us-east") {
          usa.push(g.id);
        } else if(g.region === "eu-central" || g.region === "eu-west") {
          europe.push(g.id);
        } else if(g.region === "russia") {
          russia.push(g.id);
        } else if(g.region === "hongkong") {
          china.push(g.id);
        } else if(g.region === "brazil") {
          brazil.push(g.id);
        } else if(g.region === "japan") {
          japan.push(g.id);
        } else if(g.region === "sydney") {
          au.push(g.id);
        } else if(g.region === "signapore") {
          sig.push(g.id)
        }
      })
      usa.length >= 1 ? usa = usa.length : usa = 0;
      europe.length >= 1 ? europe = europe.length : europe = 0;
      russia.length >= 1 ? russia = russia.length : russia = 0;
      china.length >= 1 ? china = china.length : china = 0;
      brazil.length >= 1 ? brazil = brazil.length : brazil = 0;
      japan.length >= 1 ? japan = japan.length : japan = 0;
      au.length >= 1 ? au = au.length : au = 0;
      sig.length >= 1 ? sig = sig.length : sig = 0;
      function prec(number, precision) {
        let factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
      }
      let percentages = `\`${prec((usa / gC) * 100, 2)}%\` of servers are **American**\n\`${prec(((europe + russia) / gC) * 100, 2)}%\` of servers are **European** (\`${prec((russia / gC) * 100, 2)}%\` => **Russia**)\n\`${prec(((china + japan + sig) / gC) * 100, 2)}%\` of servers are **Asian** (\`${prec((china / gC) * 100, 2)}%\` => **China**, \`${prec((japan / gC) * 100, 2)}%\` => **Japan**, \`${prec((sig / gC) * 100, 2)}%\` => **Signapore**)\n\`${prec((brazil / gC) * 100, 2)}%\` of servers are **South American**\n\`${prec((au / gC) * 100, 2)}%\` of servers are **Australian**`
      let regInfo = `**:flag_us: America**: \`${usa}\`\n**:flag_eu: Europe**: \`${europe + russia}\` (**Russia**: \`${russia}\`)\n**:flag_cn: Asia**: \`${china + japan + sig}\` (**China**: \`${china}\`, **Japan**: \`${japan}\`, **Signapore**: \`${sig}\`)\n**:flag_br: South America**: \`${brazil}\`\n**:flag_au: Australia**: \`${au}\`\n**----- Percentages -----**\n${percentages}`
      return regInfo;
    }
  }
}
function processMemoryMB() {
  let heap = process.memoryUsage().heapUsed
  let MB = heap / 1048576;
  return Math.floor(MB)
}