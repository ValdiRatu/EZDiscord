import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { EZDiscordParserVisitor } from '../parser/EZDiscordParserVisitor';
import {
    BotContext,
    StatementContext,
    ConfigContext,
    ParamContext,
    TokenContext,
    StringContext,
    ClientIDContext,
    GuildIDContext,
    VariableDeclareContext,
    ValueContext,
    NumberContext,
    BooleanContext,
    FunctionCallContext,
    VarNameContext,
    ArrayContext,
    ElementContext,
    MathContext,
    BinaryContext,
    VariableAssignContext,
    ConditionContext,
    StatementBlockContext,
    CommandContext,
    ArgumentContext,
    TypeContext,
    LoopContext,
    WhileBlockContext,
    ForEachBlockContext,
} from '../parser/EZDiscordParser';
import {
    Bot,
    ASTNode,
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
    VarType,
    MathValue,
    BinaryValue,
    Conditional,
    StatementBlock,
    Argument,
    Command,
    WhileLoop,
    ForEachLoop
} from './nodes';
import {BuiltInFunction} from "./nodes/FunctionCall";
import { Type } from '../util/ScopedSymbolTable';

type AtomValue = StringValue | VarNameValue | NumberValue | BooleanValue | FunctionCall
type VariableValue = VarType<string | number | boolean> | BinaryValue

export class ParserToASTConverter extends AbstractParseTreeVisitor<ASTNode> implements EZDiscordParserVisitor<ASTNode> {
    protected defaultResult(): ASTNode {
        return new Bot(new Config(new Token(''), new ClientId(''), new GuildId([])), []);
    }

    visitBot(ctx: BotContext) {
        const config = this.visitConfig(ctx.config())
        const statements = ctx.statement().map(statementContext => this.visitStatement(statementContext));
        return new Bot(config, statements);
    }

    visitStatement(ctx: StatementContext) {
        return this.visitChildren(ctx);
    }

    visitConfig(ctx: ConfigContext) {
        return new Config(
            this.visitToken(ctx.token()!),
            this.visitClientID(ctx.clientID()!),
            this.visitGuildID(ctx.guildID()!)
        );
    }
    
    visitToken(ctx: TokenContext) {
        const stringNode = this.visitString(ctx.string());
        if (!stringNode.value) {
            throw Error("Token value is invalid")
        }
        return new Token(stringNode.value)
    }

    visitClientID(ctx: ClientIDContext) {
        const stringNode = this.visitString(ctx.string());
        if (!stringNode.value) {
            throw Error("Client ID value is invalid")
        }
        return new ClientId(stringNode.value)
    }

    visitGuildID(ctx: GuildIDContext) {
        return new GuildId(ctx.guildIDArray().string().map(idStringContext => idStringContext.text.split("'").join('')))
    }
    
    visitVariableDeclare(ctx: VariableDeclareContext) {
        return new Variable(
            ctx.VAR_NAME().text,
            this.visitValue(ctx.value()),
            true
        )
    }

    visitVariableAssign(ctx: VariableAssignContext) {
        return new Variable(
            ctx.VAR_NAME().text,
            this.visitValue(ctx.value()),
            false
        )
    }

    visitValue(ctx: ValueContext) {
        return this.visitChildren(ctx) as VariableValue
    }

    visitString(ctx: StringContext) {
        return new StringValue(ctx.STRING_VALUE()?.text ?? "");
    }

    visitNumber(ctx: NumberContext) {
        return new NumberValue(Number.parseFloat(ctx.NUMBER().text));
    }

    visitBoolean(ctx: BooleanContext) {
        return new BooleanValue(JSON.parse(ctx.BOOLEAN().text.toLowerCase()));
    }

    visitVarName(ctx: VarNameContext) {
        return new VarNameValue(ctx.VAR_NAME().text);
    }

    visitFunctionCall(ctx: FunctionCallContext) {
        return new FunctionCall(
            ctx.FUNCTION().text as BuiltInFunction,
            ctx.params().param().map(paramCtx => this.visitParam(paramCtx))
        )
    }

    visitParam(ctx: ParamContext) {
        return this.visitChildren(ctx) as AtomValue
    }

    visitArray(ctx: ArrayContext) {
        return new ArrayValue(
            ctx.element().map(elementCtx => this.visitElement(elementCtx))
        )
    }

    visitElement(ctx: ElementContext) {
        return this.visitChildren(ctx) as AtomValue
    }

    visitMath(ctx: MathContext) {
        return new MathValue(
            ctx.text
        )
    }

    visitBinary(ctx: BinaryContext) {
        // TODO: properly parse this later
        return new BinaryValue(
           ctx.text 
        )
    }

    visitCommand(ctx: CommandContext) {
        const name = ctx.VAR_NAME().text
        const args = ctx.argument().map(argCtx => this.visitArgument(argCtx));
        const statementBlock = this.visitStatementBlock(ctx.statementBlock());

        return new Command(name, statementBlock, args);
    }

    visitArgument(ctx: ArgumentContext) {
        const name = ctx.VAR_NAME().text;
        const type = this.getType(ctx.type());

        return new Argument(name, type);
    }

    // don't need an AST node returned so we don't use the visitor name
    getType(ctx: TypeContext) {
        const bool = ctx.BOOL();
        return ctx.BOOL()
            ? Type.Boolean
            : ctx.NUM()
            ? Type.Number
            : Type.String
    }

    visitCondition(ctx: ConditionContext) {
        const varName = ctx.conditionBlock().VAR_NAME().text;
        const ifStatementBlock = this.visitStatementBlock(ctx.conditionBlock().statementBlock());

        const elseStatBlockCtx = ctx.statementBlock();
        const elseStatementBlock = elseStatBlockCtx ? this.visitStatementBlock(elseStatBlockCtx) : undefined;

        return new Conditional(varName, ifStatementBlock, elseStatementBlock);
    }

    visitStatementBlock(ctx: StatementBlockContext) {
        const statements = ctx.blockStatement().map(statementCtx => this.visitChildren(statementCtx));
        return new StatementBlock(statements);
    }

    visitLoop(ctx: LoopContext) {
        return this.visitChildren(ctx);
    }

    visitWhileBlock(ctx: WhileBlockContext) {
        const varName = ctx.VAR_NAME().text;
        const statementBlock = this.visitStatementBlock(ctx.statementBlock());
        return new WhileLoop(varName, statementBlock);
    }

    visitForEachBlock(ctx: ForEachBlockContext) {
        const loopVarName = ctx.forEachBlockLoopVar().VAR_NAME().text;
        const arrayName = ctx.forEachBlockArray().VAR_NAME().text;
        const statementBlock = this.visitStatementBlock(ctx.statementBlock());
        return new ForEachLoop(loopVarName, arrayName, statementBlock);
    }
}
