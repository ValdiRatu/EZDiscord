parser grammar MathOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//math_bot : START_BOT math END_BOT EOF;

math: mathExpression;
//mathExpression: mathTerm mathExpressionPrime;
//mathExpressionPrime: ((ADD | SUB) mathTerm mathExpressionPrime) |;
//mathTerm: mathFactor mathTermPrime;
//mathTermPrime: ((MULT | DIV | MOD) mathFactor mathTermPrime) |;
//mathFactor: (SUB)? DECIMAL | L_PAREN math R_PAREN;

mathExpression:
    L_PAREN mathExpression R_PAREN mathExpressionRight?
    | (SUB)? DECIMAL mathExpressionRight?
    ;
mathExpressionRight:
     (ADD | SUB | MULT | DIV | MOD) mathExpression mathExpressionRight?
    ;

