import {ASTBaseVisitor} from "./ASTBaseVisitor";
import {
    Conditional,
    StatementBlock,
    FunctionCall,
    Variable,
    WhileLoop,
    ForEachLoop
} from '../nodes'
import {CodeBlockWriter} from "ts-morph";
import {VariableValueResolverVisitor} from "./VariableValueResolverVisitor";

export class StatementBlockWriterVisitor extends ASTBaseVisitor<CodeBlockWriter, void> {
    visitConditional(conditional: Conditional, writer: CodeBlockWriter): void {
        const ifStatementBlock = conditional.ifBlock;
        const elseStatementBlock = conditional.elseBlock;

        writer.write(`if (${conditional.varName})`).block(() => {
            ifStatementBlock.accept(this, writer);
        });

        if (elseStatementBlock) {
            writer.write(`else `).block(() => {
                elseStatementBlock.accept(this, writer);
            });
        }
    }

    visitStatementBlock(block: StatementBlock, writer: CodeBlockWriter): void {
        for (let statement of block.statements) {
            statement.accept(this, writer);
        }
    }

    visitBuiltInFunctionVarValue(functionCallValue: FunctionCall, writer: CodeBlockWriter): void {
        const functionCallLiteral = functionCallValue.accept(new VariableValueResolverVisitor(), undefined);
        writer.writeLine(`${functionCallLiteral}`);
    }

    visitVariable<Y>(variable: Variable<Y>, writer: CodeBlockWriter): void {
        const varName = variable.name;
        const value = variable.value.accept(new VariableValueResolverVisitor(), undefined);
        const declarationKeyword = variable.isDeclaration ? "let" : "";

        writer.writeLine(`${declarationKeyword} ${varName} = ${value}`);
    }

    visitWhileLoop(loop: WhileLoop, writer: CodeBlockWriter) {
        const loopVariable = loop.varName;
        const loopStatementBlock = loop.loopBlock;
        writer.write(`while (${loopVariable})`).block(() => {
            loopStatementBlock.accept(this, writer);
        });
    }

    visitForEachLoop(loop: ForEachLoop, writer: CodeBlockWriter): void {
        const loopVariable = loop.loopVarName;
        const loopArray = loop.arrayName;
        const loopStatementBlock = loop.loopBlock;

        writer.write(`for (let ${loopVariable} of ${loopArray})`).block(() => {
            loopStatementBlock.accept(this, writer);
        });
    }
}