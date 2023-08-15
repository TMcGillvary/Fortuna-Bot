# Lady Fortuna Discord Bot

A Discord bot developed to test your luck in statless RPG games utilizing slash commands.

Built in Typescript using the [discord.js](https://discord.js.org/) library.

## Discord Commands

`/help` - Outputs a list of the current slash commands

`/coin` - Flips a coin

`/choose` - Given a list by the user, outputs a random choice

`/dice` - Given a number of dice and sides, outputs the result of the dice roll

## To Run

```bash
# To run the server
npm run start

# To update the bot's slash commands globally
npm run build:global
```

## Current Dependencies

- discord.js [v14.12.1](https://github.com/discordjs/discord.js/releases/tag/14.12.1)
- discord-api-types [v0.37.53](https://github.com/discordjs/discord-api-types/releases/tag/0.37.53)
- dotenv [v16.3.1](https://github.com/motdotla/dotenv/releases/tag/v16.3.1)
- ts-node [v10.9.1](https://github.com/TypeStrong/ts-node/releases/tag/v10.9.1)
