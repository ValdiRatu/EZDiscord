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
    - Looked at the most popular bots and found some trends. Used this info to decide on bot ideas for now


## Milestone 3

### Concrete Grammar Design used for the user study
_The grammar already includes feedback from the TA_
```python
# Setting program start/end (also reserved, key words)
`start bot` `end bot`

# Variables 
`var name = <value>`

# Loops:
`while (counter<10) {}`
`for (<item> in <arrayName>) {}`

# Numerical comparison
(>, ==, <, <=, >=, !=)

# Logical operators
`AND/OR/NOT`

# If/else (conditional statement)
`If (true) {}`
`else  {}`

# Math operations:
`operators: +, -, *, /`
`NUM operator NUM`

# Array operations
# Adding elements: 
`push(<arrayName>, <value>)`
# Removing elements: 
`remove(<arrayName>, <index>)`
# Accessing elements:
`get(<arrayname>, <index>)`
# Access length of array: 
`len(<arrayName>`
# Return the index of first match. Return -1 if can't find
find(<arrayName>, <value>)

# Commands. They will be callable from Discord using /<command name>
`command <name>(arg, arg2, …): {STATEMENTS+}`

# STATEMENTS:
# Can be variable initialization
# Binary logic
# if/else
# Loop
# Math operation
# Built in function

# In-built functions
# Bot will reply in channel with the input string
reply (<text> : string)
# Returns random number between min and max (inclusive) 
random (min, max)

# Allowed types in language
String
Number # will think of everything as float
Boolean
Array
```

### TA feedback
- Due to time constraints, remove majority of built-in functions and focus on reply and random
- Special classes like User and Role can be removed for now. Only implement if there is enough time
- Goal for MVP is to implement a simple bot e.g. rock paper scissors, random item from array, etc. 
- User studies looked good

### User studies
[Our user studies](USER_STUDIES.md)

### Plan for week 4
- Lexer team start on implementing parser for everything that can be used outside of commands and loops
- Implementation team will start building architecture for the project