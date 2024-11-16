const { Events, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isModalSubmit() && interaction.customId === 'embedModal') {
            const title = interaction.fields.getTextInputValue('embedTitle');
            const description = interaction.fields.getTextInputValue('embedDescription');

            // Create the embed
            const embed = new EmbedBuilder()
                .setDescription(description)
                setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});

            // Set title only if provided
            if (title) {
                embed.setTitle(title);
            }

            // Send the embed to the channel where the command was used
            await interaction.channel.send({ embeds: [embed] });

            // Reply to the interaction
            await interaction.reply({ content: 'Embed sent successfully!', ephemeral: true });
        }
    },
};
