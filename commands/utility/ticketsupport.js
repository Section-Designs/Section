const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketsupport')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Open a ticket support dropdown.'),
  async execute(interaction) {
    const channelid = interaction.channel.id;

    const banner = "https://media.discordapp.net/attachments/1261011896950329374/1307746463958175846/server_support.png?ex=673b6d4d&is=673a1bcd&hm=afc41d4cc209ea728d78b8c36e840c9251009390ebc73bad48cee297bf5b6216&format=webp&quality=lossless&";

    await interaction.deferReply();

    const embed = new EmbedBuilder()  
    .setImage(banner)
    .setColor(3746291);

    // Embed for ticket creation with the information from JSON
    const embed2 = new EmbedBuilder()
      .setTitle('<:Sectiondesigns:1307714260691976202> Section Designs Support')
      .setDescription(
        `Before opening a ticket, ensure you have your reasons for opening it. The ticket will be deleted after 24 hours of inactivity. Ensure you pick the right ticket selection. Failing to do so may result in a server ban.\n\n` +
        `Trolling tickets are not allowed. Please wait for our team to respond to your ticket.`
      )
      .setColor(3746291)
      .setFooter({
        text: 'Section Designs',
        iconURL: 'https://media.discordapp.net/attachments/1261011896950329374/1307747679526457394/Section_designs_new_logo.webp?ex=673b6e6f&is=673a1cef&hm=23dd6402c591783e567db45dab2867a2b59c45587995fcd5674dd06122ca1c68&=&format=webp&width=640&height=640'
      })
      .setImage("https://media.discordapp.net/attachments/1261011896950329374/1307742871138336818/Section_Designs.png?ex=673b69f5&is=673a1875&hm=8d11e95dbdd9d58cef49f80eb27ca551c456eca6110eebb818c0a21cb2298e73&=&format=webp&quality=lossless");

    // Dropdown menu for ticket options
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

    // Send the embed and dropdown to the support channel
    const supportChannel = interaction.guild.channels.cache.get(`${channelid}`);
    if (supportChannel) {
      await supportChannel.send({embeds: [embed, embed2], components: [row] });
      await interaction.followUp({ content: 'The support ticket options have been sent.', ephemeral: true });
    } else {
      await interaction.followUp({ content: 'Unable to find the support channel.', ephemeral: true });
    }
  },
};
