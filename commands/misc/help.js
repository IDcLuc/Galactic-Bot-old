const { MessageEmbed, Guild } = require("discord.js")

module.exports = {
    name: "help",
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {

            const cmdname = args[0]
            let defaultembed = new MessageEmbed()
            defaultembed
                .setColor('#863b87')
                .setTitle('Help')
                .setDescription(`The prefix for **${message.guild.name}** is **"g!"**. Use g!help [command] to get info about a specific command.`)
                .addFields(
                    { name: "Misc", value: "help, ping, prefix" },
                    { name: "Moderation", value: "kick, ban, mute"},
                    { name: "Fun", value: "confirmbald, fax, golden"},
                    { name: "Search", value: "namemc, skycrypt"},
                    { name: "Stats", value: "bw, sw, skills, weight"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})
                
            let kickembed = new MessageEmbed()
            kickembed 
                .setTitle("Kick")
                .setDescription("Kick a member from the discord server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!kick [member] [reason]"},
                    { name: "Example", value: "g!kick <@453943223229087748> Bullying"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})

            let banembed = new MessageEmbed()
            banembed
                .setTitle("Ban")
                .setDescription("Ban a member from the discord server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!ban [member] [reason]"},
                    { name: "Example", value: "g!ban <@453943223229087748> Raiding"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})
            
            let muteembed = new MessageEmbed()
            muteembed
                .setTitle("Mute")
                .setDescription("Mute a member from the discord server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!mute [member] [reason]"},
                    { name: "Example", value: "g!mute <@453943223229087748> Excessive usage of bad words"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})
            
            let pingembed = new MessageEmbed()
            pingembed
                .setTitle("ping")
                .setDescription("Shows the response time (latency) of the bot API.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!ping"},
                    { name: "Alias", value: "g!pong"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})

            let prefixembed = new MessageEmbed()
                .setTitle("ping")
                .setDescription("Shows the prefix of the bot for this server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!prefix"},
                    { name: "Alias", value: "g!pref"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})

            let nmcembed = new MessageEmbed()
            nmcembed
                .setTitle("NameMC")
                .setDescription("Searches a username on NameMC.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!namemc [username]"},
                    { name: "Example", value: "g!namemc MajorX500"},
                    { name: "Alias", value: "g!nmc"},
                    { name: "Example", value: "g!namemc MajorX500 \n g!nmc IDcLuc"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})
                
            let statsembed = new MessageEmbed()
            statsembed
                .setTitle("SkyCrypt")
                .setDescription("Sends a link to the SkyCrypt page for the username requested.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!skycrypt [username]"},
                    { name: "Example", value: "g!skycrypt MajorX500"},
                    { name: "Alias", value: "g!sb \n g!stats"},
                    { name: "Example", value: "g!skycrypt MajorX500 \n g!sb IDcLuc \n g!stats Observin"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})    
            
            let baldembed = new MessageEmbed()
            baldembed
                .setTitle("Confirmbald")
                .setDescription("Confirms someone's baldness.")
                .addFields(
                    { name: "Usage", value: "g!baldconfirm [name]"},
                    { name: "Alias", value: "g!bald \n g!confirmbald"},
                    { name: "usage", value: "g!baldconfirm Major \n g!bald Majorx500 \n g!confirmbald <@794258833924292608>"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})

            let bw = new MessageEmbed()
            bw
                .setTitle("B")
                .setDescription("Confirms someone's baldness.")
                .addFields(
                    { name: "Usage", value: "g!baldconfirm [name]"},
                    { name: "Alias", value: "g!bald \n g!confirmbald"},
                    { name: "usage", value: "g!baldconfirm Major \n g!bald Majorx500 \n g!confirmbald <@794258833924292608>"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL})
        

        switch(cmdname){
        case ("kick"):
            message.reply({ embeds: [kickembed] })
        break;
        case ("ban"):
            message.reply({ embeds: [banembed] })
        break;
        case ("mute"):
            message.reply({ embeds: [muteembed] })
        break;
        case ("ping"):
            message.reply({ embeds: [pingembed] })
        break;
        case ("prefix"):
            message.reply({ embeds: [prefixembed] })
        break;
        case ("namemc"):
            message.reply({ embeds: [nmcembed]})
        break;
        case ("skycrypt"):
            message.reply({ embeds: [statsembed] })
        break;
        case ("bald"):
            message.reply({ embeds: [baldembed]} )
        break;
        default:
            message.reply({ embeds: [defaultembed]})
        }
    }
}