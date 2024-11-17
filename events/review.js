const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isModalSubmit() && interaction.customId === 'reviewModal') {
      const review = interaction.fields.getTextInputValue('reviewInput');
      const rate = interaction.fields.getTextInputValue('rateInput');
      const designer = interaction.fields.getTextInputValue('designerInput');

      // Embed for the customer review with updated structure
      const reviewEmbed = new EmbedBuilder()
        .setTitle('<:Sectiondesigns:1307714260691976202> Customer Review')
        .setDescription(
          `${interaction.user} **New Customer Review**\n\n` +
          `**Designer** <:Blank:1307718151848333364> **Customer Feedback**\n` +
          `${designer} <:Blank:1307718151848333364> ${rate}\n\n` +
          `**Feedback**\n${review}`
        )
        .setColor(3746291)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({
          text: 'Section Designs',
          iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
        })
        .setImage('https://media.discordapp.net/attachments/1261011896950329374/1307740141871304764/Section_Designs_Customer_Review.png?ex=673b676a&is=673a15ea&hm=5f6c8116bd3f288e9ae1016e39ad3268746ea7923ba3ceff79e817dc9083cee1&=&format=webp&quality=lossless');

      try {
        const reviewChannel = interaction.guild.channels.cache.get('1307709787886325770');
        if (!reviewChannel) {
          return interaction.reply({ content: 'Review channel not found!', ephemeral: true });
        }
        await reviewChannel.send({ embeds: [reviewEmbed] });

        await interaction.reply({ content: 'Review sent successfully!', ephemeral: true });
      } catch (error) {
        console.error('Error while sending review embed:', error);
        await interaction.reply({ content: 'There was an issue sending your review. Please try again later.', ephemeral: true });
      }
    }
  },
};
