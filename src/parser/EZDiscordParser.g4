parser grammar EZDiscordParser;
import ConfigParser, BinaryOperationsParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: config binary;

