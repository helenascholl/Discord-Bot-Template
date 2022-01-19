import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  { name: 'ping', description: 'Replies with Pong!' }
];
const token = process.env['NODE_ENV'] === 'development' ?
  process.env['DISCORD_DEV_TOKEN']! :
  process.env['DISCORD_PROD_TOKEN']!;
const rest = new REST({ version: '9' }).setToken(token);
const client = new Client({ intents: [ Intents.FLAGS.GUILDS ] });

client.on('ready', client => {
  console.log(`Logged in as ${client.user.tag}`);

  rest.put(Routes.applicationCommands(client.user.id), { body: commands })
    .catch(console.error);
});

client.on('interactionCreate', interaction => {
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case 'ping':
        interaction.reply('Pong!')
          .catch(console.error);
        break;
    }
  }
});

client.login(token)
  .catch(console.error);
