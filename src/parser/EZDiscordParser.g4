parser grammar EZDiscordParser;
options { tokenVocab=EZDiscordLexer; }

bot : START_BOT statement* END_BOT EOF;

statement: (config | binary);

// Configs
config: (token | clientID | guildID);
token: TOKEN_START TOKEN_ASSIGNMENT TOKEN_STRING;
clientID: CLIENT_ID_START CLIENT_ID_ASSIGNMENT CLIENT_ID_STRING;
guildID: GUILD_ID_START GUILD_ID_ASSIGNMENT guildIDArray;
guildIDArray: GUILD_ID_ARRAY_OPEN (GUILD_ID_STRING (GUILD_ID_ARRAY_SEPARATOR GUILD_ID_STRING)*) GUILD_ID_ARRAY_CLOSE;

// Binary
binary: bianryExpression;
bianryExpression: 
    LPAREN bianryExpression RPAREN |
    NOT bianryExpression |
    bianryExpression BINARY_COMPARATOR bianryExpression |
    bianryExpression BINARY_OPERATOR bianryExpression |
    BOOL |
    DECIMAL |
//    VARIABLE     To be done
    ;
