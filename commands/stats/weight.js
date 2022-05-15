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
            //define sbstat as player's stats
                let sbstat = member.get(lastprofile);
                let dungeon = sbstat.dungeons;
                let skill = sbstat.skills
                let slayer = sbstat.slayer


                console.log(dungeon)
            }).catch(e => {
                console.log(e);
            })
/////////////////////////////////////////////////////////////////////////////////////
        })
    }
}

