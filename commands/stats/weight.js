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

        hypixel.getSkyblockProfiles(args[0]).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            console.log(profiles[0].me.skills)
        })
    }
}

