module.exports = {
    command: "fortune",
    description: "Open a fortune cookie!",
    syntax: ")>fortune",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        function cookie() {
            let rand = ['The fortune you seek is in another cookie.', 'A closed mouth gathers no feet.', 'A conclusion is simply the place where you got tired of thinking.', 'A cynic is only a frustrated optimist.', 'A foolish man listens to his heart. ...', 'You will die alone and poorly dressed.', 'He who laughs last is laughing at you.', 'The greatest danger could be your stupidity.', 'The world may be your oyster, but it doesn\'t mean you\'ll get its pearl.', 'The road to riches is paved with homework.', 'Actions speak louder than fortune cookies.', 'n\'t behave with cold manners.', 'Fortune not found? Abort, Retry, Ignore.', 'Help! I am being held prisoner in a fortune cookie factory.', 'It\'s about time I got out of that cookie.', 'Never forget a friend. Especially if he owes you.', 'Never wear your best pants when you go to fight for freedom.', 'Only listen to the fortune cookie; disregard all other fortune telling units.', 'It is a good day to have a good day.', 'All fortunes are wrong except this one.', 'Someone will invite you to a Karaoke party.', 'That wasn\'t chicken.', 'There is no mistake so great as that of being always right.', 'I am worth a fortune.', 'No snowflake feels responsible in an avalanche.', 'You will receive a fortune cookie.', 'Some fortune cookies contain no fortune.', 'Don\t let statistics do a number on you.', 'You are not illiterate.']
    
            return rand[Math.floor(Math.random() * rand.length)]
        };
        msg.channel.createMessage(`:fortune_cookie: | ${cookie()}`);
    }};
