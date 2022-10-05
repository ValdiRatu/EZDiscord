import { ASTVisitor } from "../../visitors/ASTVisitor";
import { ASTNode } from "../ASTNode";


export class BuiltInFunction implements ASTNode {
    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        throw new Error("Method not implemented.");
    }

}