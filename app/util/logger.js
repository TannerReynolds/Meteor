const fg = {
    black: "\x1b[30m%s\x1b[0m",
    red: "\x1b[31m%s\x1b[0m",
    green: "\x1b[32m%s\x1b[0m",
    yellow: "\x1b[33m%s\x1b[0m",
    blue: "\x1b[34m%s\x1b[0m",
    magenta: "\x1b[35m%s\x1b[0m",
    cyan: "\x1b[36m%s\x1b[0m",
    white: "\x1b[37m%s\x1b[0m"
}
const bg = {
    black: "\x1b[40m%s\x1b[0m",
    red: "\x1b[41m%s\x1b[0m",
    green: "\x1b[42m%s\x1b[0m",
    yellow: "\x1b[43m%s\x1b[0m",
    blue: "\x1b[44m%s\x1b[0m",
    magenta: "\x1b[45m%s\x1b[0m",
    cyan: "\x1b[46m%s\x1b[0m",
    white: "\x1b[47m%s\x1b[0m"
}
module.exports = {
    discordError: async error => {
        console.log(bg.blue, "Discord")
        console.log(fg.blue, error)
        console.trace("\x1b[34mDiscord Error\x1b[0m")
    },
    uncaughtError: async error => {
        console.log(bg.red, "Uncaught Error")
        console.log(fg.red, error)
    },
    success: async log => {
        console.log(fg.green, log)
    },
    error: async error => {
        console.log(bg.red, "Error")
        console.log(fg.red, error)
        console.trace("\x1b[31mError\x1b[0m")
    },
    verbose: async log => {
        console.log(bg.magenta, "Verbose")
        console.log(fg.magenta, log)
    }
}