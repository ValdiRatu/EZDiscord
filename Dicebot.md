```js
start bot

configs = {
    token: “token”,
    clientID: “id”,
    guildID: [“id1”]
}

var min = 1
var max = 6
var result = []


command rollManyDice(dices: Number) {
    while (counter < dices){
        result.push(random(min,max))
    }
    reply('here is the result:');
    for (int in result){
        followup(int);
    }
}

addCommand("roll-many-dice", rollManyDice)


end bot
```