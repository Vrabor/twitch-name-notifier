# twitch-name-notifier
Small Bot that pings your Discord when a name becomes available on twitch

# Installation / Dependencies
Needs an installation of `sqlite`
To get started just `npm install`

# Running
Create a `config.json` File with the following Format:
```
{
    "Client_Id": "YOUR CLIENT ID",
    "Auth_Token": "YOUR APPS AUTH TOKEN",
    "Admin_Channel": (optional)"THE USERID OF AN ADMIN USER THE SEND ERROR REPORTS"
}
```
Before the Bot can be used create a new sqlite Database with `node create_db.js` and register the commands to discord with `node deploy_commands.js`
Then just run it with `node bot.js`
