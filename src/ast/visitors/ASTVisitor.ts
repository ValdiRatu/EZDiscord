import { Bot } from "../nodes/Bot";
import { ClientId } from "../nodes/ClientId";
import { Config } from "../nodes/Config";
import { GuildId } from "../nodes/GuildId";
import { Token } from "../nodes/Token";

export interface ASTVisitor<T, U> {
    visitBot(bot: Bot, params: T): U;
    visitConfig(config: Config, params: T): U;
    visitToken(token: Token, params: T): U;
    visitClientId(clientId: ClientId, params: T) : U;
    visitGuildId(guildId: GuildId, params: T) : U;
}