parser grammar EZDiscordParser;
import ConfigParser, BinaryOperationsParser, MathOperationsParser, FunctionParser, VariableParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: config | comment | variable;

comment: COMMENT;