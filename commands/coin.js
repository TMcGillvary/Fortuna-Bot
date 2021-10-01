// required to build bot command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { coinHeads } = require('../embeds/heads.js'); // embed for heads
const { coinTails } = require('../embeds/tails.js'); // embed for tails

module.exports = {
	data: new SlashCommandBuilder()
        // set options for slash command
		.setName('coin')
		.setDescription('Flip a coin and returns heads or tails'),

    // execute slash command
	async execute(interaction) {
		if (Math.floor(Math.random() * (2)) == 0) {
			await interaction.reply({ embeds: [coinHeads] });
		}
		else {
			await interaction.reply({ embeds: [coinTails] });
		}
	},
};