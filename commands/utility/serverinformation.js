const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinformation')
        .setDefaultMemberPermissions(0)
        .setDescription('Displays the server rules and information'),
    async execute(interaction) {
        // Acknowledge the interaction immediately
        await interaction.deferReply({ ephemeral: true });

        const bannerURL = "https://media.discordapp.net/attachments/1261011896950329374/1307715185405853736/section_dashboard.png?format=webp&quality=lossless";
        const imageURL = "https://media.discordapp.net/attachments/1261011896950329374/1307702539457658991/Section_Designs.png?format=webp&quality=lossless";
        const channelid = interaction.channel.id;
        const targetChannelId = `${channelid}`;
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return await interaction.editReply({ content: 'Channel not found!', ephemeral: true });
        }

        // Embed 1
        const embed1 = new EmbedBuilder()
            .setColor(5841132)
            .setImage(bannerURL);

        // Embed 2 (with Support Desk removed)
        const embed2 = new EmbedBuilder()
            .setTitle('<:Sectiondesigns:1307714260691976202> Section Dashboard')
            .setDescription(
                `At **Section**, we pride ourselves on delivering exceptional creativity, premium quality, and professional designs. Our services include custom liveries, branding designing, bot developing, website designing, server setups, and clothing designs.\n\n` +
                `• Use this dashboard to access our Regulations, submit Applications, and engage with our Roblox Group.\n\n` +
                `<:linewhite:1307716962796834837> `.repeat(19) + `\n\n` +
                `<:Sectiondesigns:1307714260691976202>  \`Executive Team\` <:Blank:1307718151848333364><:Blank:1307718151848333364><:Blank:1307718151848333364><:Blank:1307718151848333364> ` +
                `<@1114487029925937232> <:Blank:1307718151848333364><:Blank:1307718151848333364><:Blank:1307718151848333364><:Blank:1307718151848333364>\n` +
                `<@803612750718697493>\n<@1132738644927582321>`
            )
            .setColor(5841132)
            .setImage(imageURL);

        // Select Menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('server_information')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Server Website',
                    description: 'The official Section Design website',
                    value: 'sw',
                },
                {
                    label: 'Server Invite Link',
                    description: 'The official Discord server invite',
                    value: 'sil',
                },
                {
                    label: 'How to get hired',
                    description: 'Learn how to join our team',
                    value: 'htgh',
                },
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send the embeds and components
        await targetChannel.send({ embeds: [embed1, embed2], components: [row] });

        // Confirm reply
        await interaction.editReply({ content: 'Server information has been sent to the channel.', ephemeral: true });
    },
};
