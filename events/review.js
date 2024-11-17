const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isModalSubmit() && interaction.customId === 'reviewModal') {
      const review = interaction.fields.getTextInputValue('reviewInput');
      const rate = interaction.fields.getTextInputValue('rateInput');

      
      const reviewEmbed = new EmbedBuilder()
        .setTitle('Review')
        .setImage("https://cdn.discordapp.com/attachments/1304492271529627668/1307713682058514493/Section_Designs_Customer_Review.png?ex=673b4ec5&is=6739fd45&hm=821dab21771fd5cbba330f2a9cf1d0c311272739e4e5204a5b22cdaa84f11064&")
        .setDescription(`Member: <@${interaction.user.id}>\n\nReview: ${review}\nRate: ${rate}`)
        .setColor('#4b5afa')
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({
          text: 'Section Designs',
          iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
        });

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
  }
};
