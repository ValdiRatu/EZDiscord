import { ASTNode } from "./ASTNode";

export class Token implements ASTNode {
    constructor(private _value: string) {}

    get value() {
        return this._value;
    }
    
    evaluate() {};
}
