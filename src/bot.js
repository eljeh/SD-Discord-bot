// Import necessary modules and libraries
import 'dotenv/config';
import { Partials, Client, GatewayIntentBits, Events } from 'discord.js';
import fetch from 'node-fetch';

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
client.login(process.env.BOT_TOKEN);

// Event handler for when the bot is ready
client.on(Events.ClientReady, () => {
    console.log(`${client.user.username} is online!`);
});

// Event handler for when an interaction is created
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Handle the 'car-count' command
    if (interaction.commandName === 'car-count') {
        await interaction.reply('Please submit a list.');

        // Create a message collector to wait for user input
        const filter = (message) => message.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({
            filter,
            time: 15000,
        });

        collector.on('collect', async (message) => {
            if (message.attachments.size > 0) {
                try {
                    message.channel.send('Reading the file! Fetching data...');

                    // Fetch the content of the file
                    const url = message.attachments.first().url;
                    const response = await fetch(url);

                    // Check if the fetch was successful
                    if (!response.ok) {
                        return message.channel.send(`There was an error with fetching the file: ${response.statusText}`);
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
        'send-lottery_pack',
        'send-lottery_packs2',
        'send-tools_packs',
        'send-materials_packs',
        'send-weapons_packs',
        'send-vehicle_packs',
        'send-survivalgear_packs',
        'send-meds_packs',
        'send-food_packs',
        'send-daily_packs',
        'send-crafting-adminsonly',
        'send-bigspender',
        'send-raid_packs',
        'send-vote_packs',
        'send-admin_packs'
    ];


    if (commandsWithOptions.includes(interaction.commandName)) {
        const packName = options.getString('packname');
        const discordID = options.getString('discord-id');

        console.log(`!sendpack ${packName} ${discordID}`);

        // Ensure that the interaction is replied or deferred
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply(); // Defer the reply if not deferred or replied
        }

        // Check if the channel name is 'outhouse'
        const channelName = process.env.CHANNEL_NAME;
        const outhouseChannel = interaction.guild.channels.cache.find((channel) => channel.name === channelName);

        if (outhouseChannel) {
            // Send the message to the 'outhouse' channel
            outhouseChannel.send(`!sendpack ${packName} ${discordID}`);
            interaction.followUp('Message sent to #outhouse channel.');
        } else {
            interaction.followUp(`Error: Channel #${channelName} not found.`);
        }
    }
}

// Function to handle 'beep' and '!sendpack' messages
function handleBeepAndSendPackMessages(message) {
    if (message.content.toLowerCase() === 'beep') {
        // Reply with the initial message
        message.reply('boop');
    }
    if (message.content.toLowerCase() === '!sendpack') {
        // Reply with the initial message
        console.log('!sendpack sent');
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