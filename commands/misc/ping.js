module.exports = {
    name: "ping",
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply(" 🏓 Pong! ``" + `${message.createdTimestamp - Date.now()}` + "ms``")
    }
}