import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { EZDiscordParserVisitor } from '../parser/EZDiscordParserVisitor';
import { BotContext, StatementContext, ConfigContext, VariableContext, VBooleanContext, VNumberContext, VStringContext, VArrayContext, VVariableContext } from '../parser/EZDiscordParser';
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
}
