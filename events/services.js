const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;

        if (customId === 'services') {
            const selectedValue = values[0];
            let embed;

            // Different ephemeral "Hi" messages for each option
            if (selectedValue === 'dp') {
                embed = new EmbedBuilder()
                    .setDescription(`The prices below are the prices for the discord services.`)
                    .setFields([
                        { name: 'Bot', value: '200', inline: true },
                        { name: 'Emojis', value: '100', inline: true },
                        { name: 'Template', value: '300', inline: true },
                        { name: 'Embeds', value: '400', inline: true },

                    ])
                    .setColor(`#2F3136`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/attachments/1261011896950329374/1304516753736470538/SD.png?ex=672fad66&is=672e5be6&hm=5d893f50eb9ee7f8442a52b392361b94d5057edc4c6a45c93bcc0f420a60309a&'
                    });
            } else if (selectedValue === 'tc') {
                embed = new EmbedBuilder()
                .setColor(`#2F3136`)
                    .setDescription(`We only a`)
                    .setColor(`#2F3136`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/attachments/1261011896950329374/1304516753736470538/SD.png?ex=672fad66&is=672e5be6&hm=5d893f50eb9ee7f8442a52b392361b94d5057edc4c6a45c93bcc0f420a60309a&'
                    });
            } else if (selectedValue === 'htgh') {
                embed = new EmbedBuilder()
                .setTitle(`How to Apply for a Position at Section Designs`)
                    .setDescription(`

To express your interest in joining Section Designs, please follow these steps:

1. **Open a Ticket**: Begin by opening a ticket in the designated channel <#1304462890627104778>.
   
2. **Notify Us of Your Intent**: Once the ticket is open, kindly inform us of your desire to be hired by providing the relevant details.

**Please Note**: It is essential that candidates possess a solid understanding of Discord customizations, including the creation of bots and templates.

Thank you for your interest in becoming a part of Section Designs!

`)
                    .setColor(`#2F3136`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/attachments/1261011896950329374/1304516753736470538/SD.png?ex=672fad66&is=672e5be6&hm=5d893f50eb9ee7f8442a52b392361b94d5057edc4c6a45c93bcc0f420a60309a&'
                    });
            } else if (selectedValue === 'notused') {
                embed = new EmbedBuilder()
                    .setDescription(`notusedlil bro`)
                    .setColor('#aed191')
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/attachments/1261011896950329374/1304516753736470538/SD.png?ex=672fad66&is=672e5be6&hm=5d893f50eb9ee7f8442a52b392361b94d5057edc4c6a45c93bcc0f420a60309a&'
                    });
            }

            // Send the selected embed
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
