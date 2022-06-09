const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "meme",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async (client, message, args) => {
        function getMeme() {
            return fetch(`https://some-random-api.ml/meme`)
            .then(data => data.json())
            .then(player => [player.image, player.caption]);
        }

        const [meme, caption] = await getMeme();

        let memeembed = new MessageEmbed()
        memeembed
            .setTitle(`${caption}`)
            .setImage(`${meme}`)
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        message.channel.send(memeembed)
    }
}