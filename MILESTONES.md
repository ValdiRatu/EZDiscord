# Project1Group2
## Milestone 1
**Brief description of your planned DSL idea**
- Create a DSL that would allow user with some programming experience set up and deploy discord bots
- Users would be able to set up multiple bots for multiple servers
- DSL would wrap around Discord.js library

**Ideas so far for main language features**
- Ability to set bot name
```
create bot FredBot
```
- Create basic variables
```
create string a_string= "hello"
create string todo_list = ["todo1", "todo2"]
create boolean a_boolean = true
```
- Create commands
```
create command add_to_list(item): 
    todo_list.add(item)

create command remove_from_list(index): 
    todo_list.remove(index)
```
- Use previosly created commands in other commands in nested way
```
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
```
- Looping
```
create command print_1_10(): 
    create number a_number = 1
    10 times:
        print(a_number)
        a_number += 1

create command print_list(): 
    # normal loop
    # index is optional to get the index of the loop kinda like how .map() in javascript allows you to get the index optionally
    todo_list.length times index:
        print(todo_list[index])

    # or 

    # for each loop for lists
    todo_list.each(item):
        print(item)
```
- Add events that can trigger and repeat
```
# Time is a standard library that we will implement
use cron from Time
create command create_timer(): 
    cron("0 0 0 * * *", print_1_10)
```
- Add bots to servers using list of discord tokens
```
# add both to all servers in list
add bot FredBot to servers [DISCORD_TOKEN_1, DISCORD_TOKEN_2]
```
- Will provide a standard library of various functionalities built into the language
```
# example of importing a function from the Math standard library (we will support a bunch of common Math functions)
use random from Math
```
Example Program:
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

## Milestone 2

**Planned division of responsibilities**

- Split up into small teams when starting to implement:
    - team for lexer/parser
    - team for ast tree design
    - team for compiler

**Roadmap**

- make discord bot based on popular discord bots
    - use this to help further restrict and simplify our language
- First draft of DST
    - [ ]  Have grammar ready and code examples
    - [ ]  Pick a simple goal that our language can accomplish and write psuedo code with our language that fulfills said goal
    - [ ]  Give DST to user with code example and see if they can explain what the code example does and get feedback
        - can they understand what the code does/makes? why or why not?
    - [ ]  Give DST to users and see if they are able to achieve goal using our language
        - were they able to do it? how long did it take?
    - [ ]  get feedback from user

- implementation
    - [ ]  After getting feedback, start with actual implementation of language

**Draft Grammar**

```python
Setting program start/end
`start bot` `end bot`--> keywords
Variables 
Typing for both variables and arguments
`var name = <value>`
Loops:
Only use WHILE
`while (counter<10) {}`
Binary logic:
Numerical comparison (>, ==, <, <=, >=, !=)
AND/OR/NOT
If/else
If (true) {}
else  {}
Commands: → “/” commands
`command <name>(arg, arg2, …): {STATEMENTS+}`
If a command is added to the bot (via `addCommand(command1, “command1”)`) then it cannot be called from within another command
STATEMENTS:
Can be variable initialization
Binary logic
if/else
Loop
Math operation
Adding commands as `/` callable
`addCommand(command1, “command1”)`
Math operations:
operators: +, -, *, /
NUM operator NUM
Array operations
Adding elements: push(<arrayName>, <value>)
Removing elements: remove(<arrayName>, <index>)
Accessing elements: get(<arrayname>, <index>)
Access length of array: len(<arrayName>
In-built functions
print(<text> : string)Setting program start/end
```

**TA feedback  (already applied to draft grammar):**

- Types can be removed
- Array operations good
- Figure out what specific bot we want -> write example program -> cut off what we dont need
- Zone in on what specific bot we want to make and specialize our DSL on that
