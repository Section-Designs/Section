const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;

        if (customId === 'service') {
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
                    .setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});
            } else if (selectedValue === 'tc') {
                embed = new EmbedBuilder()
                    .setDescription(`
Before you start using our services, please read our Terms and Conditions carefully.

- We are committed to providing high-quality services to our clients. If our services do not meet your expectations, we can replace the service at no cost.
- We currently accept **Robux** payments only. More payment methods will be available in the future.
- We have a **30-day** refund policy. Refund requests made after 30 days will not be accepted.`)
.setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});
            } else if (selectedValue === 'cp') {
                embed = new EmbedBuilder()
                    .setDescription(`**coming soon**`)  
                    .setColor(`#4b5afa`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                    });
            } else if (selectedValue === 'lp') {
                embed = new EmbedBuilder()
                    .setDescription(`coming soon`)
                    .setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});
            }
            else if (selectedValue === 'gp') {
                embed = new EmbedBuilder()
                .setDescription(`The prices below are the prices for the graphics services.`)
                .setFields([
                    { name: 'Logo', value: '75', inline: true },
                    { name: 'Banner', value: '100', inline: true }, 
                ])
                .setColor(`#4b5afa`)
                .setFooter({ 
                    text: 'Section Designs',
                    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                });
            }

            // Send the selected embed
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
