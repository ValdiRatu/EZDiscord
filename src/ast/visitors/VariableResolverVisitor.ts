import { Bot, Config, Token, ClientId, GuildId } from "../nodes";
import { ArrayValue } from "../nodes/variables/ArrayValue";
import { BooleanValue } from "../nodes/variables/BooleanValue";
import { BuiltInFunction } from "../nodes/variables/BuiltInFunction";
import { NumberValue } from "../nodes/variables/NumberValue";
import { StringValue } from "../nodes/variables/StringValue";
import { Variable } from "../nodes/variables/Variable";
import { VarNameValue } from "../nodes/variables/VarNameValue";
import { ASTVisitor } from "./ASTVisitor";

export class VariableResolverVisitor implements ASTVisitor<void, string> {
    visitBot(bot: Bot, params: void): string {
        throw new Error("Method not implemented.");
    }
    visitConfig(config: Config, params: void): string {
        throw new Error("Method not implemented.");
    }
    visitToken(token: Token, params: void): string {
        throw new Error("Method not implemented.");
    }
    visitClientId(clientId: ClientId, params: void): string {
        throw new Error("Method not implemented.");
    }
    visitGuildId(guildId: GuildId, params: void): string {
        throw new Error("Method not implemented.");
    }
    visitArrayVarValue(arrVarVal: ArrayValue, params: void): string {
        const resolvedValue = arrVarVal.value.reduce((currentArray, type) => {

            return `${currentArray}${type.accept(this, undefined)},`
        }, '[ ')

        return `${resolvedValue.slice(0,-1)}]`
    }
    visitBooleanVarValue(booleanVarVal: BooleanValue, params: void): string {
        return String(booleanVarVal.value)
    }
    visitBuiltInFunctionVarValue(BuiltInFunction: BuiltInFunction, params: void): string {
        return "built in function TODO"
    }
    visitNumberVarValue(numberVarValue: NumberValue, params: void): string {
        return String(numberVarValue.value)
    }
    visitStringVarValue(stringVarValue: StringValue, params: void): string {
        return `"${stringVarValue.value}"`
    }
    visitVariable<Y>(variable: Variable<Y>, params: void): string {
        throw new Error("Should never be called")
    }
    visitVarNameValue(varName: VarNameValue, params: void): string {
        return varName.value
    }
    
}