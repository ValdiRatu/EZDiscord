parser grammar MathOperationsParser;
options { tokenVocab=EZDiscordLexer; }

// un comment to test in preview
//math_bot : START_BOT math END_BOT EOF;


math: mathExpression;
mathExpression: L_PAREN? DECIMAL (MATH_OPERATION DECIMAL)? R_PAREN? ((MATH_OPERATION mathExpression)*)?;

