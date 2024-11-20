const { SlashCommandBuilder, PermissionsBitField } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Give a user a role.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to give the role to.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to give to the user.')
        .setRequired(true)),
  async execute(interaction) {
    const guild = interaction.guild;
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    const member = guild.members.cache.get(interaction.options.getUser('user').id);
    const role = interaction.options.getRole('role');

    try {
      await member.roles.add(role);
      await interaction.reply(`The role ${role.name} has been added to ${member.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error giving the role.');
    }
  },
};
