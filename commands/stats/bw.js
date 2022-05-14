const { MessageEmbed } =  require('discord.js')
const hypixel = require('../../hypixelapi');
const fetch = require('node-fetch')
module.exports = {
    name: "bw",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];
        if (!plr) return message.channel.send(`Please provide a player name.`);

        function getId(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
              .then(data => data.json())
              .then(player => player.success);
            }
            const id = await getId(plr)
            if(id == false) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)
  
        let playerObj = await hypixel.getPlayer(plr)
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
                { name: "FK/D Ratio", value: bedWarsStats.finalKDRatio.toString(), inline: true},
                { name: "W/L Ratio", value: bedWarsStats.WLRatio.toString(), inline: true},
            )
            .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})


        return message.reply({embeds: [embed]});
    }
}