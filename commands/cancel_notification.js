const { SlashCommandBuilder } = require('discord.js');
const { open_db, delete_notification } = require('../db.js');

const data = new SlashCommandBuilder()
		        .setName('cancel_notification')
		        .setDescription('Cancels a notification')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('The username you no longer want to be notified about')
                        .setRequired(true));


module.exports = {
	data: data,
    async execute(interaction) {
		const username = interaction.options.getString('username');
        const channel_id = interaction.channelId;
        const user_id = interaction.user.id;
        let channel_type = 'Channel';
        if (interaction.channel === null){
            let channel_type = 'DM';
        }
        let db = open_db();
        let info = delete_notification(db, username, user_id, channel_id, channel_type);
        if (info > 0){
		    await interaction.reply(`The notification for username '${username}' in this channel has been deleted`);
        } else {
            await interaction.reply('No Notification was deleted either there was none set up or there was an error');
        }
	},
};
