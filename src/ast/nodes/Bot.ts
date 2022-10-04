import { ASTNode } from "./ASTNode";
import { Statement } from "./Statement";

export class Bot implements ASTNode {
    constructor(private _statements: Statement[]) {}

    get statements() {
        return this._statements;
    }

    evaluate() {}
}