parser grammar BinaryOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// Binary
binary: bianryExpression;
bianryExpression:
    L_PAREN bianryExpression R_PAREN |
    NOT bianryExpression |
    bianryExpression BINARY_COMPARATOR bianryExpression |
    bianryExpression BINARY_OPERATOR bianryExpression |
    BOOL |
    DECIMAL
//    VARIABLE     To be done
    ;