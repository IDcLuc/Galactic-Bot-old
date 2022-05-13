const messages = ["ImKingGolden's real name is Balden.", "Did you know t**h**at t**h**e letter **h** is everyw**h**ere in your life? Yes, a mere letter is everyw**h**ere. W**h**en you talk, you will almost always say t**h**e letter **h** as it's in most determiners. T**h**us, making you an **H** gang member.", "Major is good streamer.", "Major was once egirl.", "If you join major's guild, you instantly become good at the game.", "Creating this bot costed blood and sweat.", "This bot is not 24/7.", "Yi5 is a bit bald."]

module.exports = {
    name: "fax",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let randomMessage  = messages[Math.floor(Math.random() * messages.length)];

        message.reply(randomMessage)
    }
} 