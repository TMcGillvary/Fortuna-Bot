const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        // set options for slash command
		.setName('help')
		.setDescription('A brief description of Fortuna\'s commands'),

     // execute slash command
	async execute(interaction) {
        // embedder
        const helperEmbed = new MessageEmbed()
                    .setColor('#3f979e')
                    .setTitle('Help with Commands')
                    .setDescription(`Our current list of commands:
                    \n\n \`/help\` - shows this list 
                    \n\n \`/coin\` - flips a coin and tells you heads or tails 
                    \n\n \`/choose\` - given two or more choices, picks one. Make sure you separate with the | symbol and a space to either side
                    \n\n \`/roll\` - rolls a dice and tells you the outcome `)
                    .setThumbnail('https://cdn.discordapp.com/attachments/891755416097275916/891901358226157628/LadyFortuna-WM.png')
                    ;

		await interaction.reply({ embeds: [helperEmbed] });
	},
};