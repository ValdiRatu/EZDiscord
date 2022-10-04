import { ASTVisitor } from "../visitors/ASTVisitor";
import { ASTNode } from "./ASTNode";
import { Statement } from "./Statement";

export class Bot implements ASTNode {
    constructor(private _statements: Statement[]) {}
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitBot(this, params);
    }

    get statements() {
        return this._statements;
    }

    
}