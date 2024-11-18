const { EmbedBuilder } = require('discord.js');

const banner = "https://media.discordapp.net/attachments/1261011896950329374/1307771087026655333/Section_Designs_Customer_Review.png?ex=673cd5bc&is=673b843c&hm=13eb0be3ceaebbdfef36d802ffd4ea9a067093778db03441b51dee7b79bc7811&=&format=webp&quality=lossless";
const banner2 = "https://media.discordapp.net/attachments/1261011896950329374/1307777494325268581/Section_Designs_Customer_Review_1.png?ex=673cdbb3&is=673b8a33&hm=a4bffbd8f9d56baee51a9b3d3d6e8253af71a178f37bc26cd9ddb76d82bba29a&=&format=webp&quality=lossless";

// Define reusable embeds
const embedtc = new EmbedBuilder()
    .setImage(banner)
    .setColor(3746291);

const embedservices = new EmbedBuilder()
    .setImage(banner2)
    .setColor(3746291);

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;

        if (customId === 'service') {
            const selectedValue = values[0];
            let embed;

            // Different embeds for each option
            if (selectedValue === 'dp') {
                embed = new EmbedBuilder()
                    .setDescription(`The prices below are the prices for the discord services.`)
                    .setFields([
                        { name: 'Bot', value: '200', inline: true },
                        { name: 'Emojis', value: '100', inline: true },
                        { name: 'Template', value: '300', inline: true },
                        { name: 'Embeds', value: '400', inline: true },
                    ])
                    .setColor('#4b5afa')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
                // Reply with only the main embed
                await interaction.reply({ embeds: [embed], ephemeral: true });
            } else if (selectedValue === 'tc') {
                embed = new EmbedBuilder()
                    .setDescription(`<:shop_blurple:1304661054865018930> - Payments\nYou Are Required To Pay After Your Order Has Been Completed \nAnd You Are Happy With The Design, If You Dont Like The Result Of The \nProduct, You Are Able To Request A New Designer. If You Abuse This You \nWill Be Banned And Blacklisted From Our Server And Connected Servers. \nOrders Above 1250 Robux Must Be Payed With A 50% Down Payment.\n\n<:moneybag:1307770497781469194> - Reselling & Stealing\nReselling Items Is Against Our TOS, Reselling A Asset Will Result In A \nBan From Our Services And Connected Services/Servers. Stealing Official \nSection Designs Assets Will Result In The Same Punishment.\n\n<:white_pin:1307770112870453289> - Clear Design Choices\nWhen Requesting A Design, Clearly State What You Would Like The Design \nTo Look Like, This Will Prevent Our Designers Have To Remake Your service.`)
                    .setColor('#4b5afa')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
                // Reply with embedtc and the main embed
                await interaction.reply({ embeds: [embedtc, embed], ephemeral: true });
            } else if (selectedValue === 'sp') {
                embed = new EmbedBuilder()
                    .setDescription(`**Graphics**<:Blank:1307718151848333364><:Blank:1307718151848333364>**Liveries**<:Blank:1307718151848333364><:Blank:1307718151848333364>**Clothing**<:Blank:1307718151848333364><:Blank:1307718151848333364> **Photography**\n<:robux:1307772783215906827> 70+<:Blank:1307718151848333364><:Blank:1307718151848333364> <:robux:1307772783215906827> 150+<:Blank:1307718151848333364><:Blank:1307718151848333364> <:robux:1307772783215906827> 100+<:Blank:1307718151848333364> <:Blank:1307718151848333364> <:robux:1307772783215906827>40+\n<a:Card:1307772782154616933>£0.70<:Blank:1307718151848333364><:Blank:1307718151848333364><a:Card:1307772782154616933>£1.50<:Blank:1307718151848333364><:Blank:1307718151848333364><a:Card:1307772782154616933>£1.00<:Blank:1307718151848333364><:Blank:1307718151848333364>  <a:Card:1307772782154616933>£0.40\n\n**Server Setup**<:Blank:1307718151848333364>**Embeds**<:Blank:1307718151848333364> **Server Branding**<:Blank:1307718151848333364> **Bot Development**\n<:robux:1307772783215906827> 200+<:Blank:1307718151848333364><:Blank:1307718151848333364> <:robux:1307772783215906827>50+<:Blank:1307718151848333364><:Blank:1307718151848333364><:robux:1307772783215906827>300+<:Blank:1307718151848333364><:Blank:1307718151848333364><:Blank:1307718151848333364> <:robux:1307772783215906827> 400+\n<a:Card:1307772782154616933>£2.00<:Blank:1307718151848333364><:Blank:1307718151848333364> <a:Card:1307772782154616933>£0.50<:Blank:1307718151848333364> <a:Card:1307772782154616933>£3.00<:Blank:1307718151848333364> <:Blank:1307718151848333364> <:Blank:1307718151848333364><a:Card:1307772782154616933>£4.00\n\n**Website Development**\n<:robux:1307772783215906827> 3000+\n<a:Card:1307772782154616933> £20.00`)
                    .setColor('#4b5afa')
                    .setFooter({
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096',
                    });
                // Reply with embedservices and the main embed
                await interaction.reply({ embeds: [embedservices, embed], ephemeral: true });
            }
        }
    },
};
