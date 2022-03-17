module.exports = {
    name: "ping", 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        message.reply(" 🏓 Pong! *``" + `${Date.now() - message.createdTimestamp}` + "ms``*") 
    }
}