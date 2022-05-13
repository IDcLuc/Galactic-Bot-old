const { MessageEmbed } =  require('discord.js')
const temp = require('hypixel-api-reborn');
const hypixelAPI = new temp.Client("8477c865-dfca-4354-b32c-3a78e8c24f3e");

module.exports = {
    name: "bw",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        // get playername from args
        let player = args[0];
        // if player not defined
        if (!player) return message.channel.send(`Please provide a player name.`);

        // look if minecraft username is valid
        let playerObj = await hypixelAPI.getPlayer(player).catch(err => {
            return message.channel.send(`"${player}" is not a valid Minecraft username.`);
        })
        let bedWarsStats = playerObj.stats.bedwars 

        let embed = new MessageEmbed()
            .setTitle("Bedwars Stats")
            .setThumbnail(`https://crafatar.com/renders/body/${playerObj.uuid}?overlay&size=128`)
            .addFields(
                { name: "Level", value: bedWarsStats.level.toString(), inline: true },
                { name: "Kills", value: bedWarsStats.kills.toString(), inline: true },
                { name: "Wins", value: bedWarsStats.wins.toString(), inline: true},
                { name: "Losses", value: bedWarsStats.losses.toString(), inline: true },
                { name: "Deaths", value: bedWarsStats.deaths.toString(), inline: true },
                { name: "Coins", value: bedWarsStats.coins.toString(), inline: true },
                { name: "K/D Ratio", value: bedWarsStats.KDRatio.toString(), inline: true},
                { name: "FK/D Ratio", value: bedWarsStats.finalKDRatio.toString(), inline: true}
            )
            .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})


        return message.reply({embeds: [embed]});
    }
}