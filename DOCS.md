# EZDiscord Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [Discord Variables](#discord-variables)
3. [Variables](#variables)
4. [Math](#math)
5. [Boolean Logic](#boolean-logic)
6. [Built-in Functions](#built-in-functions)
7. [Commands](#commands)
8. [Control Flow](#control-flow)

## Getting Started

To start of, create a file called `bot.ezd` in the root of the project. This file will contain the code for your bot.

The first step towards writing your discord bot is to initialize the bots Token and IDs.

```js
TOKEN = 'th15-15_4_dummy_t0k3n'
ClientID = '123456789012345678'
GuildID = ['123456789012345678']
```

More documentation on these variables can be found [here](#discord-variables).

The next step is to create a slash command. This is done by creating a function with the `command` keyword.

```js
command hello() {
    reply('Hello World!')
}
```

The `hello` function will be called when the user types `/hello` in the chat. The `reply` function will send a message to the channel the command was called in. In this case, it will send `Hello World!`.

You can also create a function that takes arguments. This is done by adding the arguments to the function declaration.

```js
command add(a: number, b: number) {
    var sum = a + b
    reply(sum)
}
```

You **NEED** to provide types for any arguments passed to commands. More information on commands and argument types can be found [here](#commands).

In the above example, the `add` function will be called when the user types `/add 1 2`. The `reply` function will send a message to the channel the command was called in. In this case, it will send `3`.

Variables can be created by using the `var` keyword. They can be created in the global scope where they can be accessed by any command or they can be created within a block - `{ // block }` and only be accessed in that block.

```js
var a = [1, 2, 3]

command sum_a() {
    // sum is only accessible in this block
    var sum = 0
    for (elem in a) {
        sum = sum + elem
    }
    reply('sum: ', sum)
}
```

The above example will send the following messages to the channel the command was called in.

```
sum: 6
```

Now that you have a basic understanding of how to write EZDiscord code, you can start writing your own bot! You can find more information on the language below.

## Discord Variables

All discord variables **MUST** be declared in the global scope before any commands or variables are declared.

### Token

The token is the key to your bot. It is used to authenticate your bot with the Discord API.

Type: `string`

```js
TOKEN = 'th15-15_4_dummy_t0k3n'
```

### ClientID

The Client ID is a unique id that identifies your application.

Type: `string`

```js
ClientID= '123456789012345678'
```

### GuildID

The Guild ID is an array of unique ids that identifies the servers your bot is in.

Type: `string[]`

```js
GuildID=['123456789012345678', '987654321098765432']
```

## Variables

### Creating Variables

Variables can be created by using the `var` keyword. They created in the global scope and can be accessed by any command or they can be created in a block - `{ // block }` and only be accessed in that block.

```js
var a = [1, 2, 3]
var b = 4
var c = 'hello'
var d = true
```

Variables **NEED** to be initialized when they are created. Variable names **MUST** start with a letter and can only contain letters, numbers, and underscores.

### Variable Types

Variables can be of the following types:
- `number`
- `string`
- `boolean`
- `array`

These types are inferred by the value assigned to the variable. For example, the variable `b` in the above example is of type `number` because it is assigned the value `4`.

#### Number
```js
var a = 1
var b = 2.5
```

#### String

Strings are surrounded by single quotes (`'`).

```js
var a = 'hello\nworld'
var b = 'hello world'
```

#### Boolean

```js
var a = true
var b = false
```

#### Array

Arrays are surrounded by square brackets (`[` and `]`). They can contain any type of variable besides arrays.

```js
var a = [1, 2, 3]
var b = ['hello', 'world']
var c = [true, false, true]
var d = [1, 'hello', true]
```

There are multiple inbuilt functions that can be used on arrays. These functions are:
- `len(array)`: returns the length of the array
- `add(array, elem)`: adds `elem` to the end of `array`
- `remove(array, index)`: removes the element at `index` in `array`
- `get(array, index)`: returns the element at `index` in `array`
- `set(array, index, elem)`: sets the element at `index` in `array` to `elem`
- `find(array, elem)`: returns the index of the elem if `array` contains `elem`, else returns `-1`

These functions cannot be called in the global scope. They can only be called in a block. Example:

```js
var a = [1, 2, 3]
// var b = len(a) will not work

command get_len() {
    reply(len(a))
}
```

You can call functions in functions if they return a value.

```js
// works
reply(get(a, 0))

// does not work
reply(set(a, 0, 4))
```

### Updating Variables

Variables can be updated by using the `=` operator.

```js
var a = 1
a = 2
```

All variables are mutable and can be assigned any value of any type after they are created.

## Math

EZDiscord supports basic math operations. These operations are:
- `+`: addition
- `-`: subtraction
- `*`: multiplication
- `/`: division
- `%`: modulus

You can use parentheses to specify the order of math operations.

```js
var a = 1
var b = 2
var c = a + b
var d = 3 + c
var e = d - 1
var f = e * 2
var g = f / 2
var h = g % 2
var i = ((h + 1) * 2) / 2
```

You **CANNOT** use these operations on strings, arrays, or booleans or in conjunction with functions.

## Boolean Logic

EZDiscord supports basic boolean logic. These operations are:
- `==`: equal to
- `!=`: not equal to
- `>`: greater than
- `<`: less than
- `>=`: greater than or equal to
- `<=`: less than or equal to
- `and`: and
- `or`: or
- `not`: not

You can use parentheses to specify the order of boolean operations.

```js
var a = 1
var b = 2
var c = a == b
var d = a != b
var e = a > b
var f = a < b
var g = a >= b
var h = a <= b
var i = a and b
var j = a or b
var k = not a
var l = (a == b) and (c != d)
var m = 'hello' == 'world'
var n = 'hello' != 'world'
var o = not (true or false) == a
```

You **CANNOT** use these operations on arrays or in conjunction with functions.

## Built-in Functions

### `reply(...args)`

The `reply` function sends a message to the channel the command was called in. It can take any number of arguments. The arguments can be of the following types:

- variable
- boolean
- number
- string
- function call (like `len(array)` or any other function that returns a value)

```js
var txt = 'EzDiscord'
var adjectives = ['cool', 'awesome', 'great']
reply(txt, ' is ', get(adjectives, 1), '!')
// Output: EzDiscord is awesome!
```

**NOTE: the bot will only reply once per command regardless of how many times `reply` is called.**

### `random(min, max)`

Creates a random integer between `min` and `max` (both inclusive).

```js
// returns a random integer between 1 and 10 (both inclusive)
var a = random(1, 10)

// Output: EzDiscord is cool! or EzDiscord is awesome! or EzDiscord is great!
var txt = 'EzDiscord'
var adjectives = ['cool', 'awesome', 'great']
var last_index = len(adjectives)
last_index = last_index - 1
reply(txt, 'is', get(adjectives, random(0, last_index)), '!')
```

### `concat(...args)`

Concatenates all the arguments into a single string. It can take any number of arguments. The arguments can be of the following types:

- variable
- boolean
- number
- string
- function call (like `len(array)` or any other function that returns a value)

```js
var ez = 'EzDiscord'
concat(ez, ' is ', 'awesome', '!')
// Output: EzDiscord is awesome!
```

## Commands

### Creating Commands

Commands can be created by using the `command` keyword.

```js
command hello() {
    reply('Hello World!')
}

command bye() {
    reply('Bye World!')
}
```

Commands **MUST** have a name. The name of the user-callable slash command is the first word after the `command` keyword. The name of the command **MUST** start with a letter and can only contain letters, numbers, and underscores.

Commands do not return any value.

Bots can have multiple commands.

### Command Arguments

Commands can take arguments. This is done by adding the arguments to the command declaration.

```js
command add(a: boolean, b: number) {
    var sum = a + b
    reply(sum)
}
```

There are 3 types of arguments:
- `number`
- `string`
- `boolean`

Arguments **MUST** be provided a type. The type of the argument is specified after the argument name and a colon (`:`).

## Control Flow

Loops and conditionals are used to control the flow of the program. You can nest loops and conditionals.

### If-Else Statements

If statements can be created by using the `if` keyword. You can only use variables to check if statements.

*If the variable is not a boolean, it will evaluate to `true` if it is not `0` or an empty string `''`.*

Else statements can be created by using the `else` keyword and are optional.

```js
var array = [1, 2, 3]
var contains3 = find(array, 3)
contains3 = contains3 != -1
if (contains3) {
    reply('contains3 is Truthy')
} else {
    reply('contains3 is Falsy')
}
```

### ForEach Loops

ForEach loops can be created by using the `for in` keywords. You can use them to iterate over arrays.

```js
var array = [1, 2, 3]
var i = 0
for (elem in array) {
    var times2 = elem * 2
    set(array, i, times2)
    i = i + 1
}
```

`elem` is the current element in the array. `array` is the array to iterate over.

### While Loops

While loops can be created by using the `while` keyword. You can only use variables to check while statements.

```js
var i = 0
var isLessThan10 = true
var str = ''
while (isLessThan10) {
    str = concat(str, i, '\n')
    isLessThan10 = i < 10
    i = i + 1
}
reply(str)
```

The above example will send the following messages to the channel the command was called in.

```js
0
1
2
3
4
5
6
7
8
9
```

## Comments

Comments can be created by using the `//` keyword. Comments are ignored by the bot. They are used to document your code.

```js
// This is a comment
```
