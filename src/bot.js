// Import necessary modules and libraries
import 'dotenv/config';
import { Partials, Client, GatewayIntentBits, Events, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { REST } from '@discordjs/rest';
import fetch from 'node-fetch';

const TOKEN = '';
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = '997820362446340096';


// Create a new Discord client instance
const client = new Client({
    partials: [Partials.Channel, Partials.Message],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessageTyping
    ]
});

// Log in to Discord using the provided BOT_TOKEN


// Event handler for when the bot is ready
client.on(Events.ClientReady, () => {
    console.log(`${client.user.username} is online!`);
});

// Event handler for when an interaction is created
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Handle the 'car-count' command
    if (interaction.commandName === 'car-count') {
        await interaction.reply('Submit vehicle list');

        // Create a message collector to wait for user input
        const filter = (message) => message.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({
            filter,
            time: 15000,
        });

        collector.on('collect', async (message) => {
            if (message.attachments.size > 0) {
                try {
                    message.channel.send("Readin' da file! Fetchin' da data...");

                    // Fetch the content of the file
                    const url = message.attachments.first().url;
                    const response = await fetch(url);

                    // Check if the fetch was successful
                    if (!response.ok) {
                        return message.channel.send(`Shit! There was an error wif fetching da file: ${response.statusText}`);
                    }

                    // Read and process the file content
                    const fileContent = await response.text();
                    carCount(fileContent, message);
                } catch (error) {
                    console.error(error);
                }
            } else {
                carCount(message.content, message);
            }
            collector.stop();
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.followUp('No? Ok, Let\'s try this later!');
            }
        });
    }

    // Handle other specific commands
    handleSpecificCommands(interaction);
});

// Event handler for when a message is created
client.on(Events.MessageCreate, async (message) => {
    // Respond to 'beep' and '!sendpack' messages
    handleBeepAndSendPackMessages(message);
});

// Function to handle specific commands
const handleSpecificCommands = async (interaction) => {
    const { options } = interaction;

    // Check for specific commands and extract options
    const commandsWithOptions = [
        'send-admin_packs',
        'send-admin-cash_packs',
        'send-admin-cleanup_packs',
        'send-admin-vehicle_packs',
        'send-admin-votes_packs',
        'send-donator_pack',
        'send-event_pack',
        'send-food_pack',
        'send-lottery_pack',
        'send-lottery2_pack',
        'send-mazeevent_pack',
        'send-meds_pack',
        'send-purge_pack',
        'send-purist_pack',
        'send-streamers_pack',
        'send-survivalgear_pack',
        'send-tools_pack',
        'send-unlistedpacks_pack',
        'send-vehicles_pack',
        'send-weapons_pack'
    ];

    // Check if the command with options includes the current commandName
    if (commandsWithOptions.includes(interaction.commandName)) {
        // Retrieve the 'packname' and 'discord-id' options from the interaction
        const packName = options.getString('packname');
        const discordID = options.getString('discord-id');
        // Initialize a variable to check if the user has a role (default to false)
        let hasRole = false;

        // Check if the user with the specified discordID exists in the client's cache
        hasRole = !!client.users.cache.get(discordID);

        // Determine the username based on whether the user has a role
        //const username = hasRole ? user.username : 'Unknown User';

        // Log information about the command and its parameters
        console.log(`!sendpack ${packName} ${discordID}`); //to ${username}

        // Ensure that the interaction is replied or deferred
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply(); // Defer the reply if not deferred or replied
        }

        // Check if the channel name is 'outhouse'
        const channelName = '🗑outhouse🗑'//process.env.CHANNEL_NAME;
        const channelID = '1041166373801443449'//process.env.CHANNEL_ID;
        // Find the 'outhouse' channel in the guild's channels cache
        const outhouseChannel = interaction.guild.channels.cache.find((channel) => channel.name === channelName);

        if (outhouseChannel) {
            // Send the message to the 'outhouse' channel
            console.log('Send the message to the outhouse channel');
            outhouseChannel.send(`!sendpack ${packName} ${discordID}`);// to ${username}
            interaction.followUp(`Message sent to #${channelName} channel.`);
        } else {
            // Notify if the 'outhouse' channel is not found
            console.log('Notify if the outhouse channel is not found');
            interaction.followUp(`Error: Channel #${channelName} - ${channelID} is not found.`);
        }
    }
}

// Function to handle 'beep' messages
function handleBeepAndSendPackMessages(message) {
    if (message.content.toLowerCase() === 'beep') {
        // Reply with the initial message
        message.reply('boop');
    }
}

// Function to count cars from input content
async function carCount(content, interaction) {
    const inputString = content.trim();
    const bpcData = {};
    let counts = '';
    let totalCount = 0;
    const lines = inputString.split('\n');

    // Parse each line of the message content
    lines.forEach((line) => {
        if (!line.toLowerCase().includes('vehicle')) {
            const cells = line.split(/\s+/).filter(Boolean);
            const bpcType = cells[1];
            bpcData[bpcType] = bpcData[bpcType] || [];
            bpcData[bpcType].push(cells);
            totalCount++;
        }
    });

    // Calculate counts and reply to the interaction
    for (const bpcType in bpcData) {
        if (Object.prototype.hasOwnProperty.call(bpcData, bpcType)) {
            counts += `${bpcType}: ${bpcData[bpcType].length}\r`;
        }
    }
    counts += `Total Count: ${totalCount}\r`;
    interaction.reply(counts);
}
const WBAuth = 'WhalleyBotAPI_F935H3ucUJRv7g=='; //'WhalleyBotAPI_rtTECwgxKLKy9Q==',
const commands = [];
const ROLES = {
    'Popup-Role': '1277276501657780255',
    'BattleArena-Role': '1277357888112955513',
    'Sniper-Role': '1277358016965906543',
    'DogFight-Role': '1277361218545389580',
    'Maze-Role': '1277361306101354516',
};

client.on('ready', async () => {
    console.log('Bot is ready');

    const popupeventChannel = client.channels.cache.get('1277296646392119368');
    const snipereventChannel = client.channels.cache.get('1277361700072587325');

    await popupeventChannel.bulkDelete(100);
    await snipereventChannel.bulkDelete(100);


    popupeventChannel.send({
        content: 'Which event are you joining?',
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('BattleArena-Role')
                    .setLabel('Battle Arena')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('Sniper-Role')
                    .setLabel('Sniper Duels')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('DogFight-Role')
                    .setLabel('DogFight')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('Maze-Role')
                    .setLabel('Maze')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
            ),
        ],
    });

    snipereventChannel.send({
        content: 'Welcome to the Sniper Event',
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('NorthTower')
                    .setLabel('North Tower')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('SouthTower')
                    .setLabel('South Tower')
                    .setStyle(ButtonStyle.Primary),
            ),
        ],
    });
});

const discordID = interaction.user;

const response = await fetch(`https://api.whalleybot.com/bot/7ac35e92/GetPlayer/${discordID}`, {
    method: 'GET',
    headers: {
        Accept: '*/*',
        Authorization: WBAuth,
    },
});


console.log('response: ' + response)


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;
    console.log('discordID: ' + interaction.user)

    //const playerID = '76561198187036603';



    if (['NorthTower', 'SouthTower'].includes(interaction.customId)) {
        const coordinates = {
            NorthTower: { x: -425787.438, y: -174352.500, z: 32479.682 },
            SouthTower: { x: -423322.781, y: -198883.219, z: 31299.994 },
        };

        const { x, y, z } = coordinates[interaction.customId];
        const encodedMessage = encodeURIComponent(`#teleport ${x} ${y} ${z} ${playerID}`);

        try {
            const response = await fetch(`https://api.whalleybot.com/bot/7ac35e92/GlobalMessage/Send?message=${encodedMessage}`, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    Authorization: WBAuth,
                },
            });

            if (response.ok) {
                await interaction.reply({ content: `${interaction.user} is being teleported and is shooting for the ${interaction.customId === 'NorthTower' ? 'North' : 'South'} Tower!` });
            } else {
                await interaction.reply({ content: 'Failed to send the message.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'There was an error sending the message.', ephemeral: true });
        }
    } else if (interaction.customId.endsWith('-Role')) {
        const role = interaction.guild.roles.cache.get(ROLES[interaction.customId]);

        if (!role) {
            return interaction.reply({ content: 'Role not found', ephemeral: true });
        }

        const hasRole = interaction.member.roles.cache.has(role.id);

        try {
            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.reply({ content: `The ${role.name} role was removed from you.`, ephemeral: true });
            } else {
                await interaction.member.roles.add(role);
                await interaction.reply({ content: `The ${role.name} role was added to you.`, ephemeral: true });
            }
        } catch (err) {
            console.log(err);
            await interaction.reply({ content: `Something went wrong. The ${role.name} role could not be modified.`, ephemeral: true });
        }
    }
});

async function main() {
    try {
        await client.login(TOKEN);
        console.log('Bot logged in successfully.');
    } catch (err) {
        console.log('Error logging in:', err);
    }
}

main();
