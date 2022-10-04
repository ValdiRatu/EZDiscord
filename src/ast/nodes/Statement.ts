import { ASTNode } from "./ASTNode";

export abstract class Statement implements ASTNode {
    abstract evaluate();
}