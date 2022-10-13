# EZDiscord

A simple, easy way to create Discord bots.

## Setting up a Development Environment

- Run `yarn install` to download dependencies
- Run `yarn antlr` to generate the antlr files required by the parse tree to AST converter.

## Documentation

Read the [Getting Started Guide](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Getting-Started)

Documentation for the EZDiscord Language can be found [here](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation).

## Compiling DSL code to TypeScript code

- create/modify the `bot.ezd` file in the root directory. 
  - Include the bot `Token`, `ClientID` and `GuildID`s taken from the Discord Developer Portal and Discord client.
  - Define the commands and variables according to the [documentation](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation).

![](https://media.github.students.cs.ubc.ca/user/10171/files/58805e5c-486e-45d3-8dc0-241148cedb39)

- run `yarn ezd-compile` to generate a `.env` file and an `output.ts` sourcefile
<img width="247" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/0efbcdf7-9497-472b-9eb0-4f6c5efd6f8b">

## Running the bot

- After generating the `.env` file and the TypeScript code, run `yarn ezd-run` to start the bot

<img width="795" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/31a430ae-652e-49c5-907f-3923db7d5197">

## Compiling and running in one step

- run `yarn ezd-start` to compile the DSL code and run the bot

## Syntax Highlighting

- Syntax highlighting is available for EZDiscord. You can install the [extension](https://marketplace.visualstudio.com/items?itemName=AsadDhorajiwala.ezdiscord-syntax-highlighter) from the VS Code Marketplace.
