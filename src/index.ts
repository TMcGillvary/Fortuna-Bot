// Require the necessary discord.js classes
import { Client, ClientOptions, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'node:path';

import dotenv from 'dotenv';
// pull the variables from the .env file
dotenv.config();

console.log('Starting Fortuna Bot...');
class CommandClient extends Client {
	commands: Collection<string, any>;

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}
}

// Create a new client instance
const client = new CommandClient({
	/* Your other options like intents */
	intents: [GatewayIntentBits.Guilds],

	presence: {
		activities: [
			{
				type: 3,
				name: '/help for info',
			},
		],
	},
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: any) => {
	console.log(`Bot Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const client = interaction.client as CommandClient;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		console.log(`Executing command ${interaction.commandName}`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
