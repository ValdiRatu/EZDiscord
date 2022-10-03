lexer grammar EZDiscordLexer;

// DEFAULT_MODE
START_BOT: 'start bot' WS* -> pushMode(CREATE_BOT_MODE);

mode CREATE_BOT_MODE;
WS: [\r\n\t ] -> channel(HIDDEN);

// Configs
TOKEN_START: 'Token' ASSINGMENT_OPERATOR DOUBLE_QUOTE -> pushMode(TOKEN_MODE);
CLIENT_ID_START: 'ClientID' ASSINGMENT_OPERATOR DOUBLE_QUOTE -> pushMode(CLIENT_ID_MODE);
GUILD_ID_START: 'GuildID' ASSINGMENT_OPERATOR ARRAY_START -> pushMode(GUILD_ID_MODE);

// Variables
ASSINGMENT_OPERATOR: '=';

// Array
ARRAY_START: '[';
ARRAY_END: ']';
ARRAY_SEPARATOR: ',';

// Binary
BINARY_OPERATOR: AND | OR;

BOOL: TRUE | FALSE;

BINARY_COMPARATOR: [GT | GE | LT | LE | EQ | NQ];
AND        : 'AND' ;
OR         : 'OR' ;
NOT        : 'NOT';
TRUE       : 'TRUE' ;
FALSE      : 'FALSE' ;
GT         : '>' ;
GE         : '>=' ;
LT         : '<' ;
LE         : '<=' ;
EQ         : '==' ;
NQ         : '!=' ;
LPAREN     : '(' ;
RPAREN     : ')' ;
DECIMAL    : '-'? [0-9]+ ( '.' [0-9]+ )? ;


// Miscellanious
DOUBLE_QUOTE: '"';

END_BOT: 'end bot' -> popMode;

// Config Modes

mode TOKEN_MODE;
TOKEN_WS: [\r\n\t ] -> channel(HIDDEN);
// need to check that size is 72 when creating the AST
TOKEN_VALUE: [a-zA-Z0-9\-._]+;
TOKEN_END: DOUBLE_QUOTE -> popMode;

mode CLIENT_ID_MODE;
CLIENT_ID_WS: [\r\n\t ] -> channel(HIDDEN);
// need to check that size is 19 when creating the AST
CLIENT_ID_VALUE: [0-9]+;
CLIENT_ID_END: DOUBLE_QUOTE -> popMode;

mode GUILD_ID_MODE;
GUILD_ID_WS: [\r\n\t ] -> channel(HIDDEN);
// need to check that size is 19 when creating the AST
GUILD_ID_VALUE: [0-9]+;
GUILD_ID_STRING: DOUBLE_QUOTE GUILD_ID_VALUE DOUBLE_QUOTE;
GUILD_ID_SEPARATOR: ARRAY_SEPARATOR;
GUILD_ID_END: ARRAY_END -> popMode;
