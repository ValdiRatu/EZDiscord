parser grammar ConfigParser;
import PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

config
    : token clientID guildID
    | token guildID clientID
    | clientID token guildID
    | guildID token clientID
    | clientID guildID token
    | guildID clientID token
    ;

token: TOKEN ASSIGNMENT_OP string;

clientID: CLIENT_ID ASSIGNMENT_OP string;

guildID: GUILD_ID ASSIGNMENT_OP guildIDArray;

guildIDArray: L_SQUARE string (COMMA string)* R_SQUARE;
