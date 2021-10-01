// required to build bot command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        // set options for slash command
		.setName('choose')
		.setDescription('Given a list of two or more options, chooses one!')
        .addStringOption(option =>
            option.setName('choices')
            .setDescription('Separate your choices with the | symbol, and make sure there is a space on either side')
            .setRequired(true)),

        // execute slash command
        async execute(interaction) {
            const value = interaction.options.getString('choices');
            const choicesArray = value.split(' | ');

            if (choicesArray.length >= 1) {

                const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];

                // embedder
                const choiceDecision = new MessageEmbed()
                    .setColor('#3f979e')
                    .setTitle('Choosing')
                    .setDescription(`The **Coin Gods** have looked through your choices, and decided on this one:\n\n **"${randomChoice}"**`)
                    .setThumbnail('https://cdn.discordapp.com/attachments/891755416097275916/891901358226157628/LadyFortuna-WM.png')
                    ;

                return interaction.reply({ embeds: [choiceDecision] });
            }
            return interaction.reply('Needs more than one option to choose from!');
	},
};