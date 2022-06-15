const mongo = require("mongoose")
const schema = require("./schemas/rank/message-count-schema")

module.exports = client => {
    
    client.on('messageCreate', async (message) => {    

        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;

        let member = message.author.id
        let dataQuery = await schema.findOne({ userID: member })

        if (!dataQuery) {
            const newSchem = new schema(
                {
                    _id: mongo.Types.ObjectId(),
                    userID: member,
                    messageCount: 1
                },
                {
                    upsert: true
                }
            )
        
            await newSchem.save()
        }
        else {
            dataQuery.updateOne(
                {

                    messageCount: dataQuery.messageCount++
                },
                {
                    upsert: true
                }
            )
            await dataQuery.save()
        }
    })
}