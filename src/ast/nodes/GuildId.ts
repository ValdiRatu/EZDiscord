import { ASTNode } from "./ASTNode";

export class GuildId implements ASTNode {
    constructor(private _values: string[]) {}

    get values() {
        return this._values;
    }
    
    evaluate() {};
}