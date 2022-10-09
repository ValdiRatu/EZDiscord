import { ASTVisitor } from "../../visitors/ASTVisitor";
import { Argument } from "./Argument";
import { ASTNode } from "../ASTNode";
import { Statement } from "../Statement";
import { StatementBlock } from "../StatementBlock";

export class Command implements Statement {
    constructor (private readonly _name: string, private readonly _statementBlock: StatementBlock, private readonly _args: Argument[]) {}

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
      return visitor.visitCommand(this, params);
    }

    get name() {
      return this._name;
    }

    get args() {
      return this._args;
    }

    get statementBlock() {
      return this._statementBlock;
    }
}