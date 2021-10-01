// at the top of your file
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const coinTails = new MessageEmbed()
	.setColor('#e5c300')
	.setTitle('Coin Flip')
	.setDescription('The **Coin Gods** tossed a coin...\n\n And it landed on **TAILS**!')
	.setThumbnail('https://media.discordapp.net/attachments/891755416097275916/891816756363022356/1-Option1-Tails-Small-2.png')
    ;

    module.exports = { coinTails };