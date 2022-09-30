# User Study (Kobe)

- User thought the language was pretty straightforward and intuitive if you're familiar with other languages
- User comes from a salesforce background and defines strings using single quotes
- User thought that the `start bot` and `end bot` blocks were a sort of main function rather than an encapsulation of the entire program
  - This could probably be handled via documentation

## What we made

```js
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

# User Study (Valdi)

user - Computer Science Major from Purdue University

## Can they understand the code

- arguments:
  - can understand the optional argument
- body:
  - able to understand / infer what built in functions can do from name of functions
  - able to understand what the code does

## Can they write

- Prompt: A bot with an echo command that echos the users input
- notes:
  - pretty fast set up (start end token, etc)
  - made the echo command very fast
- Prompt: global counter that gets add up via a sum command
- notes:
  - able to assume other types like Numbers
  - able to finish the add sum function very fast
- Promt: ToDoList
- notes:
  - able to make a global variable for list
  - easily did the `addToDo` command
  - able to use for each to do a complex `seeToDo` command
  - add `stop` keyword to stop command early?
  - able to implement `deleteToDo` even using 1-base indexing and even doing early returns

## Overall thoughts

- build in functions of reply, followUp, edit is very useful
- Thinks the dsl achieves its goal of simplifying the process
- misses objects from javascript
- certain stuff like only having one `reply` is not explicit
- wants more explicit control flow (i.e when to stop the command)
- the ability to make helper functions would be nice
- people with a solid programming background is able to pick up the language very fast and already create somewhat complex commands for bots

## Code they wrote

```js
start bot

// token, etc.

var todoList = []

// Iterate the todo list, list out all items with index
command seeTodo() {
    var i = 0
    var replyString
    for (item in todoList) {
        replyString += (i + 1) + ': ' + get(todoList, i) + '\n'
        i++
    }
    reply(replyString)
}

// Append arg item to the end of todo list
command addTodo(item: String) {
    add(todoList, item)
    reply(item + ' added!')
}

command deleteTodo(index: Number) {
    if (index <= 0) {
        reply('Index must be greater than 0')
    }

    if (index > len(todoList)) {
        reply('Index must be less than or equal to the number of items in the list: ' + len(todoList))
    }
    
    var removedItem = get(todoList, index - 1)
    remove(todoList, index - 1)
    reply('Item: ' + removedItem + ' at index ' + index + ' was removed')
}

end bot
```
