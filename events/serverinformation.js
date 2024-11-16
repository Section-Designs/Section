const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;

        if (customId === 'server_information') {
            const selectedValue = values[0];
            let embed = null; // Initialize embed
            let embeds = null; // Initialize embeds array

            // Different ephemeral "Hi" messages for each option
            if (selectedValue === 'sw') {
                embed = new EmbedBuilder()
                    .setTitle(`Server Website`)
                    .setDescription(`**coming soon**`)
                    .setColor(`#4b5afa`)
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
            } else if (selectedValue === 'sil') {
                embed = new EmbedBuilder()
                    .setTitle(`Server Invite Link`)
                    .setDescription(`discord.gg/sectiondesigns`)
                    .setColor(`#4b5afa`)
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
            } else if (selectedValue === 'htgh') {
                embed = new EmbedBuilder()
                    .setTitle(`How to Apply for a Position at Section Designs`)
                    .setDescription(`
To express your interest in joining Section Designs, please follow these steps:

1. **Open a Ticket**: Begin by opening a ticket in the designated channel <#1307292117218885644>.
   
2. **Notify Us of Your Intent**: Once the ticket is open, kindly inform us of your desire to be hired by providing the relevant details.

**Please Note**: It is essential that candidates possess a solid understanding of Discord customizations, including the creation of bots and templates.

Thank you for your interest in becoming a part of Section Designs!
                    `)
                    .setColor(`#4b5afa`)
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
            } else if (selectedValue === 'si') {
                embeds = [
                    new EmbedBuilder()
                        .setTitle('Server Regulations')
                        .setColor(`#4b5afa`)
                        .setDescription(`Listed below are all the regulations of the server. If you have any questions or concerns, please contact the staff team.`),

                    new EmbedBuilder()
                        .setTitle('Rule 1: Respect Everyone')
                        .setColor(`#4b5afa`)
                        .setDescription(`Respect is the foundation of our community. Every member deserves to be treated with dignity and consideration, regardless of their background or opinions. Harassment, hate speech, or bullying will not be tolerated. We encourage open dialogue and differing viewpoints, but it’s essential to express disagreements respectfully.`),

                    new EmbedBuilder()
                        .setTitle('Rule 2: Age Requirement')
                        .setColor(`#4b5afa`)
                        .setDescription(`Members must be at least 13 years old to participate in the server. Any member found to be under the age requirement will be banned and may appeal their ban upon reaching the age requirement.`),

                    new EmbedBuilder()
                        .setTitle('Rule 3: No Spamming')
                        .setColor(`#4b5afa`)
                        .setDescription(`Maintaining a clean and organized communication environment is essential for fostering meaningful interactions. Members are expected to refrain from sending repetitive messages that do not contribute value to the discussion.`),

                    new EmbedBuilder()
                        .setTitle('Rule 4: No Advertising')
                        .setColor(`#4b5afa`)
                        .setDescription(`To maintain a focused environment, we prohibit all forms of advertising without explicit permission from the staff team. Unsolicited advertising can create distractions and undermine our community.`),

                    new EmbedBuilder()
                        .setTitle('Rule 5: Privacy Matters')
                        .setColor(`#4b5afa`)
                        .setDescription(`Respecting the privacy of all members is paramount. Safeguard your own privacy and do not share personal information without consent. Report any privacy violations to staff immediately.`),
                ];
            }

            // Reply based on whether single or multiple embeds are used
            if (embed) {
                await interaction.reply({ embeds: [embed], ephemeral: true });
            } else if (embeds) {
                await interaction.reply({ embeds, ephemeral: true });
            }
        }
    },
};
