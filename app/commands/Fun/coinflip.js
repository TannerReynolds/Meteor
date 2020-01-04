module.exports = {
    command: "coinflip",
    description: "flip a coin!",
    syntax: ")>coinflip",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        function flip() {
            var rand = ['Heads', 'Tails']
    
            return rand[Math.floor(Math.random() * rand.length)]
        }
        msg.channel.createMessage(`You landed on: ${flip()}`)
    }}
