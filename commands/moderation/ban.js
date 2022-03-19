const { MessageMentions } = require("discord.js")

module.exports = {
    name: "ban", 
    category: "moderation",
    permissions: ["BAN_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        if (!args[0])
            return message.reply("Please specify who you would like to ban: g!ban @member123")

        let mention = args[0].match(MessageMentions.USERS_PATTERN)

        if(!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!ban @member123`)

        let member = message.mentions.members.first()
        
        if(!member.bannable)
            return message.reply("I do not have permissions to ban this member.")

            let reason = args.slice(1).join(" ")
            let memberr = message.mentions.members.first()

        try {
            memberr
            await member.ban()
            if(args[1])
            message.reply("<@" + memberr + "> has been banned for ``" + reason +"``.")
            if(!args[1])
            message.reply("<@" + memberr + "> has been banned.")
        }
        catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        } 
    }
}