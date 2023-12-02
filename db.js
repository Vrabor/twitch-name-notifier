const Database = require("better-sqlite3");

function open_db(){
    return new Database("notifications.db");
}

function insert_notification(db, username, user_id, channel_id, channel_type){
    let insert = db.prepare(`INSERT INTO notifications
                                (username, user_id, channel_id, channel_type)
                                VALUES
                                (@username, @user_id, @channel_id, @channel_type)`);
    try{
        db.transaction(() => {
            insert.run({username: username.toLowerCase(),
                user_id: user_id, 
                channel_id: channel_id,
                channel_type: channel_type});
        })();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function delete_notification(db, username, user_id, channel_id, channel_type){
    let delete_stmt = db.prepare(`DELETE FROM notifications
                                    WHERE username = :username
                                        and user_id = :user_id
                                        and channel_id = :channel_id
                                        and channel_type = :channel_type`);
    try{
        const info = db.transaction(() => {
                return delete_stmt.run({username: username.toLowerCase(),
                    user_id: user_id, 
                    channel_id: channel_id,
                    channel_type: channel_type});
        })();
        console.log(info);
        return info.changes;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

function delete_notifications_for_username(db, username){
    let delete_stmt = db.prepare(`DELETE FROM notifications
                                    WHERE username = :username`);
    try{
        const info = db.transaction(() => {
                return delete_stmt.run({username: username.toLowerCase()});
        })();
        return info.changes;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

function get_all_notifications(db) {
    let stmt = db.prepare(`SELECT *
                            from notifications`);
    return stmt.all();
}

function get_all_usernames(db) {
    let stmt = db.prepare(`SELECT DISTINCT username
                            from notifications`);
    return stmt.all();
}

function get_notifications_for_username(db, username){
    // Get all the notifications that need to be sent for a username
    let stmt = db.prepare(`SELECT DISTINCT user_id, channel_id, channel_type
                            from notifications
                            where username = ?`);
    return stmt.all(username.toLowerCase());
}


module.exports = { open_db, insert_notification, delete_notification, get_all_notifications, get_all_usernames, get_notifications_for_username, delete_notifications_for_username }
