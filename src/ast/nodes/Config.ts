import { ClientId } from "./ClientId";
import { ASTNode } from "./ASTNode";
import { Token } from "./Token";
import { GuildId } from "./GuildId";
import { ASTVisitor } from "../visitors/ASTVisitor";
export class Config implements ASTNode {
    constructor(private _item: Token | ClientId | GuildId) {}
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitConfig(this, params);
    }

    get item() {
        return this._item;
    }
}
