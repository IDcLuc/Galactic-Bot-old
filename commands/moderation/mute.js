const { MessageEmbed } = require('discord.js')
const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")

module.exports = {
    name: "mute",
    category: "moderation",
    permissions: ['MANAGE_ROLES'],
    devOnly: false,
    run: async ({client, message, args}) => {
        if (!args[0]){
        let embede = new MessageEmbed()
        embede 
            .setTitle("Mute")
            .setDescription("Mute a member from the discord server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!mute [member] [reason]"},
                { name: "Example", value: "g!mute <@453943223229087748> Excessive usage of bad words"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
        return message.reply({ embeds: [embede] })
        }

        let mention = args[0].match(MessageMentions.USER_PATTERN)

        if (!mention)
        return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!kick @member123`)

        let reasonn = args.slice(1).join(" ")
        let member = message.mentions.members.first()
        let role = message.guild.roles.cache.find(r => r.id === "955549898395222108");

        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            return message.reply(`You can't mute \`\`${member.user.username}\`\` as they have kick permissions.`)
        }

            let reason = args.slice(1).join(" ")
        try {
            if(args[1])
            await member.send(`You have been muted from **${message.guild.name}** for *\`\`${reason}\`\`*!`)
            else if(!args[1])
            await member.send(`You have been muted from **${message.guild.name}**!`)
            await member.roles.add(role)
                if(args[1])
                    message.reply(`${member.user.tag} has been muted for *\`\`${reasonn}\`\`*.`)
                if(!args[1])
                    return message.reply("<@" + member + "> has been muted.")
        } catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        }
    }
}