import { ASTVisitor } from "../../visitors/ASTVisitor";
import { Statement } from "../Statement";
import { BuiltInFunction } from "./BuiltInFunction";
import { VarType } from "./VarType";

export class Variable<Y> extends Statement {

    constructor(private readonly name: string, private readonly value: VarType<Y> | BuiltInFunction) {
        super();
    }

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        throw new Error("Method not implemented.");
    }

}