const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, Permissions, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketsupport')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Open a ticket support dropdown.'),
  async execute(interaction) {

    const banner = "https://cdn.discordapp.com/attachments/1304492271529627668/1307294158192377896/2_2.png?ex=6739c80f&is=6738768f&hm=d07a6f9770e267ffb327ca24ff9245adbe9aca49e4d61d1606f456897dd92950&"

    await interaction.deferReply(); 

  
    const embed = new EmbedBuilder()
      .setTitle('Ticket Creation')
      .setDescription(`> Before opening a ticket ensure you have your reasons for opening the ticket. The ticket will be deleted after 24 hours of inactivity. Ensure you pick the right ticket selection. Failing to do so would result in a server ban.
        
        > Trolling tickets are not allowed. Please wait for our team to respond to your ticket.`)
      .setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});

    // Create the dropdown menu
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('supportOptions')
          .setPlaceholder('Select an option')
          .addOptions([
            {
              label: 'Support Ticket',
              description: `Open a support ticket`,
              value: 'st',
            },
            {
              label: 'Product purchase',
              description: 'Purchase a product',
              value: 'bp',
            },
          ])
      );

 
    const supportChannel = interaction.guild.channels.cache.get('1307292117218885644');
    if (supportChannel) {
      await supportChannel.send({ files: [banner], embeds: [embed], components: [row] });
      await interaction.followUp({ content: 'The support ticket options have been sent.', ephemeral: true });
    } else {
      await interaction.followUp({ content: 'Unable to find the support channel.', ephemeral: true });
    }
  },
};
