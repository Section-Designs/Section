const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('service')
        .setDefaultMemberPermissions(0)
        .setDescription('Display the services'),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        const targetChannelId = '1307293226322890766';
        const banner = "https://media.discordapp.net/attachments/1261011896950329374/1307765167798620170/services_updated.png?ex=673cd039&is=673b7eb9&hm=fca40c7e77e3cfe66b4a761d8f935ce3a75762e7b235740ba4a19471f84c5108&=&format=webp&quality=lossless"
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return await interaction.editReply({ content: 'Channel not found!', ephemeral: true });
        }

        const embed = new EmbedBuilder()  
        .setImage(banner)
        .setColor(3746291);

       const embed2 = new EmbedBuilder()
            .setTitle('Services')
            .setDescription(`Welcome to the Section Designs service section. This is where you can check all the information like pricing for **discord services, clothing pricing etc.** \n\n<:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837><:linewhite:1307716962796834837>\n\nEnsure you have read the terms and conditions before making an order. We hope you find our services useful and enjoyable. If you have any questions or concerns, please don't hesitate to reach out to us.`)
            .setColor(3746291)
.    setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
})
.setImage("https://media.discordapp.net/attachments/1261011896950329374/1307742871138336818/Section_Designs.png?ex=673b69f5&is=673a1875&hm=8d11e95dbdd9d58cef49f80eb27ca551c456eca6110eebb818c0a21cb2298e73&=&format=webp&quality=lossless");

        // Create the select menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('service')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Terms Of Conditions',
                    description: 'Get the terms of conditions for the services',
                    value: 'tc',
                },
                {
                    label: 'Service Prices',
                    description: 'Get the service prices',
                    value: 'sp',
                }
            ]);

  
        const row = new ActionRowBuilder().addComponents(selectMenu);

       
        await targetChannel.send({embeds: [embed, embed2], components: [row] });

      
        await interaction.editReply({ content: 'Server rules have been sent to the channel.', ephemeral: true });
    },
};
