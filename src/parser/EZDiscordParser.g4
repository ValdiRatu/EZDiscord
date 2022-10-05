parser grammar EZDiscordParser;
import ConfigParser, BinaryOperationsParser, MathOperationsParser, FunctionParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: config | comment;

comment: COMMENT;
