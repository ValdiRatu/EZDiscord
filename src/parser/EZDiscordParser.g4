parser grammar EZDiscordParser;
import ConfigParser, BinaryOperationsParser, MathOperationsParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: config;

