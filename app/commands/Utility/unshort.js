const snekfetch = require("snekfetch");
module.exports = {
    command:"unshort",
    description: "unshorten a url",
    syntax: ")>unshort [url]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] || !args[0].match(/\bhttps?:\/\/\S+/i)) return msg.channel.createMessage("You did not supply a valid url")
        let urls = [];
        let unshort = url => {
            snekfetch.get(url)
            .then(r => {
                let metaRefresh = /<meta http-equiv="refresh" *?\S+ *(\/)?>/i;
                if(r.text.match(metaRefresh)) {
                    let refreshTag = r.text.match(metaRefresh)[0];
                    let metaURL = /url= *?('|") *?(.*?)('|") *?/i;
                    if(refreshTag.match(metaURL)) {
                        let rawURL = refreshTag.match(metaURL)[0];
                        let extractedURL = /\bhttp(s)?:\/\/\S+.*(?=('|"))/i;
                        if(rawURL.match(extractedURL)) {
                            let originalURL = rawURL.match(extractedURL)[0];
                            urls.push(originalURL);
                            unshort(originalURL)
                        }
                    }
                } else {
                    let host = r.request.connection._host;
                    let path = r.request.path
                    let domainReg = /http(s)?:\/\/(.*?)\//i;
                    let domain = domainReg.exec(url);
                    domain = domain[domain.length - 1]
                    if(domain.toLowerCase() !== host.toLowerCase()) {
                        urls.push(`http://${host}${path}`);
                        unshort(`http://${host}${path}`)
                    } else {
                        let theURLs;
                        if(urls.length < 1) {
                            theURLs = "Did not Detect as a shortened URL"
                        } else {
                            theURLs = `\`${urls.join("` => `")}\``
                            if(theURLs.length > 1023) {
                                theURLs = urls[urls.length - 1]
                            } 
                        }
                        return msg.channel.createMessage({embed: {
                            color:0x36393E,
                            fields: [ { name: "Short URL", value: args[0] }, { name: "Unshortened URL(s)", value: theURLs } ]
                          }});
                    }
                }
            })
            .catch(e => {
                return
            });
        }
        unshort(args[0])
    }
  }