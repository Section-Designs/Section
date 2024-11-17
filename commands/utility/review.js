const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('review')
    .setDescription('Post a review about your section designs order'),

  async execute(interaction) {
    try {
    
      const modal = new ModalBuilder()
        .setCustomId('reviewModal')
        .setTitle('Review');

   
      const reviewInput = new TextInputBuilder()
        .setCustomId('reviewInput')
        .setLabel('Review')
        .setPlaceholder('Type your review here...')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(2000);

      const rateInput = new TextInputBuilder()
        .setCustomId('rateInput')
        .setLabel('Rate')
        .setPlaceholder('0/10')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(5); 

     
      const row1 = new ActionRowBuilder().addComponents(reviewInput);
      const row2 = new ActionRowBuilder().addComponents(rateInput);

    
      modal.addComponents(row1, row2);

    
      await interaction.showModal(modal);
    } catch (error) {
      console.error('Error executing review command:', error);
    }
  }
};
