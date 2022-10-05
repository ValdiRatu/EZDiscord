parser grammar VariableParser;
options { tokenVocab=EZDiscordLexer; }

variable: VAR vVariable VARIABLE_ASSIGNMENT value END_VAR;
value: vString | vVariable| vNumber | vBoolean;
vString: VARIABLE_STRING_START STRING_VALUE? STRING_END;
vVariable: VARIABLE_NAME;
vBoolean: VARIABLE_BOOLEAN;
vNumber: VARIABLE_NUMBER;
