parser grammar FunctionParser;
options { tokenVocab=EZDiscordLexer; }

// Array Functions
function: FUNCTION params;
nestedFunction: FUNCTION_NESTED params;
params: PARAMS_START (param ( FUNCTION_PARAM_SEP param )*)? PARAMS_END;
param: FUNCTION_VARIABLE | FUNCTION_BOOLEAN | functionString | FUNCTION_NUMBER | nestedFunction;
functionString: FUNCTION_STRING_START STRING_VALUE? STRING_END;
