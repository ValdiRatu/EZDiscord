parser grammar StringParser;
options { tokenVocab=EZDiscordLexer; }

string: S_QUOTE STRING_VALUE? STRING_CLOSE;
