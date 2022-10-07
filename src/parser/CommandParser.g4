parser grammar CommandParser;
import FunctionCallParser, VariableParser, ConditionAndLoopParser;
options { tokenVocab=EZDiscordLexer; }

command: COMMAND VAR_NAME L_PAREN (argument (COMMA argument)*)? R_PAREN commandBlock;

argument: VAR_NAME COLON type;

type
    : BOOL
    | NUM
    | STR
    ;

commandBlock: L_CURLY (commandStatement)* R_CURLY;

commandStatement
    : functionCall
    | variableDeclare
    | variableAssign
    | loop
    | condition
    ;
