const { MessageEmbed } = require("discord.js") 

module.exports = {
    name: "baldconfirm",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let baldembed = new MessageEmbed()
        baldembed
            .setTitle("Baldconfirm")
            .setDescription("Confirms someone's baldness.")
            .addFields(
                { name: "Usage", value: "g!baldconfirm [name]"},
                { name: "Alias", value: "g!bald \n g!confirmbald"},
                { name: "Example", value: "g!baldconfirm Major \n g!bald Majorx500"}
            )
            .setFooter({ text: `Galactic Bot by IDcLuc ● Requested by ${message.author}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
    
        if (!args[0])
            return message.reply({ embeds: [baldembed] })
        message.reply(`${args[0]} is confirmed bald by ${message.author}. They are now eligible for the baldness competition!`)
        
    }
}