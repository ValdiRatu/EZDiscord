```js
start bot

configs = {
    token: “token”,
    clientID: “id”,
    guildID: [“id1”]
}

var accountIds = ["akim", "asad", "alex"]
var accountBalances = [0, 10000, 200]

command deposit(id, amount) {
    var count = 0
    var index = -1
    for (account in accountIds) {
        if (account == id) {
            index = count
        }
        count = count + 1
    }
    if (index != -1) {
        var newAmount = get(accountBalances, index) + amount
        set(accountBalances, index, newAmount)
        reply(amount, " deposited!")
        reply("New bank balance is $", newAmount)
    } else {
        reply("Account with id ", id, " does not exist!")
    }
}

command withdraw(id, amount) {
    var count = 0
    var index = -1
    for (account in accountIds) {
        if (account == id) {
            index = count
        }
        count = count + 1
    }
    if (index != -1) {
        var currentAmount = get(accountBalances, index)
        if (currentAmount - amount < 0) {
            reply("Insufficient funds!")
            reply("Bank balance is only $", currentAmount)
        } else {
            currentAmount = currentAmount - amount
            set(accountBalances, index, currentAmount)
            reply(amount, " withdrawn!")
            reply("New bank balance is $", currentAmount)
        }
    } else {
        reply("Invalid accountId")
    }
}

command createAccount(id, amount?) {
    var initialAmount = amount // this may set initialAmount to undefined
    if (initialAmount == undefined) {
        initialAmount = 0
	}
    add(accountIds, id)
    add(accountBalances, initialAmount)
    reply("New account with $", initialAmount, " created!")	
}

command deleteAccount(id) {
    // contains returns -1 if not present, else it returns the index
    var index = contains(accountIds, id)
    if (index != -1) {
        remove(accountIds, index)
        remove(accountBalances, index)
        reply("Account deleted!")
    } else {
        reply("Account with id ", id, " does not exist!")
    }
}

addCommand("deposit", deposit)
addCommand("withdraw", withdraw)
addCommand("create-account", createAccount)
addCommand("delete-account", deleteAccount)

end bot
```