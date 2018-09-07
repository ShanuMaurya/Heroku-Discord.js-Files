/*****
Heroku Discord.js Bot Files
Author: Mega Mewthree
Version: 1.0

Paste your bot code below!
*****/
const Discord = require('discord.js'),
	moment = require('moment');
	
 
client = new Discord.Client(),
      token = require('./private.json'),
      fs = require('fs'),
      winstonLogger = require('./classes/logger.js');
winston = require('winston'),
      chalk = require('chalk');
const snekfetch = require('snekfetch');
///  const Cleverbot = require("cleverbot-node");
/// const clbot = new Cleverbot;
/// clbot.configure({botapi: "46JYSuDaKLGZdNW1ipstUqVt5BaDVnAz"});

const winstonClass = new winstonLogger();
global.logger = winstonClass.logger;
client.login(process.env.TOKEN);
client.on('ready', async () => {
	logger.verbose(`${client.user.username} Is up and ready to work`);
	logger.verbose(`Connected as: ${client.user.tag}`);
	logger.verbose(`Client ID: ${client.user.id}`);
	logger.verbose(`====================================`);
	/////await client.user.setGame('</[0-9]\w+/g>', 'https://www.twitch.tv/theonlyartz');
});
client.commands = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
	if (err) {
		logger.error(err);
	}
	const jsFiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsFiles.length <= 0) {
		logger.info('No commands to load');
		return;
	}
	logger.info(`Loading ${jsFiles.length} commands`);

	try {
		jsFiles.forEach((f, i) => {
			const props = require(`./commands/${f}`);
			logger.info(`${i + 1}) => ${f} Has been loaded successfully`);
			client.commands.set(props.help.name, props);
		});
	} catch (e) {
		logger.error(e);
	}
});
const prefix = '=';
client.on('message', async message => {
	if (message.author.id !== '400359111834861568') {
		return;
	}
	if (message.author.bot) {
		return;
	}
	client.on("message", (message) => {
  if(message.content === "pls kill me") {
    message.channel.send("hey no, _revives you_!");
  }
});


	const guild = message.guild;
	const args = message.content.split(' ').slice(1).join(' ');
	const command = message.content.split(' ')[0];
	if (!command.startsWith(prefix)) {
		return;
	}

	const cmd = client.commands.get(command.slice(prefix.length));
	if (cmd) {
		try {
			cmd.run(client, message, args);
			logger.info(`${chalk.cyan(cmd.help.name)} just been executed by ${chalk.magenta(message.author.username)} inside ${chalk.yellow(message.guild.name)}`);
		} catch (e) {
			logger.error(e);
		}
	}
	


    // .catch(e => {
    //   logger.error(e)
    // })
});
