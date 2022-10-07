parser grammar ConditionParser;
options { tokenVocab=EZDiscordLexer; }

condition: conditionExpression;
conditionExpression: ;