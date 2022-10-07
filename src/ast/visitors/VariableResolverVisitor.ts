import { 
    ArrayValue,
    BinaryValue,
    BooleanValue,
    BuiltInFunction,
    MathValue,
    NumberValue,
    StringValue,
    VarNameValue
} from '../nodes';
import { ASTBaseVisitor } from "./ASTBaseVisitor";

export class VariableResolverVisitor extends ASTBaseVisitor<void, string> {
    
    visitArrayVarValue(arrVarVal: ArrayValue, params: void): string {
        const resolvedValue = arrVarVal.value.reduce((currentArray, type) => {
            return `${currentArray}${type.accept(this, undefined)},`
        }, '[ ');

        return `${resolvedValue.slice(0,-1)}]`;
    }

    visitBooleanVarValue(booleanVarVal: BooleanValue, params: void): string {
        return String(booleanVarVal.value);
    }

    visitBuiltInFunctionVarValue(builtInFunction: BuiltInFunction, params: void): string {

        const funcParams = builtInFunction.params.map(funcParam => funcParam.accept(this, undefined));

        let parameters = "";
        for (let param of funcParams) {
            parameters += `${param}, `;
        }
        return `${builtInFunction.name}(${parameters.slice(0, -2)})`;
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
    
}