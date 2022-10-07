import { ASTVisitor } from "../../visitors/ASTVisitor";
import { Statement } from "../Statement";
import { FunctionCallValue } from "./FunctionCallValue";
import { VarType } from "./VarType";

export class Variable<Y> extends Statement {

    constructor(private readonly _name: string, private readonly _value: VarType<Y> | FunctionCallValue, private readonly _isDeclaration: boolean) {
        super();
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    get isDeclaration() {
        return this._isDeclaration;
    }

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitVariable(this, params);
    }

}