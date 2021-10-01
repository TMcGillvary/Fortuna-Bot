// required to build bot command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()

    // set options for slash command
    .setName('dice')
    .setDescription('Rolls dice. The first number is how many to roll. The second is the number of sides.')
    .addNumberOption(option =>
        option.setName('count')
        .setDescription('Enter how many times to roll')
        .setRequired(true))
        .addNumberOption(option =>
            option.setName('sides')
            .setDescription('Enter your number of sides (such as 6 for d6)')
            .setRequired(true)),

    // execute slash command
    async execute(interaction) {
        const count = interaction.options.getNumber('count');
        const sides = interaction.options.getNumber('sides');

        let sum = 0;
        const diceArray = [];

        for (let i = 0; i < count; i++) {
            const diceRoll = 1 + Math.floor(Math.random() * sides);
            diceArray.push(diceRoll);
            sum = diceRoll + sum;
        }

        // embedder
        const finalRoll = new MessageEmbed()
                    .setColor('#26b5c0')
                    .setTitle('Dice Roll')
                    .setDescription(`You entered **${count}d${sides}**. The **Coin Gods** have rolled your dice.
                    \n [ **${count}d${sides}**: ${diceArray.join(', ')} ]
                    \n Your result is **${sum}**.`)
                    .setThumbnail('https://cdn.discordapp.com/emojis/892624956804964383.png')
                    ;

        return interaction.reply({ embeds: [finalRoll] });
    },
  };