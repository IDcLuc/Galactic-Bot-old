const schema = require('C:/Users/soler/OneDrive/Documents/GalacticBot/schemas/rank/message-count-schema')


module.exports = {
    name: "rank",
    aliases: ['level'],
    cooldown: 3,
    category: "rank",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let member = message.author.id
        let dataQuery = await schema.findOne({ userID: member })
        message.reply(dataQuery.messageCount.toString())
    }
}