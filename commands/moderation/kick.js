const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")

module.exports = {
    name: "kick", 
    category: "moderation",
    permissions: ["KICK_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        if (!args[0])
            return message.reply("Please specify who you would like to kick: g!kick @member123")

        let mention = args[0].match(MessageMentions.USERS_PATTERN)

        if(!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!kick @member123`)

        let member = message.mentions.members.first()
        let reasonn = args.slice(1).join(" ")
        
        if(message.author.id === "266593502543085569", "952178870646366248")
        try {
            await member.kick()
                if(args[1])
                    message.reply("<@" + member + "> has been kicked for ``" + reasonn +"``.")
                if(!args[1])
                    return message.reply("<@" + member + "> has been kicked.")
        } catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        }

        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
            return message.reply("You do not have permissions to kick this member!")

            let reason = args.slice(1).join(" ")
            let memberr = message.mentions.members.first()

        try {
            await member.kick()
            if(args[1])
            message.reply("<@" + memberr + "> has been kicked for ``" + reason +"``.")
            if(!args[1])
            message.reply("<@" + memberr + "> has been kicked.")
        }
        catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        } 
    }
}