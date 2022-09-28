```
start bot

var optionEmojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

command poll(topic, option1, option2, option3?, option4?, option5?, option6?, option7?, option8?, option9?, option10?) {
    var message = "NEW POLL: " + topic + "\n\n\t" + get(optionEmojis, 0) + " " + option1 + "\n\t" + get(optionEmojis, 1) + option2 + "\n";

    var currentEmoji = 2;       // are we doing 0 based indexing? if not add 1
    var reactionsNeeded = 2;

    if (option3 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option3 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option4 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option4 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option5 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option5 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option6 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option6 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option7 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option7 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option8 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option8 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option9 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option9 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    if (option10 != undefined) {
        message = message + "\t" + get(optionEmojis, currentEmoji) + option10 + "\n";
        currentEmoji = currentEmoji + 1;
        reactionsNeeded = reactionsNeeded + 1;
    }

    reply(message);

    var counter = 0;
    while (counter < reactionsNeeded) {
        react(get(optionEmojis, counter));
    }
}

end bot

config = {
    token = *TOKEN*,
    clientID = *client_id*,
    guildId = *guild_id*
}
```