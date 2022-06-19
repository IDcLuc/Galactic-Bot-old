const schema = require('C:/Users/soler/OneDrive/Documents/GalacticBot/schemas/rank/message-count-schema')

const levelRequirements = [ 0, 10, 20, 40, 70, 110, 160, 220, 290, 370, 460, 560, 670, 790, 910, 1040, 1180, 1330, 1490, 1660, 1840, 2040, 2240, 2450, 2670, 2900, 3130, 3370, 3620, 3880, 4150, 4430, 4720, 5020, 5330, 5650, 5980, 6320, 6670, 7030, 7400, 7780, 8170, 8570, 8980, 9400, 9830, 10270, 10720, 11180, 11650, 12130, 12620, 13120, 13630, 14150, 14670, 15200, 15730, 16270, 16820, 17370, 17930, 18500, 19070, 19640, 20220, 20800, 21400, 22010, 22600, 23210, 23820, 24440, 25060, 25680, 26300, 26920, 27540, 28160, 28780, 29400, 30020, 30640, 31260, 31880, 32500, 33120, 33740, 34360, 34980, 35600, 36220, 36840, 37460, 38080, 38700, 39320, 39940, 40560, 41180, 41800, 42420, 43040, 43660, 44280, 44800, 45420, 46040, 46660, 47280, 47900, 48520, 49140, 49760, 50380, 51000, 51620, 52240, 52860, 53480, 54100, 54720, 55340, 55960, 56580, 57200, 57820, 58440, 59060, 59680, 60300, 60920, 61540, 62160, 62780, 63400, 64020, 64640, 65260, 65880, 66500, 67120, 67740, 68360, 68980, 69600, 70220, 70840, 71460, 72080,]
module.exports = {
    name: "rank",
    aliases: ['level'],
    cooldown: 3,
    category: "rank",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const member = message.mentions.members.first() ? message.mentions.members.first() : message.member.id 
        const dataQuery = await schema.findOne({ userID: member })
        if (dataQuery) {
            const msgcount = dataQuery.messageCount

            function between(num, min, max) { 
                return num >= min && num < max;
            } 
            for (let index in levelRequirements) {
                const level = index
                const requirement = levelRequirements[index]
                const nexRequirement = levelRequirements[++index]
                const percentage = (msgcount / requirement) * 100
                if(between(msgcount, requirement, nexRequirement))
                    message.reply(`You are level ${level}.`)
            }
        }
        else message.reply('You are level 0. Send some messages before running this command smh')
    } 
} 
  