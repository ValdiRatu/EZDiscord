import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { EZDiscordParserVisitor } from '../parser/EZDiscordParserVisitor';
import { Bot } from './nodes/Bot';
import { ASTNode } from './nodes/ASTNode';
import { BotContext, StatementContext, ConfigContext } from '../parser/EZDiscordParser';
import { Token } from './nodes/Token';
import { Config } from './nodes/Config';
import { ClientId } from './nodes/ClientId';
import { GuildId } from './nodes/GuildId';


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

}