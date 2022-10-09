import { 
    Argument,
    ArrayValue,
    BinaryValue,
    BooleanValue,
    FunctionCall,
    MathValue,
    NumberValue,
    StringValue,
    VarNameValue,
    ArgType
} from '../nodes';
import { ASTBaseVisitor } from "./ASTBaseVisitor";
import {BuiltInFunction} from "../nodes/FunctionCall";

/**
 * Resolves value to proper Typescript specification
 */
export class ValueResolverVisitor extends ASTBaseVisitor<void, string> { 
    visitArrayVarValue(arrVarVal: ArrayValue, params: void): string {
        const resolvedValue = arrVarVal.value.reduce((currentArray, type) => {
            return `${currentArray}${type.accept(this, undefined)},`
        }, '[ ');

        return `${resolvedValue.slice(0,-1)}]`;
    }

    visitBooleanVarValue(booleanVarVal: BooleanValue, params: void): string {
        return String(booleanVarVal.value);
    }

    visitBuiltInFunctionVarValue(builtInFunction: FunctionCall, params: void): string {

        const funcParams = builtInFunction.params.map(funcParam => funcParam.accept(this, undefined));

        let parameters = "";
        for (let param of funcParams) {
            parameters += `${param}, `;
        }
        if (builtInFunction.function === BuiltInFunction.reply) {
            // need to pass in the discordjs interaction object to the reply function
            return `await ${builtInFunction.function.valueOf()}(interaction, ${parameters.slice(0, -2)})`;
        }
        return `${builtInFunction.function}(${parameters.slice(0, -2)})`;
    }

    visitNumberVarValue(numberVarValue: NumberValue, params: void): string {
        return String(numberVarValue.value);
    }

    visitStringVarValue(stringVarValue: StringValue, params: void): string {
        return `"${stringVarValue.value}"`;
    }

    visitVarNameValue(varName: VarNameValue, params: void): string {
        return varName.value;
    }

    visitMathValue(mathValue: MathValue, params: void): string {
        return mathValue.value;
    }

    visitBinaryValue(binaryValue: BinaryValue, params: void): string {
        // currently a very hacky way to go about it
        return binaryValue.value.replace("not", "!").replace("and", "&&").replace("or", "||")
    }

    visitArgument(arg: Argument, params: void): string {
        switch(arg.type) {
            case ArgType.Boolean:
                return `.addBooleanOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`
            case ArgType.Number:
                return `.addNumberOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`
            case ArgType.String:
                return `.addStringOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`
        }
    }
    
}