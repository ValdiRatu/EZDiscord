parser grammar ConditionAndLoopParser;
import BinaryParser, FunctionCallParser, VariableParser;
options { tokenVocab=EZDiscordLexer; }

condition: IF conditionBlock (ELSE statBlock)?;
conditionBlock: L_PAREN VAR_NAME R_PAREN statBlock;

loop
    : WHILE whileBlock
    | FOR forEachBlock
    ;

whileBlock: L_PAREN VAR_NAME R_PAREN statBlock;
forEachBlock: L_PAREN forEachBlockArray IN forEachBlockLoopVar R_PAREN statBlock;
forEachBlockArray: VAR_NAME;
forEachBlockLoopVar: VAR_NAME;

statBlock: L_CURLY (conditionAndLoopStatement)* R_CURLY;
conditionAndLoopStatement
    : functionCall
    | condition
    | variableAssign
    | variableDeclare
    | loop
    ;
