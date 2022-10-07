parser grammar FunctionCallParser;
import StringParser;
options { tokenVocab=EZDiscordLexer; }

functionCall: FUNCTION params;
params: L_PAREN (param ( COMMA param )*)? R_PAREN;
param
    : VAR_NAME
    | BOOLEAN
    | NUMBER
    | string
    | functionCall
    ;
