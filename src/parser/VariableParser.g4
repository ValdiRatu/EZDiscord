parser grammar VariableParser;
import FunctionParser;
options { tokenVocab=EZDiscordLexer; }

variable: VAR vVariable VARIABLE_ASSIGNMENT value END_VAR;
value: vString | vVariable| vNumber | vBoolean | vFunction | vArray;
vString: VARIABLE_STRING_START STRING_VALUE? STRING_END;
vVariable: VARIABLE_NAME;
vBoolean: VARIABLE_BOOLEAN;
vNumber: VARIABLE_NUMBER;
vFunction: VARIABLE_FUNCTION params;

vArray: VARIABLE_ARRAY_START (element (ARRAY_SEPARATOR element)*)? ARRAY_END;
element: aString | aVariable| aBoolean | aNumber | aFunction;
aString: ARRAY_STRING_START STRING_VALUE? STRING_END;
aVariable: ARRAY_VARIABLE;
aBoolean: ARRAY_BOOLEAN;
aNumber: ARRAY_NUMBER;
aFunction: ARRAY_FUNCTION params;   // built ins not just arrays
