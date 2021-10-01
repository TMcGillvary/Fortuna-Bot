// Require the necessary discord.js classes
const consolere = require('console-remote-client');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

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

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

  consolere.connect({
	server: 'https://console.re', // optional, default: https://console.re
	channel: 'FORTUNA-SERVER', // required
	redirectDefaultConsoleToRemote: true, // optional, default: false
	disableDefaultConsoleOutput: false, // optional, default: false
  });

  console.re.log('remote log test');

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.re.log('Ready! Bot online!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);