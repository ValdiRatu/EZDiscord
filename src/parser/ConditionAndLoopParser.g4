parser grammar ConditionAndLoopParser;
import BinaryParser, FunctionCallParser, VariableParser;
options { tokenVocab=EZDiscordLexer; }

condition: IF conditionBlock (ELSE statBlock)?;
conditionBlock: L_PAREN VAR_NAME R_PAREN statBlock;

loop:
    WHILE whileBlock
    | FOR forBlock
    ;

whileBlock: L_PAREN VAR_NAME R_PAREN statBlock;
forBlock: L_PAREN VAR_NAME IN VAR_NAME R_PAREN statBlock;

statBlock: L_CURLY (conditionAndLoopStatement)* R_CURLY;
conditionAndLoopStatement:
    functionCall
    | condition
    | variableAssign
    | variableDeclare
    | loop
    ;
