# Project1Group2
## Milestone 1
**Brief description of your planned DSL idea**
- Create a DSL that would allow user with some programming experience set up and deploy discord bots
- Users would be able to set up multiple bots for multiple servers
- DSL would wrap around Discord.js library

**Ideas so far for main language features**
- Ability to set bot name
- Create basic variables
- Create commands
- Use previosly created commands in other commands in nested way
- Looping
- Add events that can trigger and repeat
- Add bots to servers using list of discord tokens
- Will provide a standard library of various functionalities built into the language

Example:
```
create bot FredBot

create string a_string= "hello"
create string todo_list = ["todo1", "todo2"]
create boolean a_boolean = true

# this is a comment

create command print_1_10(): 
    create number a_number = 1
    10 times:
        print(a_number)
        a_number += 1

create command print_list(): 
    # normal loop
    # index is optional to get the index of the loop kinda like how .map() in javascript allows you to get the index optionally
    todo_list todo_list.length times index:
        print(todo_list[index])

    # or 

    # for each loop for lists
    todo_list.each(item):
        print(item)

create command add_to_list(item): 
    todo_list.add(item)

create command remove_from_list(index): 
    todo_list.remove(index)

# example of importing a function from the Math standard library (we will support a bunch of common Math functions)
use random from Math

create command is_guess_correct(start, end, guess): 
    create number random_number = random(start, end)
    return random_number == guess

create command test_guess(): 
    create number start = 0
    create number end = 10
    create number guess = 5
    create boolean is_correct = is_guess_correct(start, end, guess)
    # or pass the values directly: create boolean is_correct = is_guess_correct(0, 10, 5)
    if is_correct:
        print("correct")
    else:
        print("incorrect")

# add event that calls repeats
# Time is a standard library that we will implement
use cron from Time
create command create_timer(): 
    cron("0 0 0 * * *", print_1_10)

# add both to all servers in list
add bot FredBot to servers [DISCORD_TOKEN_1, DISCORD_TOKEN_2]
```


**Notes of any important changes/feedback from TA discussion**
- TA suggested enriching our language by adding variables, standard math functions and ability to call previosly created functions
- TA suggested a good way to test complexity of the language is to see if the user is capable of creating a simple game like rock/paper/scissors or slot machine

**Any planned follow-up tasks or features still to design**
- Still need to discuss the limitations of the language
- Planning to further develop language example to be more natural english
