async function check_available(username){
    let response = await fetch("https://passport.twitch.tv/usernames/" + username);
    if (response.ok){
        if (response.status == 200){
            // 200 means user was found, so name is unavailable
            return false;
        } else if (response.status == 204){
            // 204 means user was not found, so name is available
            return true;
        } else {
            console.error("unknown status code: " + response.status);
            throw new Error("unknown status code:" + response.status);
        }
    } else {
        throw new Error("network error");
    }
}

module.exports = {
    check_available
}
