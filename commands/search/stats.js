const { MessageMentions } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stats",
    category: "search",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        if (!args[0]){
            let embed = new MessageEmbed()
            embed
                .setTitle("SkyCrypt")
                .setDescription("Sends a link to the SkyCrypt page for the username requested.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!skycrypt [username]"},
                    { name: "Example", value: "g!skycrypt MajorX500"},
                    { name: "Alias", value: "g!sb, g!stats"},
                    { name: "Example", value: "g!skycrypt MajorX500, g!sb IDcLuc, g!stats"}
                )
                .setFooter({ text: `Galactic Bot by IDcLuc ● Requested by ${message.author}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
            return message.reply({ embeds: [embed] })            
        }
        
        if (args[1])
        return message.reply("You can only include one argument (username) in this command!")

        message.reply(`Here you go! https://sky.shiiyu.moe/stats/${args[0]}`)

    }

}