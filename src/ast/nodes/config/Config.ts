import { ClientId } from "./ClientId";
import { ASTVisitor } from "../../visitors/ASTVisitor";
import { ASTNode } from "../ASTNode";
import { Token } from "./Token";
import { GuildId } from "./GuildId";

export class Config implements ASTNode {
    constructor(private _item: Token | ClientId | GuildId) {}
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitConfig(this, params);
    }

    get item() {
        return this._item;
    }
}
