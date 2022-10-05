import { Bot } from "../nodes/Bot";
import { ClientId } from "../nodes/ClientId";
import { Config } from "../nodes/Config";
import { GuildId } from "../nodes/GuildId";
import { Token } from "../nodes/Token";
import { ArrayValue } from "../nodes/variables/ArrayValue";
import { BooleanValue } from "../nodes/variables/BooleanValue";
import { BuiltInFunction } from "../nodes/variables/BuiltInFunction";
import { NumberValue } from "../nodes/variables/NumberValue";
import { StringValue } from "../nodes/variables/StringValue";
import { Variable } from "../nodes/variables/Variable";
import { VarNameValue } from "../nodes/variables/VarNameValue";

export interface ASTVisitor<T, U> {
    visitBot(bot: Bot, params: T): U;
    visitConfig(config: Config, params: T): U;
    visitToken(token: Token, params: T): U;
    visitClientId(clientId: ClientId, params: T) : U;
    visitGuildId(guildId: GuildId, params: T) : U;
    visitArrayVarValue(arrVarVal: ArrayValue, params: T) : U;
    visitBooleanVarValue(booleanVarVal: BooleanValue, params: T) : U;
    visitBuiltInFunctionVarValue(BuiltInFunction: BuiltInFunction, params: T) : U;
    visitNumberVarValue(numberVarValue: NumberValue, params: T): U;
    visitStringVarValue(stringVarValue: StringValue, params: T): U;
    visitVariable<Y>(variable: Variable<Y>, params: T): U;
    visitVarNameValue(varName: VarNameValue, params: T): U;
}