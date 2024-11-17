const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('service')
        .setDefaultMemberPermissions(0)
        .setDescription('Display the services'),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        const targetChannelId = '1307293226322890766';
        const banner = "https://cdn.discordapp.com/attachments/1304492271529627668/1307293142004797520/2_1.png?ex=6739c71d&is=6738759d&hm=aad15ebc7eedc5a296c27d1e84cf6d0cb83e0db64f1f4f715f10081ae75b4485&"
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return await interaction.editReply({ content: 'Channel not found!', ephemeral: true });
        }


       const embed = new EmbedBuilder()
            .setTitle('Services')
            .setDescription(`Welcome to the Section Designs service section. This is where you can check all the information like pricing for **discord services**,**clothing pricing** etc. Ensure you have read the terms and conditions before making an order. We hope you find our services useful and enjoyable. If you have any questions or concerns, please don't hesitate to reach out to us.`)
            .setColor(`#4b5afa`)
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});

        // Create the select menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('service')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Terms and Conditions',
                    description: 'Terms and Conditions for ordering',
                    value: 'tc',
                },
                {
                    label: 'Discord Pricing',
                    description: 'Discord pricing',
                    value: 'dp',
                },
                {
                    label: 'Clothing Pricing',
                    description: 'Clothing pricing',
                    value: 'cp',
                },
                {
                    label: 'Livery Pricing',
                    description: 'Pricing for liveries',
                    value: 'lp',
                },
                {
                    label: 'Graphics Pricing',
                    description: 'Prices for graphics',
                    value: 'gp',
                }
            ]);

  
        const row = new ActionRowBuilder().addComponents(selectMenu);

       
        await targetChannel.send({files: [banner], embeds: [embed], components: [row] });

      
        await interaction.editReply({ content: 'Server rules have been sent to the channel.', ephemeral: true });
    },
};
