parser grammar MathParser;
import FunctionCallParser, PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

math: mathTerm mathExprPrime;
mathExprPrime: ((ADD | SUB) mathTerm mathExprPrime) |;
mathTerm: mathFactor mathTermPrime;
mathTermPrime: ((MULT | DIV | MOD) mathFactor mathTermPrime) |;
mathFactor: (SUB)? mathAtom | L_PAREN math R_PAREN;

mathAtom
    : number
    | varName
    // | functionCall This requires us to actually go into the tree which is a lot of work for now so maybe defer?
    ;
