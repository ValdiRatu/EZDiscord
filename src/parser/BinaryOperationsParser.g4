parser grammar BinaryOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//binary_bot : START_BOT binary+ END_BOT EOF;


// Binary
binary: bianryExpression;
bianryExpression:
    NOT bianryExpression bianryExpressionRight?
    | BOOL bianryExpressionRight?
    | DECIMAL bianryExpressionRight?
//    | VARIABLE     TODO
    ;

bianryExpressionRight:
    BINARY_COMPARATOR bianryExpression bianryExpressionRight?
    | BINARY_OPERATOR bianryExpression bianryExpressionRight?
    ;