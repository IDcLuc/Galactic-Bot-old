const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")

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
        
        let reasonn = args.slice(1).join(" ")
        let member = message.mentions.members.first()
        
        if(message.author.id === "266593502543085569", "952178870646366248")
            try {
                await member.ban(reason)
                    if(args[1])
                        message.reply("<@" + member + "> has been banned for ``" + reasonn +"``.")
                    if(!args[1])
                        return message.reply("<@" + member + "> has been banned.")
            } catch (err) {
                console.log (err)
                message.reply("An error occured while performing this action.")
            }
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
            return message.reply("You can't kick a member with kick permissions!")

            let reason = args.slice(1).join(" ")
            let memberr = message.mentions.members.first()

        try {
            memberr
            await member.ban(reason)
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