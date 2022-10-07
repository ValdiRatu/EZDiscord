parser grammar VariableParser;
import FunctionCallParser, BinaryParser, MathParser, StringParser;
options { tokenVocab=EZDiscordLexer; }

variableDeclare: VAR VAR_NAME ASSIGNMENT_OP value;
variableAssign: VAR_NAME ASSIGNMENT_OP value;
value
    : BOOLEAN
    | NUMBER
    | string
    | VAR_NAME
    | functionCall
    | array
    | math
    | binary
    ;

array: L_SQUARE (element (COMMA element)*)? R_SQUARE;
element
    : string
    | VAR_NAME
    | NUMBER
    | BOOLEAN
    | functionCall
    ;
