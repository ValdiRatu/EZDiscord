parser grammar BinaryOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// Binary
binary: bianryExpression;
bianryExpression:
    LPAREN bianryExpression RPAREN |
    NOT bianryExpression |
    bianryExpression BINARY_COMPARATOR bianryExpression |
    bianryExpression BINARY_OPERATOR bianryExpression |
    BOOL |
    DECIMAL
//    VARIABLE     To be done
    ;