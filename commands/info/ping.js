module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply("Pong! " + `${Date.now() - message.createdTimestamp}` + "ms (yes I know there's a minus don't mind it)")
    }
}