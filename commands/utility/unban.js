const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server.')
        .addStringOption(option =>
            option.setName('user_id')
                .setDescription('The ID of the user to unban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for unbanning the user')
                .setRequired(true)),

    async execute(interaction) {
        const allowedRoleIds = ['1304460108977143879']; // Role ID that can use this command
        const logChannelId = '1304485095498977351'; // Channel ID where unban logs will be sent

        const hasAllowedRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

        // Check if the user has permission to use the command
        if (!hasAllowedRole) {
            const embed = new EmbedBuilder()
                .setDescription('⛔ You do not have permission to use this command.')
                .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const userId = interaction.options.getString('user_id');
        const reason = interaction.options.getString('reason');

        // Attempt to unban the user
        try {
            await interaction.guild.bans.remove(userId, reason);

            // Log the unban in the specified channel
            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle('User Unbanned')
                    .setDescription(`✅ User <@${userId}> has been unbanned by <@${interaction.user.id}>.`)
                    .addFields(
                        { name: 'Reason', value: reason, inline: true }
                    )
                    .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
                await logChannel.send({ embeds: [logEmbed] });
            } else {
                console.error('Log channel not found.');
            }

            const successEmbed = new EmbedBuilder()
                .setDescription(`<@${userId}> has been unbanned.`)
                .addFields(
                    { name: 'Reason', value: reason }
                )
                .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });to
            await interaction.reply({ embeds: [successEmbed], ephemeral: true });

        } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
                .setDescription('⛔ There was an error trying to unban this user.')
                .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};