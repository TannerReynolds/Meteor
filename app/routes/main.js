async function commands(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.render('main', { cmds: this.commands, guilds: this.bot.guilds.size, users: this.bot.users.size });
}
module.exports = commands;