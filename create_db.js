const Database = require("better-sqlite3");

const db = new Database("notifications.db");
const create = `CREATE TABLE IF NOT EXISTS notifications( 
                username TEXT NOT NULL,
                user_id TEXT NOT NULL,
                channel_id TEXT NOT NULL,
                channel_type TEXT NOT NULL
                )`;
try {
    db.exec(create);
    console.log("Database 'notifications' created successfully");
} catch (err) {
    console.log("Error when creating Database 'notifications'");
    console.error(err);
}
