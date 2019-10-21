module.exports = {
    command: "math",
    description: "Do some math. Here are current operators: `+ (add)` `- (subtract)` `/ (divide)` `* (multiply)` `% (remainder)`",
    syntax: ")>math [operator] [number] [number] ...",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {
        if(!args[0] && !args[1] && args[2]) return msg.channel.createMessage("You must type something at least two numbers in to do math with");
        if(!args[0].match(/(\*|\/|\+|\-|\%)/)) return msg.channel.createMessage("You must use a correct operator");
        let operator = args[0].match(/(\*|\/|\+|\-|\%)/)[0];
        let numArgs = args.slice(1);
        let nums = [];
        for(i = 0; i < numArgs.length; i++) {
            let num = parseFloat(numArgs[i]);
            if(typeof num !== "number") return;
            nums.push(num);
        }
        let answer = eval(nums.join(` ${operator} `));
        msg.channel.createMessage(`<@${msg.author.id}> The answer is \`${answer}\``);
    }
}