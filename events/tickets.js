const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const logChannelId = '1304485095498977351'; 
                const banner = "https://media.discordapp.net/attachments/1261011896950329374/1308372520130580491/Section_Designs_Customer_Review_1.png?ex=673db45d&is=673c62dd&hm=5d4e38e0e9824554608b5b74de3fd93f8d9f03b5b4eee4a390a4bd11ba1d2dff&=&format=webp&quality=lossless"
                const productbanner = "https://media.discordapp.net/attachments/1261011896950329374/1308377340811808810/Section_Designs_Customer_Review_2.png?ex=673db8da&is=673c675a&hm=e8d7dbc3a7e00c778b6e457227ae06ac3dd731da28519562531ff8ef956b9591&=&format=webp&quality=lossless"
      
        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'supportOptions') {
                const selectedValue = interaction.values[0];

                if (selectedValue === 'st') {
                    const modal = new ModalBuilder()
                        .setCustomId('ticketReasonModal')
                        .setTitle('Ticket Reason');

                    const reasonInput = new TextInputBuilder()
                        .setCustomId('reasonInput')
                        .setLabel('Reason for the ticket')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Type your reason here...')
                        .setRequired(true);

                    const row = new ActionRowBuilder().addComponents(reasonInput);
                    modal.addComponents(row);

                    await interaction.showModal(modal);
                    return;
                }

                if (selectedValue === 'bp') {
                    const modal = new ModalBuilder()
                        .setCustomId('bpModal')
                        .setTitle('Product Purchase');

                    const memberInput = new TextInputBuilder()
                        .setCustomId('memberInput')
                        .setLabel('Needed')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('bots,logos,etc')
                        .setRequired(true);

                    const reasonInput = new TextInputBuilder()
                        .setCustomId('reasonInput')
                        .setLabel('When needed')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('11/8/2024')
                        .setRequired(true);

                    const proofInput = new TextInputBuilder()
                        .setCustomId('proofInput')
                        .setLabel('Notes')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('info etc')
                        .setRequired(false);

                    const row1 = new ActionRowBuilder().addComponents(memberInput);
                    const row2 = new ActionRowBuilder().addComponents(reasonInput);
                    const row3 = new ActionRowBuilder().addComponents(proofInput);
                    
                    modal.addComponents(row1, row2, row3);

                    await interaction.showModal(modal);
                    return;
                }
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'bpModal') {
                const member = interaction.fields.getTextInputValue('memberInput');
                const reason = interaction.fields.getTextInputValue('reasonInput');
                const proof = interaction.fields.getTextInputValue('proofInput');

                await interaction.deferReply({ ephemeral: true });

                const purchaseChannel = await interaction.guild.channels.create({
                    name: `purchase-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: '1304460559751581800',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                });

                const purchaseembedbanner = new EmbedBuilder()  
                .setImage(productbanner)
                .setColor(3746291);

                const purchaseEmbed = new EmbedBuilder()
                    .setTitle('<:Sectiondesigns:1307714260691976202> Section Designs Product Purchase')
                    .setDescription(`<a:waving:1307516449887223850> Hi <@${interaction.user.id}>, welcome to your new product purchase ticket. Please wait for a designer to come and claim your ticket. Make sure\nto read our terms of conditions in <#1307293226322890766>!!`)
                    .setFields([
                        { name: 'Needed', value: member },

                        { name: 'When Needed', value: reason },

                        { name: 'Notes', value: proof },
                    ])
                    .setColor(`#4b5afa`)
.setImage("https://media.discordapp.net/attachments/1261011896950329374/1307742871138336818/Section_Designs.png?ex=673d6435&is=673c12b5&hm=b298d727c32c03a139ffef3a22d9e8b52dc883bca8e5978ce4cf41892429c0d7&=&format=webp&quality=lossless")
.setFooter({ 
    text: 'Section Designs',
    iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
});

                const purchaseCloseButton = new ButtonBuilder()
                    .setCustomId('closePurchaseTicket')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger);

                await purchaseChannel.send({ content: `<@${interaction.user.id}>, <@&1304460559751581800>`, embeds: [purchaseembedbanner, purchaseEmbed], components: [new ActionRowBuilder().addComponents(purchaseCloseButton)] });

              
                const logChannel = interaction.guild.channels.cache.get(logChannelId);
                if (logChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle('Ticket Opened')
                        .setDescription(`A new member report ticket has been open by <@${interaction.user.id}> in <#${purchaseChannel.id}>.\n**Member Reporting:** ${member}\n**Reason:** ${reason}`)
                        .setColor(`#4b5afa`)
                        .setFooter({ 
                            text: 'Section Designs',
                            iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                        });
                    await logChannel.send({ embeds: [logEmbed] });
                }

                await interaction.editReply({ content: 'Your ticket has been opened at <#' + purchaseChannel.id + '>.', ephemeral: true });
                return;
            }

            if (interaction.customId === 'ticketReasonModal') {
                const reason = interaction.fields.getTextInputValue('reasonInput');
                const ticketopener = interaction.user.id;

                await interaction.deferReply({ ephemeral: true });

                const supportChannel = await interaction.guild.channels.create({
                    name: `support-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: '1304460386002796564',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                });
                const supportembedbanner = new EmbedBuilder()  
                .setImage(banner)
                .setColor(3746291);

                const supportEmbed = new EmbedBuilder()
                    .setTitle('<:Sectiondesigns:1307714260691976202> Section Designs Support Ticket')
                    .setDescription(`<a:waving:1307516449887223850> Hi <@${interaction.user.id}>, Welcome to Section Designs Support! \nKindly review our brief guidelines below to ensure your ticket is handled as smoothly as possible.`)
                    .setFields([
                        { name: 'Reason', value: reason },

                        {name: 'TicketOpener', value: ticketopener },
                    ])
                    .setImage("https://media.discordapp.net/attachments/1261011896950329374/1307742871138336818/Section_Designs.png?ex=673d6435&is=673c12b5&hm=b298d727c32c03a139ffef3a22d9e8b52dc883bca8e5978ce4cf41892429c0d7&=&format=webp&quality=lossless")
                    .setColor(`#4b5afa`)
                        .setFooter({ 
                            text: 'Section Designs',
                            iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                        });
                const supportCloseButton = new ButtonBuilder()
                    .setCustomId('closeTicket')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger);

                await supportChannel.send({ content: `<@${interaction.user.id}>`, embeds: [supportembedbanner, supportEmbed], components: [new ActionRowBuilder().addComponents(supportCloseButton)] });

             
                const logChannel = interaction.guild.channels.cache.get(logChannelId);
                if (logChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle('Ticket Opened')
                        .setDescription(`A new support ticket has been opened by <@${interaction.user.id}> in <#${supportChannel.id}>.\n**Reason:** ${reason}`)
                        .setColor(`#4b5afa`)
                        .setFooter({ 
                            text: 'Section Designs',
                            iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                        });

                    await logChannel.send({ embeds: [logEmbed] });
                }

                await interaction.editReply({ content: 'Your support ticket has been opened at <#' + supportChannel.id + '>!', ephemeral: true });
                return;
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'closeTicket' || interaction.customId === 'closePurchaseTicket') {
                const confirmationEmbed = new EmbedBuilder()
                    .setTitle('Close Ticket')
                    .setDescription('Are you sure you want to close this ticket? This action cannot be undone.')
                    .setColor(`#4b5afa`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                    });
                    
                    

                const finalCloseButton = new ButtonBuilder()
                    .setCustomId('confirmClose')
                    .setLabel('Confirm Close')
                    .setStyle(ButtonStyle.Secondary);

                await interaction.reply({ embeds: [confirmationEmbed], components: [new ActionRowBuilder().addComponents(finalCloseButton)], ephemeral: true });
                return;
            }

            if (interaction.customId === 'confirmClose') {
                const closingEmbed = new EmbedBuilder()
                    .setDescription('The ticket will close in 5 seconds.')
                    .setColor(`#4b5afa`)
                    .setFooter({ 
                        text: 'Section Designs',
                        iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                    });
            
                await interaction.reply({ embeds: [closingEmbed], ephemeral: true });
            
 
                await new Promise(resolve => setTimeout(resolve, 5000));
            
                const ticketChannel = interaction.channel;

                const transcriptAttachment = await discordTranscripts.createTranscript(ticketChannel, {
                    limit: 20000000, // Fetch all messages
                    returnType: 'attachment', // Return type can be 'buffer' | 'string' | 'attachment'
                    filename: 'transcript.html', // Name of the attachment
                    saveImages: true, // Set to true to include images
                    saveAudio: true, // Set to true to include audio
                    saveVideos: true, // Set to true to include videos
                    saveFiles: true, // Set to true to include files
                    saveReactions: true, // Set to true to include reactions
                    saveInvites: true, // Set to true to include invites
                    saveStickers: true, // Set to true to include stickers
                    saveEmbeds: true, // Set to true to include embeds
                    poweredBy: false, // Include the "Powered by discord-html-transcripts" footer
                    hydrate: true, // Hydrate the HTML server-side
                    filter: (message) => {
                        console.log(`Message fetched: ${message.content}`); // Debug log for messages
                        return true;
                    }
                });
            
                const ticketOwner = interaction.user;
            

                const closeEmbed = new EmbedBuilder()
                    .setTitle('Ticket Closed')
                    .setDescription(`> Hello <@${ticketOwner.id}>, your ticket has been closed. Please find below the information and above the transcript.
                        
                        **Open Time:** ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
            
            > If you have any further questions, please feel free to open a new ticket.`)
            .setColor(`#4b5afa`)
            .setFooter({ 
                text: 'Section Designs',
                iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
            });
            
             
                await ticketOwner.send({ embeds: [closeEmbed], files: [transcriptAttachment] }).catch(err => console.error("Failed to send DM: ", err));
            
       
                await ticketChannel.send('This ticket has been closed.');
                await ticketChannel.delete();
            
            
                const logChannel = interaction.guild.channels.cache.get(logChannelId);
                if (logChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle('Ticket Closed')
                        .setDescription(`> Ticket has been successfully closed. Please find below the information and above the transcript.`)
                        .setFields([
                            { name: 'Ticket Channel', value: `<#${ticketChannel.id}>` },
                            { name: 'Ticket Owner', value: `<@${ticketOwner.id}>` },
                            { name: 'Open Date', value: `${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}` }
                        ])
                        .setColor(`#4b5afa`)
                        .setFooter({ 
                            text: 'Section Designs',
                            iconURL: 'https://cdn.discordapp.com/icons/1304459131083554826/738867c4f3670f6d91146927dbbbe81b.png?size=4096'
                        });
            
                    await logChannel.send({ embeds: [logEmbed], files: [transcriptAttachment] });
                }
                return;
            }
        }
    }
}            
