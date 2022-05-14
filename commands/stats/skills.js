const { MessageEmbed } = require('discord.js');
const hypixel = require('../../hypixelapi')

module.exports = {
    name: "skills",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {         
        clent.getPlayer('name', playerr).then((player) => {
            let skills = player.player.achievements
            console.log(player)
            let embed = new MessageEmbed()
                .setTitle(`${player.player.displayname}'s Skills`)
                .addFields(
                    { name: "Combat", value: "Level " + skills.skyblock_combat, inline: true },
                    { name: "Farming", value: "Level " + skills.skyblock_harvester, inline: true },
                    { name: "Mining", value: "Level " + skills.skyblock_excavator, inline: true},
                    { name: "Foraging", value: "Level " + skills.skyblock_gatherer, inline: true },
                    { name: "Enchanting", value: "Level " + skills.skyblock_augmentation, inline: true },
                    { name: "Alchemy", value: "Level " + skills.skyblock_concoctor, inline: true },
                    { name: "Catacombs", value: "Level " + skills.skyblock_dungeoneer, inline: true },
                )
                .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

            message.reply({ embeds: [embed] })
        }).catch((err) => {
            console.error("You are a dumbass and made an error: \n" + err)
            message.reply("An error occurred, did you spell the username right? ``" + err + "``")
        })
    }
}

