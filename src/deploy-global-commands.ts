import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// pull the variables from the .env file
dotenv.config();
const token = process.env.DISCORD_TOKEN || '';
const clientId = process.env.CLIENT_ID || '';

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

/** This copy of the file deploys the slash command updates GLOBALLY to all servers */
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(Routes.applicationCommands(clientId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		console.log(`NOTE: These can take up to 1 hour to reflect in Discord!`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
