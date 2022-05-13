const { MessageEmbed } =  require('discord.js')
const temp = require('hypixel-api-reborn');
const hypixelAPI = new temp.Client("8477c865-dfca-4354-b32c-3a78e8c24f3e");

module.exports = {
    name: "sw",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let player = args[0];

        if (!player)
            return message.channel.send(`Please provide a player name.`);

        let playerObj = await hypixelAPI.getPlayer(player).catch(err => {
            return message.channel.send(`\`${player}\` is not a valid Minecraft username.`);
        })
        let stats = playerObj.stats.skywars
        let embed = new MessageEmbed()
            .setTitle(`${playerObj}'s Skywars Stats`)
            .setThumbnail(`https://crafatar.com/renders/body/${playerObj.uuid}?overlay&size=128`)
            .addFields(
                { name: "Level", value: stats.level.toString(), inline: true },
                { name: "Kills", value: stats.kills.toString(), inline: true },
                { name: "Wins", value: stats.wins.toString(), inline: true},
                { name: "Losses", value: stats.losses.toString(), inline: true },
                { name: "Deaths", value: stats.deaths.toString(), inline: true },
                { name: "Coins", value: stats.coins.toString(), inline: true },
                { name: "K/D Ratio", value: stats.KDRatio.toString(), inline: true},
            )
            .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.avatarURL() })

        hypixelAPI.getSkyblockProfiles(player).then(profiles => {
            console.log(profiles[0].members[0].uuid);
        }).catch(e => {
                console.log(e);
        })
        return message.reply({embeds: [embed]});
    }
}
