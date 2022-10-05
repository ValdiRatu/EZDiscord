import { ASTVisitor } from "../../visitors/ASTVisitor";
import { ASTNode } from "../ASTNode";


export class BuiltInFunction implements ASTNode {
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitBuiltInFunctionVarValue(this, params);
    }

}