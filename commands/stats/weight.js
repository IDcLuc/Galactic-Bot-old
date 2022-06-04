const hypixel = require('../../hypixelapi');
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "weight",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];
        if (!plr) return message.channel.send(`Please provide a player name.`);

        //check if username is valid with playerdb api
        function checkName(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success)
        }; const valid = await checkName(plr)
        if(!valid) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)
        let playerObj = await hypixel.getPlayer(plr)

        function getUUID(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.data.player.raw_id)
        }; const playerID = await getUUID(plr)

        function playedSkyblock(playerUUID) {
            return fetch(`https://api.hypixel.net/skyblock/profiles?uuid=${playerUUID}&key=${process.env.apikey}`)
            .then(data => data.json())
            .then(player => player.profiles)
        }; const played = await playedSkyblock(playerID)
        if(played == null) return message.reply("This player doesn't have a skyblock profile!")

        
        hypixel.getSkyblockProfiles(args[0]).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
            hypixel.getSkyblockMember(plr).then(member => {
                const sbstat = member.get(lastprofile)

                // skills weight
                const skillWeig = {
                    exponents: {
                        mining: 1.18207448,
                        foraging: 1.232826,
                        enchanting: 0.96976583,
                        farming: 1.217848139,
                        combat: 1.15797687265,
                        fishing: 1.406418,
                        alchemy: 1.0,
                        taming: 1.14744
                    },
                    maxWeight: {
                        forage: 850,
                        mine: 1750,
                        enchant: 450,
                        farm: 2200,
                        fight: 1500,
                        fish: 2500,
                        brewing: 200,
                        tame: 500
                    }
                }
                function calcSkillWeight(skillname, numidk) {
                    const percentage = skillname.xpCurrent/skillname.xpForNext * 100
                    const lev = skillname.level + percentage / 100
                    return Math.pow(lev * 10, 0.5 + numidk + lev / 100) / 1250
                }
                let forage = calcSkillWeight(sbstat.skills.foraging, skillWeig.exponents.foraging)
                let fish = calcSkillWeight(sbstat.skills.fishing, skillWeig.exponents.fishing)
                let brewing = calcSkillWeight(sbstat.skills.alchemy, skillWeig.exponents.alchemy)
                let enchant = calcSkillWeight(sbstat.skills.enchanting, skillWeig.exponents.enchanting)
                let fight = calcSkillWeight(sbstat.skills.combat, skillWeig.exponents.combat)
                let mine = calcSkillWeight(sbstat.skills.mining, skillWeig.exponents.mining)
                let farm = calcSkillWeight(sbstat.skills.farming, skillWeig.exponents.farming)
                let tame = calcSkillWeight(sbstat.skills.taming, skillWeig.exponents.taming)

                if(forage >= skillWeig.maxWeight.forage) forage = skillWeig.maxWeight.forage
                if(fish >= skillWeig.maxWeight.fish) fish = skillWeig.maxWeight.fish
                if(brewing >= skillWeig.maxWeight.brewing) brewing = skillWeig.maxWeight.brewing
                if(enchant >= skillWeig.maxWeight.enchant) enchant = skillWeig.maxWeight.enchant
                if(fight >= skillWeig.maxWeight.fight) fight = skillWeig.maxWeight.fight
                if(mine >= skillWeig.maxWeight.mine) mine = skillWeig.maxWeight.mine
                if(farm >= skillWeig.maxWeight.farm) farm = skillWeig.maxWeight.farm
                if(tame >= skillWeig.maxWeight.tame) tame = skillWeig.maxWeight.tame


                const skillWeightt = Math.round((forage + fish + brewing + enchant + fight + mine + farm + tame) * 10) / 10

                // dungeons weight
                function calcDungeonWeight(type, divider) {
                    const percentage = type.xpCurrent/type.xpForNext * 100
                    const lev = type.level + percentage / 100
                    return Math.pow(lev, 4.5) * divider
                }
                const catacombs = calcDungeonWeight(sbstat.dungeons.types.catacombs, 0.0002149604615)
                const healer = calcDungeonWeight(sbstat.dungeons.classes.healer, 0.0000045254834)
                const berserk = calcDungeonWeight(sbstat.dungeons.classes.berserk, 0.0000045254834)
                const archer = calcDungeonWeight(sbstat.dungeons.classes.archer, 0.0000045254834)
                const mage = calcDungeonWeight(sbstat.dungeons.classes.mage, 0.0000045254834)
                const tank = calcDungeonWeight(sbstat.dungeons.classes.tank, 0.0000045254834)
                
                const dw = Math.round((catacombs + healer + berserk + archer + mage + tank) * 10) / 10

                // slayer weight
                function calcSlayerWeight(type, divider) {
                    return type.xp / divider
                }
                const rev = calcSlayerWeight(sbstat.slayer.zombie, 2208)
                const tara = calcSlayerWeight(sbstat.slayer.spider, 2118)
                const wolf = calcSlayerWeight(sbstat.slayer.wolf, 1962)
                const enderman = calcSlayerWeight(sbstat.slayer.enderman, 1430)

                const slw = Math.round((rev + tara + wolf + enderman) * 10) / 10
                const senWeight = slw + skillWeightt + dw

                function between(min, max, num) {
                    return num >= min && num < max
                }
                let stage = "Early Game";
                switch (true) {  //get stage
                    case between(2000, 7000, senWeight): 
                        stage = "Mid Game"
                    break;
                    case between(7000, 10000, senWeight): 
                        stage = "Late Game";
                    break;
                    case between(10000, 15000, senWeight): 
                        stage = "Early End";
                    break;
                    case between(15000, 30000, senWeight): 
                        stage = "End Game"; 
                    break;
                    case senWeight >= 30000:
                        stage = "What the fuck.";
                    break;
                }

                let theEmbed = new MessageEmbed()
                    .setTitle(`${playerObj}'s Senither Weight on ${lastprofile} without Overflow`)
                    .setURL(`https://sky.shiiyu.moe/${plr}`)
                    .setDescription(`Total: **${Math.round((senWeight) * 10) / 10}**\n Stage: **${stage}**`)
                    .setThumbnail(`https://crafatar.com/renders/body/${playerID}?overlay&size=128`)
                    .addFields(
                        { name: `<:diamond_sword:979322481678639124> Skills: ${skillWeightt}`, value:`➜ Farming: **${Math.round(farm * 10) / 10}**\n➜ Mining: **${Math.round(mine * 10) / 10}**\n➜ Foraging: **${Math.round(forage * 10) / 10}**\n➜ Combat: **${Math.round(fight * 10) / 10}**\n➜ Taming: **${Math.round(tame * 10) / 10}**\n➜ Fishing: **${Math.round(fish * 10) / 10}**\n➜ Alchemy: **${Math.round(brewing * 10) / 10}**\n➜ Enchanting: **${Math.round(enchant * 10) / 10}**`},
                        { name: `<:maddox:979377063842676786> Slayers: ${slw}`, value: `➜ Revenant Horror: **${Math.round(rev * 10) / 10 }**\n➜ Tarantula Broodfather: **${Math.round(tara * 10) / 10}**\n➜ Sven Packmaster: **${Math.round(wolf * 10) / 10}**\n➜ Voidgloom Seraph: **${Math.round(enderman * 10) / 10}**`},
                        { name: `<:catacombs:979377305073877072> Dungeons: ${dw}`, value: `➜ Catacombs: **${Math.round(catacombs * 10) / 10}**\n➜ Healer: **${Math.round(healer * 10) / 10}**\n➜ Berserker: **${Math.round(berserk * 10) / 10}**\n➜ Archer: **${Math.round(archer * 10) / 10}**\n➜ Tank: **${Math.round(tank * 10) / 10}**\n➜ Mage: **${Math.round(mage * 10) / 10}**`}
                    )
                    .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})


                message.reply({ embeds: [theEmbed]} )
            }).catch(e => {
                console.log(e)
                message.reply('An error occured while performing this action.')
            })  
        })
    }
}