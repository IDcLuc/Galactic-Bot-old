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
        //sort profiles by lastSaveTimestamp then get highest profile's name
        hypixel.getSkyblockProfiles(args[0]).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
/////////////////////////////////////////////////////////////////////////////////////
            hypixel.getSkyblockMember(plr).then(member => {
                let sbstat = member.get(lastprofile);
                let dungeon = sbstat.dungeons;
                let skill = sbstat.skills
                let slayer = sbstat.slayer
                //define skills
                let foraging = skill.foraging.level
                let fishing = skill.fishing.level
                let alchemy = skill.alchemy.level 
                let enchanting = skill.enchanting.level
                let combat = skill.combat.level
                let mining = skill.mining.level 
                let farming = skill.farming.level 
                let taming = skill.taming.level
                //skills weight
                let forage = Math.pow(skillname * 10, 0.5 + eponent + skillname / 100) / 1250;
                let fish = Math.pow(skillname * 10, 0.5 + eponent + skillname / 100) / 1250;
                let brewing = Math.pow(skillname * 10, 0.5 + eponent + skillname / 100) / 1250;
                let enchant = Math.pow(skillname * 10, 0.5 + eponent + skillname / 100) / 1250;
                let fight = Math.pow(skillname * 10, 0.5 + eponent + skillname / 100) / 1250;
                let mine = Math.pow(mining * 10, 0.5 + eponent + mining / 100) / 1250;
                let farm = Math.pow(skillname * 10, 0.5 + exponent + skillname / 100) / 1250;
                let tame = Math.pow(skillname * 10, 0.5 + exponent + skillname / 100) / 1250;

            }).catch(e => {
                console.log(e);
            })
/////////////////////////////////////////////////////////////////////////////////////
        })
    }
}

