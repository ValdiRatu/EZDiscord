import { ASTVisitor } from "../../visitors/ASTVisitor";
import { BooleanValue } from "./BooleanValue";
import { BuiltInFunction } from "./BuiltInFunction";
import { NumberValue } from "./NumberValue";
import { StringValue } from "./StringValue";
import { VarNameValue } from "./VarNameValue";
import { VarType } from "./VarType";

export class ArrayValue extends VarType<(BooleanValue | NumberValue | StringValue | BuiltInFunction | VarNameValue)[]> {

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitArrayVarValue(this, params);
    }

}