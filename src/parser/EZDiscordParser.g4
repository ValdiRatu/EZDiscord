parser grammar EZDiscordParser;
import ConfigParser, VariableParser;
options { tokenVocab=EZDiscordLexer; }

bot : config statement* EOF;

statement
    : variableDeclare
    | variableAssign
    ;
