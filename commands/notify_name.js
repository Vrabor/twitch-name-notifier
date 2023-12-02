const { SlashCommandBuilder } = require('discord.js');
const { open_db, insert_notification } = require('../db.js');

const data = new SlashCommandBuilder()
		        .setName('notify_name')
		        .setDescription('Sets up a notification when a name becomes available on Twitch')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('The username you want to be notified about')
                        .setRequired(true));


module.exports = {
	data: data,
    async execute(interaction) {
		const username = interaction.options.getString('username');
        const channel_id = interaction.channelId;
        const user_id = interaction.user.id;
        let channel_type = 'Channel';
        if (interaction.channel === null){
            channel_type = 'DM';
        }
        let db = open_db();
        let success = insert_notification(db, username, user_id, channel_id, channel_type);
        if (success){
		    await interaction.reply(`A notification for username '${username}' has been set up`);
        } else {
            await interaction.reply('Error setting up notification, contact admin or try again later');
            console.error('Failed to insert into Database');
        }
	},
};
