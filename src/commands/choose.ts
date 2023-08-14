// required to build bot command
import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { CHOOSE_EMBED } from '../constants';

export const data = new SlashCommandBuilder()
	// set options for slash command
	.setName('choose')
	.setDescription('Given a list of two or more options, chooses one!')
	.addStringOption((option) =>
		option
			.setName('choices')
			.setDescription('Separate your choices with the | symbol, and make sure there is a space on either side')
			.setRequired(true),
	);
// execute slash command
export async function execute(interaction: ChatInputCommandInteraction) {
	if (interaction.options.getString('choices') === null)
		return interaction.reply('Needs more than one option to choose from!');

	const value = interaction.options.getString('choices') as string;
	const choicesArray = value.split(' | ');

	if (choicesArray.length >= 1) {
		const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];

		// embedder
		const choiceDecision = new EmbedBuilder(CHOOSE_EMBED).setDescription(
			`The **Coin Gods** have looked through your choices, and decided on this one:\n\n **"${randomChoice}"**`,
		);

		return interaction.reply({ embeds: [choiceDecision] });
	}
	return;
}
