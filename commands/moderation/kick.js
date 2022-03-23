const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")
const { MessageEmbed, Guild } = require("discord.js")

module.exports = {
    name: "kick", 
    category: "moderation",
    permissions: ["KICK_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        if (!args[0]){
            let embede = new MessageEmbed()
            embede 
                .setTitle("Kick")
                .setDescription("Kick a member from the discord server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!kick [member] [reason]"},
                    { name: "Example", value: "g!kick <@453943223229087748> Bullying"}
                )
                .setFooter({ text: "Galactic Bot by IDcLuc", iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
            return message.reply({ embeds: [embede] })
        }
        let mention = args[0].match(MessageMentions.USERS_PATTERN)

        if(!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!kick @member123`)

        let member = message.mentions.members.first()
        let reasonn = args.slice(1).join(" ")
        
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)){
            if(!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
                return message.reply(`You can't kick ${member.name} as they have kick permissions.`)
        }

            let reason = args.slice(1).join(" ")
            let memberr = message.mentions.members.first()
        try {
            await member.kick(reason)
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