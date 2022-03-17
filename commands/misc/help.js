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
                    { name: "Misc", value: "help, ping, prefix" }
                )
        message.reply({ embeds: [embed] })
    }
}