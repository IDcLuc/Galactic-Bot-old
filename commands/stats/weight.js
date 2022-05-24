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
        function checkName(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success)
        }

        const valid = checkName(plr)
        if(valid == false) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)

        hypixel.getSkyblockProfiles(args[0]).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
/////////////////////////////////////////////////////////////////////////////////////
            hypixel.getSkyblockMember(plr).then(member => {
                const sbstat = member.get(lastprofile)
                const exponents = {
                    mining: 1.18207448,
                    foraging: 1.232826,
                    enchanting: 0.96976583,
                    farming: 1.217848139,
                    combat: 1.15797687265,
                    fishing: 1.406418,
                    alchemy: 1.0,
                    taming: 1.14744,
                }
                // skills weight
                function calcSkillWeight(skillname, numidk) {
                    const percentage = skillname.xpCurrent/skillname.xpForNext * 100
                    const lev = skillname.level + percentage / 100
                    const ToRound = Math.pow(lev * 10, 0.5 + numidk + lev / 100) / 1250
                    return ToRound
                }
                const forage = calcSkillWeight(sbstat.skills.foraging, exponents.foraging)
                const fish = calcSkillWeight(sbstat.skills.fishing, exponents.fishing)
                const brewing = calcSkillWeight(sbstat.skills.alchemy, exponents.alchemy)
                const enchant = calcSkillWeight(sbstat.skills.enchanting, exponents.enchanting)
                const fight = calcSkillWeight(sbstat.skills.combat, exponents.combat)
                const mine = calcSkillWeight(sbstat.skills.mining, exponents.mining)
                const farm = calcSkillWeight(sbstat.skills.farming, exponents.farming)
                const tame = calcSkillWeight(sbstat.skills.taming, exponents.taming)

                const skillWeightt = Math.round((forage + fish + brewing + enchant + fight + mine + farm + tame) * 10) / 10
                const skillWeight = skillWeightt.toString()

                console.log(skillWeight)
                message.reply(skillWeight)

                // dungeons weight
                function calcDungeonWeight(type, divider) {
                    const percentage = type.xpCurrent/type.xpForNext * 100
                    const lev = type.level + percentage / 100
                    const toRound = Math.pow(lev, 4.5) * divider
                    return toRound
                }
                const catacombs = calcDungeonWeight(sbstat.dungeons.types.catacombs, 0.0002149604615)
                const healer = calcDungeonWeight(sbstat.dungeons.classes.healer, 0.0000045254834)
                const berserk = calcDungeonWeight(sbstat.dungeons.classes.berserk, 0.0000045254834)
                const archer = calcDungeonWeight(sbstat.dungeons.classes.archer, 0.0000045254834)
                const mage = calcDungeonWeight(sbstat.dungeons.classes.mage, 0.0000045254834)
                const tank = calcDungeonWeight(sbstat.dungeons.classes.tank, 0.0000045254834)
                
                const dw = Math.round((catacombs + healer + berserk + archer + mage + tank) * 10) / 10
                const dungeonweight = dw.toString()

                console.log(dungeonweight)
                message.reply(dungeonweight)

                // slayer weight
                function calcSlayerWeight(type, divider) {
                    return type.xp / divider
                }
                const rev = calcSlayerWeight(sbstat.slayer.zombie, 2208)
                const tara = calcSlayerWeight(sbstat.slayer.spider, 2118)
                const wolf = calcSlayerWeight(sbstat.slayer.wolf, 1962)

                const slw = Math.round(rev + tara + wolf * 10) / 10
                const slayerweight = slw.toString()
                console.log(slayerweight)
                message.reply(slayerweight)
            }).catch(e => {
                console.log(e)
                message.reply('An error occured while performing this action.')
            })  
/////////////////////////////////////////////////////////////////////////////////////
        })
    }
}

