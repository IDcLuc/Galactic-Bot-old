const Discord = require("discord.js")
require("dotenv").config()
const imageGenerator = require('./imageGenerator')

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "g!",
    owners: ["495514555615543329"]
}

const welcomeChannelId = "953691364485365821"

client.on("guildMemberAdd", async (member) => {               
    const img = await imageGenerator(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `Hey, <@${member.id}>! Welcome to the server, please make sure to read the rules before chatting!`,
        files: [img]
    })
})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.login(process.env.KEY)