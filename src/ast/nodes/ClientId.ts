import { ASTNode } from "./ASTNode";

export class ClientId implements ASTNode {
    constructor(private _value: string) {}

    get value() {
        return this._value;
    }
    
    evaluate() {};
}