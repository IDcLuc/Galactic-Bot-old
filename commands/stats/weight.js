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
                if (!sbstat.skills) return message.reply(`This player doesn't have skills API on!`)
                let forage = calcSkillWeight(sbstat.skills.foraging, skillWeig.exponents.foraging)
                let fish = calcSkillWeight(sbstat.skills.fishing, skillWeig.exponents.fishing)
                let brewing = calcSkillWeight(sbstat.skills.alchemy, skillWeig.exponents.alchemy)
                let enchant = calcSkillWeight(sbstat.skills.enchanting, skillWeig.exponents.enchanting)
                let fight = calcSkillWeight(sbstat.skills.combat, skillWeig.exponents.combat)
                let mine = calcSkillWeight(sbstat.skills.mining, skillWeig.exponents.mining)
                let farm = calcSkillWeight(sbstat.skills.farming, skillWeig.exponents.farming)
                let tame = calcSkillWeight(sbstat.skills.taming, skillWeig.exponents.taming)

                function max_skill(weight, maxweight) {
                    return weight > maxweight ? maxweight : weight
                }

                forage = max_skill(forage, skillWeig.maxWeight.forage)
                fish = max_skill(fish, skillWeig.maxWeight.fish)
                brewing = max_skill(brewing, skillWeig.maxWeight.brewing)
                enchant = max_skill(enchant, skillWeig.maxWeight.enchant)
                fight = max_skill(fight, skillWeig.maxWeight.fight)
                mine = max_skill(mine, skillWeig.maxWeight.mine)
                farm = max_skill(farm, skillWeig.maxWeight.farm)
                tame = max_skill(tame, skillWeig.maxWeight.tame)

                const skillWeightt = forage + fish + brewing + enchant + fight + mine + farm + tame

                // dungeons weight
                const dungeonExponents = {
                    dividers: {
                        catacombs: 0.0002149604615,
                        healer: 0.0000045254834,
                        mage: 0.0000045254834,
                        berserk: 0.0000045254834,
                        archer: 0.0000045254834,
                        tank: 0.0000045254834,                                              
                    },
                    maxWeight: {
                        catacombs: 9500
                    }
                }
                function calcDungeonWeight(type, divider) {
                    const percentage = type.xpCurrent/type.xpForNext * 100
                    const lev = type.level + percentage / 100
                    return Math.pow(lev, 4.5) * divider
                }
                let catacombs = calcDungeonWeight(sbstat.dungeons.types.catacombs, dungeonExponents.dividers.catacombs)
                let healer = calcDungeonWeight(sbstat.dungeons.classes.healer, dungeonExponents.dividers.healer)
                let berserk = calcDungeonWeight(sbstat.dungeons.classes.berserk, dungeonExponents.dividers.berserk)
                let archer = calcDungeonWeight(sbstat.dungeons.classes.archer, dungeonExponents.dividers.archer)
                let mage = calcDungeonWeight(sbstat.dungeons.classes.mage, dungeonExponents.dividers.mage)
                let tank = calcDungeonWeight(sbstat.dungeons.classes.tank, dungeonExponents.dividers.tank)
                
                function max_dungeon(weight, maxweight) {   
                    return weight > maxweight ? maxweight : weight
                }
                catacombs = max_dungeon(catacombs) //, skillWeig.maxWeight.catacombs
                healer = max_dungeon(healer) //, skillWeig.maxWeight.healer
                berserk = max_dungeon(berserk) //, skillWeig.maxWeight.berserk
                archer = max_dungeon(archer) //, skillWeig.maxWeight.archer
                mage = max_dungeon(mage) //, skillWeig.maxWeight.mage
                tank = max_dungeon(tank) //, skillWeig.maxWeight.tank

                function max_dungeons(weight, maxweight) {
                    return weight > maxweight ? maxweight : weight
                }
                
                catacombs = max_dungeon(catacombs, dungeonExponents.maxWeight.catacombs)

                const dw = catacombs + healer + berserk + archer + mage + tank

                // slayer weight
                const slayerExponents = {
                    dividers: {
                        wolf: 1962,
                        rev: 2208,
                        tara: 2118,
                        enderman: 1430 
                    },
                    maxWeight: {
                        wolf: 509.7,
                        tara: 472.1,
                        enderman: 699.3,
                        rev: 452.9
                    }
                }
                function calcSlayerWeight(type, divider) {
                    return type.xp / divider
                }
                let rev = calcSlayerWeight(sbstat.slayer.zombie, slayerExponents.dividers.rev)
                let tara = calcSlayerWeight(sbstat.slayer.spider, slayerExponents.dividers.tara)
                let wolf = calcSlayerWeight(sbstat.slayer.wolf, slayerExponents.dividers.wolf)
                let enderman = calcSlayerWeight(sbstat.slayer.enderman, slayerExponents.dividers.enderman)

                function max_slayer(weight, maxweight) {
                    return weight > maxweight ? maxweight : weight
                }
                rev = max_slayer(rev, slayerExponents.maxWeight.rev)
                tara = max_slayer(tara, slayerExponents.maxWeight.tara)
                wolf = max_slayer(wolf, slayerExponents.maxWeight.wolf)
                enderman = max_slayer(enderman, slayerExponents.maxWeight.enderman)

                const slw = rev + tara + wolf + enderman

                const senWeight = Math.round((slw + skillWeightt + dw) * 10) / 10

                function between(min, max, num) {
                    return num >= min && num < max
                }

                //get stage
                let stage;
                switch (true) {
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
                    default: "Early Game";
                }

                //formating
                const senWeightFormated = new Intl.NumberFormat('en-US').format(senWeight)

                const farmFormated = new Intl.NumberFormat('en-US').format(Math.round(farm * 10) / 10)
                const mineFormated = new Intl.NumberFormat('en-US').format(Math.round(mine * 10) / 10)
                const forageFormated = new Intl.NumberFormat('en-US').format(Math.round(forage * 10) / 10)
                const fishFormated = new Intl.NumberFormat('en-US').format(Math.round(fish * 10) / 10)
                const brewingFormated = new Intl.NumberFormat('en-US').format(Math.round(brewing * 10) / 10)
                const enchantFormated = new Intl.NumberFormat('en-US').format(Math.round(enchant * 10) / 10)
                const fightFormated = new Intl.NumberFormat('en-US').format(Math.round(fight * 10) / 10)
                const tameFormated = new Intl.NumberFormat('en-US').format(Math.round(tame * 10) / 10)
                
                const catacombsFormated = new Intl.NumberFormat('en-US').format(Math.round(catacombs * 10) / 10)
                const healerFormated = new Intl.NumberFormat('en-US').format(Math.round(healer * 10) / 10)
                const berserkFormated = new Intl.NumberFormat('en-US').format(Math.round(berserk * 10) / 10)
                const archerFormated = new Intl.NumberFormat('en-US').format(Math.round(archer * 10) / 10)
                const mageFormated = new Intl.NumberFormat('en-US').format(Math.round(mage * 10) / 10)
                const tankFormated = new Intl.NumberFormat('en-US').format(Math.round(tank * 10) / 10)

                const revFormated = new Intl.NumberFormat('en-US').format(Math.round(rev * 10) / 10)
                const taraFormated = new Intl.NumberFormat('en-US').format(Math.round(tara * 10) / 10)
                const wolfFormated = new Intl.NumberFormat('en-US').format(Math.round(wolf * 10) / 10)
                const endermanFormated = new Intl.NumberFormat('en-US').format(Math.round(enderman * 10) / 10)

                const dungeonFormated = new Intl.NumberFormat('en-US').format(Math.round(dw * 10) / 10)
                const slayerFormated = new Intl.NumberFormat('en-US').format(Math.round(slw * 10) / 10)
                const skillFormated = new Intl.NumberFormat('en-US').format(Math.round(skillWeightt * 10) / 10)


                //create and send embed 
                let theEmbed = new MessageEmbed()
                    .setTitle(`${playerObj}'s Senither Weight on ${lastprofile} (without Overflow)`)
                    .setURL(`https://sky.shiiyu.moe/stats/${plr}`)
                    .setDescription(`Total: **${senWeightFormated}**\n Stage: **${stage}**`)
                    .setThumbnail(`https://crafatar.com/renders/body/${playerID}?overlay&size=128`)
                    .addFields(
                        { name: `<:diamond_sword:979322481678639124> Skills: ${skillFormated}`, value:`➜ Farming: **${farmFormated}**\n➜ Mining: **${mineFormated}**\n➜ Foraging: **${forageFormated}**\n➜ Combat: **${fightFormated}**\n➜ Taming: **${tameFormated}**\n➜ Fishing: **${fishFormated}**\n➜ Alchemy: **${brewingFormated}**\n➜ Enchanting: **${enchantFormated}**`},
                        { name: `<:maddox:979377063842676786> Slayers: ${slayerFormated}`, value: `➜ Revenant Horror: **${revFormated}**\n➜ Tarantula Broodfather: **${taraFormated}**\n➜ Sven Packmaster: **${wolfFormated}**\n➜ Voidgloom Seraph: **${endermanFormated}**`},
                        { name: `<:catacombs:979377305073877072> Dungeons: ${dungeonFormated}`, value: `➜ Catacombs: **${catacombsFormated}**\n➜ Healer: **${healerFormated}**\n➜ Berserker: **${berserkFormated}**\n➜ Archer: **${archerFormated}**\n➜ Tank: **${tankFormated}**\n➜ Mage: **${mageFormated}**`}
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