import { ASTVisitor } from "../visitors/ASTVisitor";
import { VarType } from "./variables/VarType";
import {Statement} from "./Statement";


export class FunctionCall extends Statement {
    constructor(private readonly _name: string, private readonly _params: (VarType<string | boolean | number> | FunctionCall)[]) {
        super();
    }

    get name() {
        return this._name;
    }

    get params() {
        return this._params;
    }

    accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
        return visitor.visitBuiltInFunctionVarValue(this, params);
    }

}