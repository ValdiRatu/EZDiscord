parser grammar MathParser;
import FunctionCallParser;
options { tokenVocab=EZDiscordLexer; }

math: mathTerm mathExprPrime;
mathExprPrime: ((ADD | SUB) mathTerm mathExprPrime) |;
mathTerm: mathFactor mathTermPrime;
mathTermPrime: ((MULT | DIV | MOD) mathFactor mathTermPrime) |;
mathFactor: (SUB)? mathAtom | L_PAREN math R_PAREN;

mathAtom
    : NUMBER
    | VAR_NAME
    | functionCall
    ;
