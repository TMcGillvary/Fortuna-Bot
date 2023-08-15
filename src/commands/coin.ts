import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { COIN_HEADS, COIN_TAILS } from '../constants';

export const data = new SlashCommandBuilder()
	// set options for slash command
	.setName('coin')
	.setDescription('Flip a coin and returns heads or tails');

// execute slash command
export async function execute(interaction: ChatInputCommandInteraction) {
	if (Math.floor(Math.random() * 2) == 0) {
		await interaction.reply({ embeds: [COIN_HEADS] });
	} else {
		await interaction.reply({ embeds: [COIN_TAILS] });
	}
}
