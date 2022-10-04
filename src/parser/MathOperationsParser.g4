parser grammar MathOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//math_bot : START_BOT math+ END_BOT EOF;


math: mathExpression;
mathExpression: LPAREN? DECIMAL MATH_OPERATION DECIMAL RPAREN? (MATH_OPERATION? mathExpression*);