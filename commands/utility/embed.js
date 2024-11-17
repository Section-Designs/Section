const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendembed')
        .setDescription('Send an embed message to the current channel.'),
    async execute(interaction) {
      
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }


        const modal = new ModalBuilder()
            .setCustomId('embedModal')
            .setTitle('Send Embed');

   

        const descriptionInput = new TextInputBuilder()
            .setCustomId('embedDescription')
            .setLabel('Embed Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const titleInput = new TextInputBuilder()
            .setCustomId('embedTitle')
            .setLabel('Embed Title')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

 
        const row1 = new ActionRowBuilder().addComponents(descriptionInput);
        const row2 = new ActionRowBuilder().addComponents(titleInput);

        
        modal.addComponents(row1, row2);


        await interaction.showModal(modal);
    },
};
