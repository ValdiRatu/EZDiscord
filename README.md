# EZDiscord

## Compiling DSL code to TypeScript code:

- create/modify the `input.ezd` file at the root directory. 
  - Include the bot `Token`, `ClientID` and `GuildID`s taken from the Discord Developer Portal and Discord client.
  - Define the commands and variables according to the grammar rules.

<img width="903" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/938f1bdd-d068-45c2-9adb-b639445e2a0f">

- run `yarn ezd-compile` to generate a `.env` file and `output.ts` sourcefile
<img width="247" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/0efbcdf7-9497-472b-9eb0-4f6c5efd6f8b">

## Running the bot:
- After generating the `.env` file and the TypeScript code, run `yarn ezd-run` to start the bot
<img width="795" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/31a430ae-652e-49c5-907f-3923db7d5197">

## Compiling and running in one step

- run `yarn ezd-start` to compile the DSL code and run the bot
