const HypixelAPI = require('hypixel-api')
const clent = new HypixelAPI("8477c865-dfca-4354-b32c-3a78e8c24f3e");

module.exports = {
    name: "weight",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let playerr = args[0];
        if (!playerr) return message.channel.send(`Please provide a player name.`);
        
        clent.getPlayer('name', playerr).then((player) => {
            let mlevel = player.player.achievements.skyblock_excavator
            let flevel = player.player.achievements.skyblock_harvester
            let filevel = player.player.achievements.skyblock_angler
            let alevel = player.player.achievements.skyblock_concoctor
            let tlevel = player.player.achievements.skyblock_domesticator
            let folevel = player.player.achievements.skyblock_gatherer

            let mweight = Math.pow(mlevel * 10, 0.5 + 1.18207448 + mlevel / 100) / 1250
            let fweight = Math.pow(flevel * 10, 0.5 + 1.217848139 + flevel / 100) / 1250
            let fiweight = Math.pow(filevel * 10, 0.5 + 1.406418 + filevel / 100) / 1250
            let aweight = Math.pow(mlevel * 10, 0.5 + 1.0 + mlevel / 100) / 1250
            let tweight = Math.pow(tlevel * 10, 0.5 + 1.14744 + mlevel / 100) /1250


            console.log(player)
            message.reply("idk if this command will ever be finished")
        }).catch((err) => {
            console.error("You are a dumbass and made an error: \n" + err)
            message.reply("An error occurred, did you spell the username right? ``" + err + "``")
        })
    }
}

