import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { HELPER_EMBED } from '../constants';

export const data = new SlashCommandBuilder()
	// set options for slash command
	.setName('help')
	.setDescription(`A brief description of Fortuna's commands`);

// execute slash command
export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply({ embeds: [HELPER_EMBED] });
}
