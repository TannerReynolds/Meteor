const tzcfg = require("../../config.json"),
      steam = require("steamidconvert")(tzcfg.steamToken);
module.exports = {
    command: "steamid",
    description: "Get a steamid from somebody's profile",
    syntax: ")>steamid [Steam Profile URL]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        if(args[0].startsWith("http://steamcommunity.com/id/")) {
            let cleanedURL = args[0].replace("http://steamcommunity.com/id/", "");
            if(cleanedURL.endsWith("/")) {
                cleanedURL = cleanedURL.substring(0, cleanedURL.lastIndexOf("/") - 0);
            }
            steam.convertVanity(cleanedURL, function(err, res) {
                if (err) return msg.channel.createMessage("An error has occured\n" + err);
                let steam32 = steam.convertToText(res);
                let steamNew = steam.convertToNewFormat(steam32);
                return msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: `Steamid for ${cleanedURL}`, icon_url: msg.author.avatarURL}, fields: [{name: "Profile URL", value: args[0]}, {name: "Steam64", value: res}, {name: "Steam32", value: steam32}, {name: "New Format", value: steamNew}]}});
            });
        }
        if(args[0].startsWith("https://steamcommunity.com/profiles/")) {
            let cleanedURL = args[0].replace("https://steamcommunity.com/profiles/", "");
            let steam32 = steam.convertToText(cleanedURL);
            let steamNew = steam.convertToNewFormat(steam32);
            return msg.channel.createMessage({ embed: {color: 0x36393E, author: {name: `SteamID`, icon_url: msg.author.avatarURL}, fields: [{name: "Profile URL", value: args[0]}, {name: "Steam64", value: cleanedURL}, {name: "Steam32", value: steam32}, {name: "New Format", value: steamNew}]}});
        }
        if(!args[0].startsWith("https://steamcommunity.com/profiles/") && !args[0].startsWith("http://steamcommunity.com/id/")) return msg.channel.createMessage("Invalid Steam Profile");
    }
}