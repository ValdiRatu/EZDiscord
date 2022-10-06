import { ASTVisitor } from "../../visitors/ASTVisitor";
import { ASTNode } from "../ASTNode";
import { VarType } from "./VarType";


export class BuiltInFunction implements ASTNode {
    constructor(private readonly name: string, private readonly params: (VarType<string | boolean | number> | BuiltInFunction)[]) {}
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitBuiltInFunctionVarValue(this, params);
    }

}