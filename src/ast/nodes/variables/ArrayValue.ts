import { ASTVisitor } from "../../visitors/ASTVisitor";
import { VarType } from "./VarType";

export class ArrayValue extends VarType<any[]> {

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        throw new Error("Method not implemented.");
    }

}