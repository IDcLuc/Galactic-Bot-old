module.exports = {
    name: "kick", 
    category: "moderation",
    permissions: ["KICK_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        if (args[0])
            message.reply("Argument thing detected")
        else
            message.reply("Please specify who you want to kick: g!kick @user123")
    }
}