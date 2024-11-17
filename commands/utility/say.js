const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Sends a message as the bot.')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to send')
        .setRequired(true)),
  async execute(interaction) {
    const adminRoleId = '1304460108977143879'; 
    const logChannelId = '1304485095498977351';


    if (!interaction.member.roles.cache.has(adminRoleId)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const messageToSend = interaction.options.getString('message');

    
    await interaction.channel.send(messageToSend);


    const logChannel = await interaction.guild.channels.fetch(logChannelId);
    if (logChannel) {
      logChannel.send(`Message sent by ${interaction.user.tag}: ${messageToSend}
        Channel: <#${interaction.channel.id}>`);
    }

 
    await interaction.reply({ content: 'Message sent successfully!', ephemeral: true });
  },
};
