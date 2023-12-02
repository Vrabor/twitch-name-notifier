const { Client } = require('discord.js');
const { open_db, get_all_usernames, get_notifications_for_username, delete_notifications_for_username } = require('./db.js');
const { Admin_Id } = require('./config.json');
const { check_available } = require('./usernames.js');
const { setTimeout } = require('timers/promises');

class Notifier {
    client;
    constructor(client) {
        this.client = client;
    }

    send_notification(channel_type, user_id, channel_id, message){
        if (channel_type === 'Channel') {
            const channel = this.client.channels.cache.get(channel_id);
            channel.send(message);
        } else if (channel_type === 'DM') {
            this.client.users.send(user_id, message)
        } else {
            throw new Error(`unknown channel_type "${channel_type}"`);
        }

    }
    
    async run(){
        while(true){
            // check for alerts every 20 minutes
            await setTimeout(1 * 60 * 1000);
            await this.check_and_alert_usernames();
        }
    }

    async check_and_alert_usernames(){
        let db = open_db();
        try {
            let usernames = get_all_usernames(db);
            for (let nameobj of usernames) {
                let name = nameobj.username;
                let available = await check_available(name);
                if (available){
                    let notifications = get_notifications_for_username(db, name);
                    for (let n of notifications) {
                        let message = `<@${n.user_id}> the username ${name} seems to be available now!`;
                        this.send_notification(n.channel_type, n.user_id, n.channel_id, message);
                    }
                    delete_notifications_for_username(db, name);
                }
            }
        } catch (err) {
            console.error(err);
            this.send_admin_error("Error in Notification bot");
        }
    }

    send_admin_error(message){
        this.send_notification('DM', Admin_Id, null, message);
    }
}

module.exports = { Notifier }
