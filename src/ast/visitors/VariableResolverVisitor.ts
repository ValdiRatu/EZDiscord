import { 
    ArrayValue,
    BooleanValue,
    BuiltInFunction,
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

    visitBuiltInFunctionVarValue(BuiltInFunction: BuiltInFunction, params: void): string {
        return "built in function TODO";
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
    
}