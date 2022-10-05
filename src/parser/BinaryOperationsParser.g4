parser grammar BinaryOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//binary_bot : START_BOT binary+ END_BOT EOF;

// Binary
binary: bianryExpression;
bianryExpression:
    LPAREN bianryExpression RPAREN
    | NOT bianryExpression
    | bianryExpression BINARY_COMPARATOR bianryExpression
    | bianryExpression BINARY_OPERATOR bianryExpression
    | BOOL
    | DECIMAL
//    | VARIABLE     To be done
    ;