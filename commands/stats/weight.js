const hypixel = require('../../hypixelapi');
const fetch = require("node-fetch")
module.exports = {
    name: "weight",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];
        if (!plr) return message.channel.send(`Please provide a player name.`);

        //check if username is valid with playerdb api
        function getId(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success);
        }
        const id = await getId(plr)
        if(id == false) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)

        hypixel.getSkyblockProfiles(args[0]).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
/////////////////////////////////////////////////////////////////////////////////////
            hypixel.getSkyblockMember(plr).then(member => {
                const sbstat = member.get(lastprofile)

                // skills weight
                function calcSkillWeight(skillname, numidk) {
                    const percentage = skillname.xpCurrent/skillname.xpForNext * 100
                    const lev = skillname.level + percentage / 100
                    const ToRound = Math.pow(lev * 10, 0.5 + numidk + lev / 100) / 1250
                    return Math.round(ToRound * 10) / 10
                }
                const forage = calcSkillWeight(sbstat.skills.foraging, 1.232826)
                const fish = calcSkillWeight(sbstat.skills.fishing, 1.406418)
                const brewing = calcSkillWeight(sbstat.skills.alchemy, 1.0)                                                                                                                                                                  
                const enchant = calcSkillWeight(sbstat.skills.enchanting, 0.96976583)
                const fight = calcSkillWeight(sbstat.skills.combat, 1.15797687265)
                const mine = calcSkillWeight(sbstat.skills.mining, 1.18207448)
                const farm = calcSkillWeight(sbstat.skills.farming, 1.217848139)
                const tame = calcSkillWeight(sbstat.skills.taming, 1.14744 )
                const skillWeight = forage + fish + brewing + enchant + fight + mine + farm + tame

                console.log(Math.round(skillWeight * 10) / 10)

                // dungeons weight
                function calcDungeonWeight(type, divider) {
                    const percentage = type.xpCurrent/type.xpForNext * 100
                    const lev = type.level + percentage / 100
                    const toRound = Math.pow(lev, 4.5) * divider
                    return Math.round(toRound * 10) / 10
                }
                const catacombs = calcDungeonWeight(sbstat.dungeons.types.catacombs, 0.0002149604615)
                const healer = calcDungeonWeight(sbstat.dungeons.classes.healer, 0.0000045254834)
                const berserk = calcDungeonWeight(sbstat.dungeons.classes.berserk, 0.0000045254834)
                const archer = calcDungeonWeight(sbstat.dungeons.classes.archer, 0.0000045254834)
                const mage = calcDungeonWeight(sbstat.dungeons.classes.mage, 0.0000045254834)
                const tank = calcDungeonWeight(sbstat.dungeons.classes.tank, 0.0000045254834)
                const dungeonweight = catacombs + healer + berserk + archer + mage + tank
                console.log(Math.round(dungeonweight * 10) / 10)

                // slayer weight
                function calcSlayerWeight(type, divider) {
                    return Math.round(type.xp / divider * 10) / 10
                }
                const rev = calcSlayerWeight(sbstat.slayer.zombie, 2208)
                const tara = calcSlayerWeight(sbstat.slayer.spider, 2118)
                // const eman = calcSlayerWeight(sbstat.slayer.enderman, 1430)         
                const wolf = calcSlayerWeight(sbstat.slayer.wolf, 1962)

                const slayerweight = rev + tara + wolf
                console.log(Math.round(slayerweight * 10) / 10)
                console.log(sbstat.slayer)
            }).catch(e => {
                console.log(e);
            })
/////////////////////////////////////////////////////////////////////////////////////
        })
    }
}

