module.exports = {
    name: "ping",
    aliases: ["pong"], 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        let ping = message.createdTimestamp - Date.now()
        if(ping.startsWith('-')) ping.split(1)
        message.reply("🏓 Pong! *``" + `${message.createdTimestamp - Date.now()}` + "ms``*")
    }
}