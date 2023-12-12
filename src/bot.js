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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'car-count') {
        await interaction.reply('Please submit a list.');

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

    const { options } = interaction;

    if (
        interaction.commandName === 'send-lottery_pack' ||
        interaction.commandName === 'send-lottery_packs2' ||
        interaction.commandName === 'send-tools_packs' ||
        interaction.commandName === 'send-materials_packs' ||
        interaction.commandName === 'send-weapons_packs' ||
        interaction.commandName === 'send-vehicle_packs' ||
        interaction.commandName === 'send-survivalgear_packs' ||
        interaction.commandName === 'send-meds_packs' ||
        interaction.commandName === 'send-food_packs' ||
        interaction.commandName === 'send-daily_packs' ||
        interaction.commandName === 'send-crafting-adminsonly' ||
        interaction.commandName === 'send-bigspender'
    ) {
        const packName = options.getString('packname');
        const discordID = options.getString('discord-id');

        console.log(`!sendpack ${packName} ${discordID}`);

        // Ensure that the interaction is replied or deferred
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply(); // Defer the reply if not deferred or replied
        }

        // Check if the channel name is 'outhouse'
        const channelName = 'outhouse';
        const outhouseChannel = interaction.guild.channels.cache.find((channel) => channel.name === channelName);

        if (outhouseChannel) {
            // Send the message to the 'outhouse' channel
            outhouseChannel.send(`!sendpack ${packName} ${discordID}`);
            interaction.followUp('Message sent to #outhouse channel.');
        } else {
            interaction.followUp(`Error: Channel #${channelName} not found.`);
        }
    }

})

client.on(Events.MessageCreate, async (message) => {

    // boop response
    if (message.content.toLowerCase() === 'beep') {
        // Reply with the initial message
        message.reply('boop');
    }
    if (message.content.toLowerCase() === '!sendpack') {
        // Reply with the initial message
        console.log('!sendpack sent');
    }

});

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
