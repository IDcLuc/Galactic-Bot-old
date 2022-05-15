module.exports = {
    name: "ping",
    aliases: ["pong"], 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        message.reply("🏓 Pong! *``" + `${message.createdTimestamp - Date.now()}` + "ms``*")
    }
}