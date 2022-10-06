import { ASTVisitor } from "../../visitors/ASTVisitor";
import { Statement } from "../Statement";
import { BuiltInFunction } from "./BuiltInFunction";
import { VarType } from "./VarType";

export class Variable<Y> extends Statement {

    constructor(private readonly _name: string, private readonly _value: VarType<Y> | BuiltInFunction) {
        super();
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    getValue() {
        return this._value instanceof BuiltInFunction ? "test" : this._value.value;
    }

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitVariable(this, params);
    }

}