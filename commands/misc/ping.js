module.exports = {
    name: "ping", 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        message.reply("🏓 Pong! *``" + `${message.createdTimestamp - Date.now()}` + "ms``*")
    }
}

module.exports = {
    name: "pong", 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        message.reply("Ping! *``" + `${Date.now() - message.createdTimestamp}` + "ms``* 🏓") 
    }
}