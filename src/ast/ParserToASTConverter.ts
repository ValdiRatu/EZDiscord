import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { EZDiscordParserVisitor } from '../parser/EZDiscordParserVisitor';
import {
    BotContext, 
    StatementContext, 
    ConfigContext, 
    VariableContext, 
    VBooleanContext, 
    VNumberContext, 
    VStringContext, 
    VArrayContext, 
    VVariableContext, 
    ABooleanContext,
    AVariableContext,
    ANumberContext,
    AStringContext,
    VFunctionContext,
    ParamContext,
    FunctionStringContext,
    NestedFunctionContext
} from '../parser/EZDiscordParser';
import { Bot, ASTNode, Token, Config, ClientId, GuildId } from './nodes';
import { Variable } from './nodes/variables/Variable';
import { VarType } from './nodes/variables/VarType';
import { BooleanValue } from './nodes/variables/BooleanValue';
import { BuiltInFunction } from './nodes/variables/BuiltInFunction';
import { NumberValue } from './nodes/variables/NumberValue';
import { StringValue } from './nodes/variables/StringValue';
import { ArrayValue } from './nodes/variables/ArrayValue';
import { VarNameValue } from './nodes/variables/VarNameValue';

export class ParserToASTConverter extends AbstractParseTreeVisitor<ASTNode> implements EZDiscordParserVisitor<ASTNode> {
    protected defaultResult(): ASTNode {
        return new Bot([]);
    }

    visitBot(ctx: BotContext) {
        const statements = ctx.statement().map(statementContext => this.visitStatement(statementContext));
        return new Bot(statements);
    }

    visitStatement(ctx: StatementContext) {
        return this.visitChildren(ctx);
    }

    visitConfig(ctx: ConfigContext) {
        const tokenContext = ctx.token();
        const clientIdContext = ctx.clientID();
        const guildIdContext = ctx.guildID();

        if (tokenContext) {
            return new Config(new Token(tokenContext.TOKEN_STRING().text.split("'").join('')));
        } else if (clientIdContext) {
            return new Config(new ClientId(clientIdContext.CLIENT_ID_STRING().text.split("'").join('')));
        } else if (guildIdContext) {
            return new Config(new GuildId(guildIdContext.guildIDArray().GUILD_ID_STRING().map(idStringContext => idStringContext.text.split("'").join(''))))
        }

        throw new Error("Empty config object");
    }

    visitVariable(ctx: VariableContext) {
        const varName = ctx.vVariable().VARIABLE_NAME().text;
        const varValue = ctx.value().accept(this) as VarType<boolean | string | number | any[]> | BuiltInFunction;

        return new Variable(varName, varValue);
    }

    visitVVariable(ctx: VVariableContext){
        return new VarNameValue(ctx.VARIABLE_NAME().text);
    }

    visitVBoolean(ctx: VBooleanContext) {
        const value = JSON.parse(ctx.VARIABLE_BOOLEAN().text.toLowerCase()) as boolean;

        return new BooleanValue(value);
    }


    visitVNumber(ctx: VNumberContext) {
        const value = Number.parseFloat(ctx.VARIABLE_NUMBER().text);

        return new NumberValue(value);
    }

    visitVString(ctx: VStringContext) {
        const stringValueCtx = ctx.STRING_VALUE();
        return new StringValue(stringValueCtx ? stringValueCtx.text : "");
    }

    visitVArray(ctx: VArrayContext) {
        const elements: any[] = ctx.element().map(e => e.accept(this));

        return new ArrayValue(elements);
    }

    visitVFunction(ctx: VFunctionContext) {

        const name = ctx.VARIABLE_FUNCTION().text;

        const params = ctx.params().param().map(paramCtx => this.visitParam(paramCtx));

        return new BuiltInFunction(name, params);
    }

    visitAVariable(ctx: AVariableContext) {
        return new VarNameValue(ctx.ARRAY_VARIABLE().text);
    }

    visitABoolean(ctx: ABooleanContext) {
        const value = JSON.parse(ctx.ARRAY_BOOLEAN().text.toLowerCase()) as boolean;

        return new BooleanValue(value);
    }

    visitANumber(ctx: ANumberContext) {
        const value = Number.parseFloat(ctx.ARRAY_NUMBER().text);

        return new NumberValue(value);
    }

    visitAString(ctx: AStringContext) {
        const stringValueCtx = ctx.STRING_VALUE();
        return new StringValue(stringValueCtx ? stringValueCtx.text : "");
    }

    visitParam(ctx: ParamContext) {
        const functionVariableCtx = ctx.FUNCTION_VARIABLE();
        const functionNumberCtx = ctx.FUNCTION_NUMBER();
        const functionStringCtx = ctx.functionString();
        const functionBooleanCtx = ctx.FUNCTION_BOOLEAN();
        const functionNestedCtx = ctx.nestedFunction();
 
        if (functionVariableCtx) {
            return new VarNameValue(functionVariableCtx.text);
        } else if (functionNumberCtx) {
            return new NumberValue(parseFloat(functionNumberCtx.text));
        } else if (functionStringCtx) {
            return this.visitFunctionString(functionStringCtx);
        } else if (functionBooleanCtx) {
            const value = JSON.parse(functionBooleanCtx.text.toLowerCase()) as boolean;
            return new BooleanValue(value);
        } else if (functionNestedCtx) {
            return this.visitNestedFunction(functionNestedCtx);
        }
        throw new Error("AHHH");
    }

    visitFunctionString(ctx: FunctionStringContext) {
        const stringCtx = ctx.STRING_VALUE();
        return new StringValue(stringCtx ? stringCtx.text : "");
    }

    visitNestedFunction(ctx: NestedFunctionContext) {
        const name = ctx.FUNCTION_NESTED().text;
        const nestedParams: any = ctx.params().param().map(paramCtx => this.visitParam(paramCtx));

        return new BuiltInFunction(name, nestedParams);
    }

}
