// Require the necessary discord.js classes
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const consolere = require('console-remote-client');

// Create a new client instance
const client = new Client({
	/* Your other options like intents */
	intents: [Intents.FLAGS.GUILDS],

	presence: {
		activities: [{
		type: 3,
		name: '/help for info',
	}],
	},
  });

  consolere.connect({
	server: 'https://console.re', // optional, default: https://console.re
	channel: 'FORTUNA-SERVER', // required
	redirectDefaultConsoleToRemote: true, // optional, default: false
	disableDefaultConsoleOutput: false, // optional, default: false
  });

  console.re.log('remote log test');

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready! Bot online!');
});

// Login to Discord with your client's token
client.login(token);

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '891766698015875112';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();