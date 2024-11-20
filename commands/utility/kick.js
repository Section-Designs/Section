const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking the user')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('proof')
                .setDescription('Proof or additional context for the kick')),

    async execute(interaction) {
        const allowedRoleIds = ['1304460108977143879']; // Role ID that can use this command
        const logChannelId = '1304485095498977351'; // Channel ID where kick logs will be sent

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

        const userToKick = interaction.options.getUser('user');
        const memberToKick = await interaction.guild.members.fetch(userToKick.id);
        const reason = interaction.options.getString('reason');
        const proof = interaction.options.getString('proof') || 'No proof provided.';

        // Check if the bot can kick the user
        if (!memberToKick.kickable) {
            const embed = new EmbedBuilder()
                .setDescription('⛔ I cannot kick this user. They may have a higher role or I lack permissions.')
                .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // Kick the user
        await memberToKick.kick(`${reason} (Kicked by ${interaction.user.tag})`)
            .then(async () => {
                // Log the kick in the specified channel
                const logChannel = interaction.guild.channels.cache.get(logChannelId);
                if (logChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle('User Kicked')
                        .setDescription(`✅ User <@${userToKick.id}> was kicked by <@${interaction.user.id}>.`)
                        .addFields(
                            { name: 'Reason', value: reason, inline: true },
                            { name: 'Proof', value: proof, inline: true }
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

                // Send DM to the kicked user
                try {
                    const dmEmbed = new EmbedBuilder()
                        .setTitle('Section Designs | Server Kicked')
                        .setDescription(`> You were kicked from **${interaction.guild.name}** by <@${interaction.user.id}>. for the following reasons.`)
                        .addFields(
                            { name: 'Reason', value: reason },
                            { name: 'Proof', value: proof }
                        )
                        .setColor('#ffcc5e')
                        .setFooter({
                            text: 'Section Designs',
                            iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                        });
                    await userToKick.send({ embeds: [dmEmbed] });
                } catch (err) {
                    console.error(`Could not send DM to <@${userToKick.id}>:`, err);
                }

                const successEmbed = new EmbedBuilder()
                    .setDescription(`<@${userToKick.id}> has been kicked.`)
                    .addFields(
                        { name: 'Reason', value: reason },
                        { name: 'Proof', value: proof }
                    )
                    .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
                await interaction.reply({ embeds: [successEmbed], ephemeral: true });
            })
            .catch(err => {
                console.error(err);
                const errorEmbed = new EmbedBuilder()
                    .setDescription('⛔ There was an error trying to kick this user.')
                    .setColor('#ffcc5e')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/emojis/1307714260691976202.webp?size=96'
                    });
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
    },
};