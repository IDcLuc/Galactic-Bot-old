const mongo = require("mongoose")
const schema = require("./schemas/rank/message-count-schema")
const messageCountSchema = require("./schemas/rank/message-count-schema")

module.exports = client => {
    
    client.on('messageCreate', async (message) => {    
        const { author } = message
        const { id } = author
        mongo.connect(
            process.env.MONGO_URI,
            {
                keepAlive: true
            }
        )

        const dataQuery = await messageCountSchema.findOne({ id })
        
        if (!dataQuery) {
            const newSchem = schema(
                {
                    _id: id
                },
                {
                    $inc: {
                        messageCount: 1
                    }
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
                    $inc: {
                        messageCount: 1
                    }
                },
                {
                    upsert: true
                }
            )
        }
    })
}