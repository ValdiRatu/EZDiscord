import {ASTNode} from "../ASTNode";
import {ASTVisitor} from "../../visitors/ASTVisitor";
import {Statement} from "../Statement";

/**
 * AST node containing all the statements within an if/else block and a loop block
 */
export class StatementBlock implements ASTNode {

    constructor(private readonly _statements: Statement[]) {
    }

    get statements() {
        return this._statements;
    }

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitStatementBlock(this, params);
    }

}