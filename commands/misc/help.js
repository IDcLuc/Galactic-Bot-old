const { MessageEmbed, Guild } = require("discord.js")

module.exports = {
    name: "help",
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
            let embed = new MessageEmbed()
            embed
                .setColor('#863b87')
                .setTitle('Help')
                .setDescription(`The prefix for **${message.guild}** is **"g!"**.`)
                .addFields(
                    { name: "Misc", value: "help, ping, prefix" },
                    {name : "Moderation", value: "kick, ban"}
                )
                .setFooter({ text: "yes", iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
        message.reply({ embeds: [embed] })
    }
}