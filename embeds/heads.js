// at the top of your file
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const coinHeads = new MessageEmbed()
	.setColor('#e5c300')
	.setTitle('Coin Flip')
	.setDescription('The **Coin Gods** tossed a coin...\n\n And it landed on **HEADS**!')
	.setThumbnail('https://cdn.discordapp.com/emojis/891814730962993212.png')
    ;

    module.exports = { coinHeads };