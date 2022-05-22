module.exports = {
    name: "ping",
    aliases: ["pong"], 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        const latency = message.createdTimestamp - Date.now()
        let ping = Math.abs(Date.now() - message.createdTimestamp)
        message.reply("🏓 Pong! *``" + `${ping}` + "ms``*")
    }
}