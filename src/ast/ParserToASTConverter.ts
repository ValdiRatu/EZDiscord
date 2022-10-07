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
    Var_nameContext,
    ArrayContext,
    ElementContext,
    MathContext,
    BinaryContext, VariableAssignContext
} from '../parser/EZDiscordParser';
import { Bot, ASTNode, Token, Config, ClientId, GuildId, MathValue, BinaryValue } from './nodes';
import { Variable } from './nodes/variables/Variable';
import { VarType } from './nodes/variables/VarType';
import { BooleanValue } from './nodes/variables/BooleanValue';
import { BuiltInFunction } from './nodes/variables/BuiltInFunction';
import { NumberValue } from './nodes/variables/NumberValue';
import { StringValue } from './nodes/variables/StringValue';
import { ArrayValue } from './nodes/variables/ArrayValue';
import { VarNameValue } from './nodes/variables/VarNameValue';

type AtomValue = StringValue | VarNameValue | NumberValue | BooleanValue | BuiltInFunction
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
            this.visitToken(ctx.token()),
            this.visitClientID(ctx.clientID()),
            this.visitGuildID(ctx.guildID())
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

    visitVar_name(ctx: Var_nameContext) {
        return new VarNameValue(ctx.VAR_NAME().text);
    }

    visitFunctionCall(ctx: FunctionCallContext) {
        return new BuiltInFunction(
            ctx.FUNCTION().text,
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
}
