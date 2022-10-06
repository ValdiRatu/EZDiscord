parser grammar ConditionParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//condition_bot : START_BOT condition END_BOT EOF;


condition: conditionExpression;
conditionExpression: ;