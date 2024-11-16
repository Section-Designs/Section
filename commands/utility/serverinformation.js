const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinformation')
        .setDefaultMemberPermissions(0)
        .setDescription('Displays the server rules and information'),
    async execute(interaction) {
        // Acknowledge the interaction immediately
        await interaction.deferReply({ ephemeral: true });

        const banner = "https://cdn.discordapp.com/attachments/1304862698596601946/1307290812345880688/sectionbanners.png?ex=6739c4f1&is=67387371&hm=99ac0eccad72fc2a16fd6113a7c3313887e0237d2f60adc9997cfded7fffa55c&"
        const targetChannelId = '1304460998824169512';
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return await interaction.editReply({ content: 'Channel not found!', ephemeral: true });
        }

        // Define each embed with detailed rules
      const embed1 = new EmbedBuilder()
            .setTitle('Section Designs')
            .setColor(`#4b5afa`)
            .setDescription(`Welcome to Section Designs Section Deisgns is a discord server made to deisgn your needed. Ranging from graphic designs all the way to web design. We hope you find our services useful and enjoyable. If you have any questions or concerns, please don't hesitate to reach out to us.`)

        const embed2 = new EmbedBuilder()
        .setDescription(`Section Designs own the offical Looter bot and the Botxeprts Bot. News about those 2 bots will be placed in this server and devloped by our devlopemnt team. Packages for the bot's will be included.`)
        .setColor(`#4b5afa`)
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
        // Create the select menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('server_information')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Server Information',
                    description: 'Information about the server',
                    value: 'si',
                },
                {
                    label: 'Server Website',
                    description: 'The offical Section Design website',
                    value: 'sw',
                },
                {
                    label: 'Server Invite Link',
                    description: 'The offical discord server invite',
                    value: 'sil',
                },
                {
                    label: 'How to get hired.',
                    description: 'How to get hired.',
                    value: 'htgh',
                }
            ]);

        // Create action row for the select menu
        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send all embeds and the select menu to the target channel
        await targetChannel.send({files: [banner], embeds: [embed1, embed2], components: [row] });

        // Acknowledge the command
        await interaction.editReply({ content: 'Server rules have been sent to the channel.', ephemeral: true });
    },
};
