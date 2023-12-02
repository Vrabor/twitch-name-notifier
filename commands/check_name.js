const { SlashCommandBuilder } = require('discord.js');
const { check_available } = require('../usernames.js');

const data = new SlashCommandBuilder()
		        .setName('check_name')
		        .setDescription('Checks whether a name is available on Twitch')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('The username you want to look up')
                        .setRequired(true));


module.exports = {
	data: data,
    async execute(interaction) {
		const username = interaction.options.getString('username');
        let available = await check_available(username);
		await interaction.reply(`The username ${username} seems to be ${available ? '' : 'un'}available on Twitch.`);
	},
};
