parser grammar BinaryParser;
import FunctionCallParser, StringParser;
options { tokenVocab=EZDiscordLexer; }

binary: binaryExpr;

binaryExpr
    : L_PAREN (binaryExpr | BOOLEAN | string) R_PAREN binaryExprRight?
    | NOT (binaryExpr | binaryAtom) binaryExprRight?
    | binaryAtom binaryExprRight
    ;

binaryAtom
    : BOOLEAN
    | NUMBER
    | VAR_NAME
    | string
    | functionCall
    ;

binaryExprRight
    : BINARY_COMPARE (binaryExpr | binaryAtom) binaryExprRight?
    | BINARY_OP (binaryExpr | binaryAtom) binaryExprRight?
    ;
