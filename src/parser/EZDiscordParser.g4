parser grammar EZDiscordParser;
import ConfigParser, VariableParser, CommandParser,
ConditionAndLoopParser; // here for testing - will remove when no longer needed
options { tokenVocab=EZDiscordLexer; }

bot : config statement* EOF;

statement
    : variableDeclare
    | command
    | condition // this is temporary - it's here for testing while commands are WIP
    | loop      // this is temporary - it's here for testing while commands are WIP
    ;
