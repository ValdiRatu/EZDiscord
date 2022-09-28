```js
start bot

configs = {
    token: “token”,
    clientID: “id”,
    guildID: [“id1”]
}

var diceFace = 6
var result = []


command roll10Dice(dice, result) {
    while (counter < 10){
        result.push(random(1,6))
    }
    for (int in result){
        reply(int);
    }
}

addCommand("roll-10-dice", roll10Dice)


end bot
```