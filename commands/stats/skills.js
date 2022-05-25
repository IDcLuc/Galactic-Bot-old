const { MessageEmbed } = require('discord.js');
const hypixel = require('../../hypixelapi')
const fetch = require('node-fetch')

module.exports = {
    name: "skills",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {   
        let plr = args[0]
        if (!plr) return message.reply("Please provide a player name.")
        function checkname(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success);
        }
        const success = await checkname(plr)
        if(success == false) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)
        
        function playedSkyblock(playerUUID) {
            return fetch(`https://api.hypixel.net/skyblock/profiles?uuid=${playerUUID}&key=${process.env.apikey}`)
            .then(data => data.json())
            .then(player => player.profiles)
        }; const played = await playedSkyblock(playerID)
        if(played == null) return message.reply("This player doesn't have a skyblock profile!")

        hypixel.getSkyblockProfiles(plr).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
/////////////////////////////////////////////////////////////////////////////////////
            hypixel.getSkyblockMember(plr).then(member => {
                function getname(player) {
                    return fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`)
                    .then(data => data.json())
                    .then(player => player.name);
                }
                const skill = member.get(lastprofile).skills
                let embed = new MessageEmbed()
                    .setTitle(`${getname(args[0])}'s Skills`)
                    .addFields(
                        { name: "Combat " + skill.combat.level, value: "Level", inline: true },
                        { name: "Farming " + skill.farming.level, value: "Level", inline: true },
                        { name: "Fishing " + skill.fishing.level, value: "Level ", inline: true },
                        { name: "Mining " + skill.mining.level, value: "Level ", inline: true},
                        { name: "Foraging " + skill.foraging.level, value: "Level ", inline: true },
                        { name: "Enchanting " + skill.enchanting.level, value: "Level ", inline: true },
                        { name: "Alchemy " + skill.alchemy.level, value: "Level ", inline: true },
                        { name: "Taming " + skill.taming.level, value: "Level ", inline: true },
                        { name: "Runecrafting " + skill.taming.level, value: "Level ", inline: true },
                        { name: "Catacombs " + member.get(lastprofile).dungeons.types.level, value: "Level ", inline: true },
                    )
                    .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
                message.reply({ embeds: [embed] }) 
            }).catch(e => {
                console.log(e);
            })
        })
    }
}