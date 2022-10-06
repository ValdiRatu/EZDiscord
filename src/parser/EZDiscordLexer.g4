lexer grammar EZDiscordLexer;

// DEFAULT_MODE
WS: [\r\n\t ] -> skip;
START_BOT: 'start bot' -> pushMode(CREATE_BOT_MODE);

mode CREATE_BOT_MODE;
CREATE_BOT_WS: [\r\n\t ] -> skip;

// coment
COMMENT: '//' ~[\r\n]* -> skip;

// Configs
TOKEN_START: 'Token' -> pushMode(TOKEN_MODE);
CLIENT_ID_START: 'ClientID' -> pushMode(CLIENT_ID_MODE);
GUILD_ID_START: 'GuildID' -> pushMode(GUILD_ID_MODE);

// Binary
BINARY_OPERATOR: AND | OR;

BOOL: TRUE | FALSE;

BINARY_COMPARATOR: GT | GE | LT | LE | EQ | NQ;
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
DECIMAL    : [0-9]+ ( '.' [0-9]+ )? ;

// Math operations
ADD: '+';
SUB: '-';
MULT: '*';
DIV: '/';
MOD: '%';


// Variables
ASSIGNMENT_OPERATOR: '=';

// Functions
FUNCTION: ('random' | 'add' | 'remove' | 'get' | 'set' | 'len' | 'find' | 'reply') -> pushMode(FUNCTION_MODE);

// Brackets
S_QUOTE : '\'';
L_CURLY : '{';
R_CURLY : '}';
L_SQUARE : '[';
R_SQUARE : ']';
L_PAREN : '(';
R_PAREN : ')';

// Punctuation
COMMA : ',';

IF_TOKEN: 'if';
ELSE: 'else';

END_BOT: 'end bot' -> popMode;

// Config Modes
mode TOKEN_MODE;
TOKEN_WS: [\r\n\t ] -> skip;
TOKEN_ASSIGNMENT : ASSIGNMENT_OPERATOR;
// need to check that size is 72 when creating the AST
TOKEN_VALUE: [a-zA-Z0-9\-._]+;
TOKEN_STRING: S_QUOTE TOKEN_VALUE S_QUOTE -> popMode;

mode CLIENT_ID_MODE;
CLIENT_ID_WS: [\r\n\t ] -> skip;
CLIENT_ID_ASSIGNMENT : ASSIGNMENT_OPERATOR;
// need to check that size is 19 when creating the AST
CLIENT_ID_VALUE: [0-9]+;
CLIENT_ID_STRING: S_QUOTE CLIENT_ID_VALUE S_QUOTE -> popMode;

mode GUILD_ID_MODE;
GUILD_ID_WS: [\r\n\t ] -> skip;
GUILD_ID_ASSIGNMENT : ASSIGNMENT_OPERATOR;
// need to check that size is 19 when creating the AST
GUILD_ID_VALUE: [0-9]+;
GUILD_ID_STRING: S_QUOTE GUILD_ID_VALUE S_QUOTE;
GUILD_ID_ARRAY_SEPARATOR: COMMA;
GUILD_ID_ARRAY_OPEN: L_SQUARE;
GUILD_ID_ARRAY_CLOSE: R_SQUARE -> popMode;

// Function Modes
mode FUNCTION_MODE;
FUNCTION_WS: [\r\n\t ] -> skip;
FUNCTION_NESTED: FUNCTION -> pushMode(FUNCTION_MODE);
// TODO: Adding support for the following as parameters:
//  - math expressions: add(<name>, 1 + 3 + numberA + arrayN[0])
//  - logical expressions:  add(<name>, a != b AND (b == TRUE) OR (arrayB[0] == FALSE))
//  - string expressions:  add(<name>, 'a' + stringB + 'b' + arrayS[0])
FUNCTION_PARAM_SEP: COMMA;
PARAMS_START: L_PAREN;
FUNCTION_STRING_START: S_QUOTE -> pushMode(STRING_MODE);
FUNCTION_NUMBER: DECIMAL;
FUNCTION_BOOLEAN: BOOL;
FUNCTION_VARIABLE: [a-zA-Z][a-zA-Z0-9_]*;
PARAMS_END: R_PAREN -> popMode;

mode STRING_MODE;
STRING_VALUE: ~[\r\n\t']+;
STRING_END: S_QUOTE -> popMode;


