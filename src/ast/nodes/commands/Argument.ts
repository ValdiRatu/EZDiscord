import { ASTVisitor } from "../../visitors/ASTVisitor";
import { ASTNode } from "../ASTNode";

export enum ArgType {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string'
}

export class Argument implements ASTNode {
  constructor(private readonly _name: string, private readonly _type: ArgType) {}
  accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
    return visitor.visitArgument(this, params);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
}