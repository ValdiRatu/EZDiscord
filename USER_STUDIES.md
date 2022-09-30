# User Study (Kobe)
- User thought the language was pretty straightforward and intuitive if you're familiar with other languages
- User comes from a salesforce background and defines strings using single quotes
- User thought that the `start bot` and `end bot` blocks were a sort of main function rather than an encapsulation of the entire program
    - This could probably be handled via documentation

## What we made:
```
start bot
command helloWorld(ntimes?: int){
    var message = "Hello world!";

    if (ntimes == undefined OR ntimes <= 0){
        reply(message);
    }
    else{
        var counter = 0;
        while (counter !== ntimes){
            reply(message);
            couter = counter + 1;
        }
    }
}

var names = ["Lee Roy", "Kobe", "Saad"];

command greet(){

    var message = "Hello ";

    var count = 0;
    foreach(name : names){
        message = message + name;
        count = count + 1;
        if (len(names) >= count){
            message = message + ", ";
        }
        else{
            message = message + ".";
        }
    }
    reply(message);
}

end bot

token = TOKEN,
clientID = client_id,
guildId = guild_Id
```