parser grammar VariableParser;
import FunctionParser;
options { tokenVocab=EZDiscordLexer; }

variable: VAR vVariable VARIABLE_ASSIGNMENT value END_VAR;
value: vString | vVariable| vNumber | vBoolean | vFunction;
vString: VARIABLE_STRING_START STRING_VALUE? STRING_END;
vVariable: VARIABLE_NAME;
vBoolean: VARIABLE_BOOLEAN;
vNumber: VARIABLE_NUMBER;
vFunction: VARIABLE_FUNCTION params;
