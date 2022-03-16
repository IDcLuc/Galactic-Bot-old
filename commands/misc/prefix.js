module.exports = {
    name: "prefix",
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply(`The prefix for ${message.guild} is ${prefix}`)
    }
}