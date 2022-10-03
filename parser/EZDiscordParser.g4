parser grammar EZDiscordParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: (config);

// Configs
config: (token | clientID | guildID);
token: TOKEN_START TOKEN_VALUE TOKEN_END;
clientID: CLIENT_ID_START CLIENT_ID_VALUE CLIENT_ID_END;
guildID: GUILD_ID_START guildIDArray GUILD_ID_END;
guildIDArray: (GUILD_ID_STRING (GUILD_ID_SEPARATOR GUILD_ID_STRING)*);
