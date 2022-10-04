import { ClientId } from "./ClientId";
import { ASTNode } from "./ASTNode";
import { Token } from "./Token";
import { GuildId } from "./GuildId";

export class Config implements ASTNode {
    constructor(private _item: Token | ClientId | GuildId) {}

    evaluate() {} 
}
