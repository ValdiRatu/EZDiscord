import {
    Bot,
    ClientId,
    Config,
    GuildId,
    Token,
    ArrayValue,
    BooleanValue,
    FunctionCall,
    NumberValue,
    StringValue,
    Variable,
    VarNameValue,
    BinaryValue,
    MathValue,
    Command,
    Argument,
    ForEachLoop,
    WhileLoop,
    Conditional,
    StatementBlock
} from '../nodes';

export interface ASTVisitor<T, U> {
    visitBot(bot: Bot, params: T): U;
    visitConfig(config: Config, params: T): U;
    visitToken(token: Token, params: T): U;
    visitClientId(clientId: ClientId, params: T) : U;
    visitGuildId(guildId: GuildId, params: T) : U;
    visitArrayVarValue(arrVarVal: ArrayValue, params: T) : U;
    visitBooleanVarValue(booleanVarVal: BooleanValue, params: T) : U;
    visitBuiltInFunctionVarValue(BuiltInFunction: FunctionCall, params: T) : U;
    visitNumberVarValue(numberVarValue: NumberValue, params: T): U;
    visitStringVarValue(stringVarValue: StringValue, params: T): U;
    visitVariable<Y>(variable: Variable<Y>, params: T): U;
    visitVarNameValue(varName: VarNameValue, params: T): U;
    visitBinaryValue(binaryValue: BinaryValue, params: T): U;
    visitMathValue(mathValue: MathValue, params: T): U;
    visitConditional(conditional: Conditional, params: T): U;
    visitStatementBlock(block: StatementBlock, params: T): U;
    visitCommand(command: Command, params: T): U;
    visitArgument(arg: Argument, params: T): U;
    visitForEachLoop(forEachLoop: ForEachLoop, params: T): U;
    visitWhileLoop(whileLoop: WhileLoop, params: T): U;
}