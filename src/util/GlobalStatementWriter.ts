import { SourceFile, VariableDeclarationKind } from "ts-morph";
import { ArgType, Argument, Command, Variable } from "../ast/nodes";
import { StatementBlockWriterVisitor } from "../ast/visitors/StatementBlockWriterVisitor";
import { ValueResolverVisitor } from "../ast/visitors/ValueResolverVisitor";

/**
 * Helper class that writes Global Statements
 */
export class GlobalStatementWriter {
  private static readonly commandInternalArgument = 'interaction'
  
  public static writeGlobalVariable<Y>(variable: Variable<Y>, sourceFile: SourceFile) {
    const name = variable.name
    const value = variable.value.accept(new ValueResolverVisitor(), undefined);

    if (variable.isDeclaration) {
      sourceFile.addVariableStatement({
        isExported: false,
        declarationKind: VariableDeclarationKind.Let,
        declarations: [
          {
            name,
            initializer: value
          }
        ]
      })
    } else {
      sourceFile.addStatements(
        (writer) => writer.writeLine(`${name} = ${value}`)
      )
    }
  }
  
  public static writeCommand(command: Command, sourceFile: SourceFile) {
    sourceFile.addStatements([
        writer => {
          writer.write(`const ${command.name}Command =`).block(() => {
            writer.write(`data: new SlashCommandBuilder().setName("${command.formattedName}")${command.args.map(arg => arg.accept(new ValueResolverVisitor(), undefined)).join('')}.setDescription('${command.name}'),`);
            writer.newLine();
            writer.writeLine(`respond: async (${this.commandInternalArgument}: ChatInputCommandInteraction) =>`).block(() => {
              for (const arg of command.args) {
                writer.writeLine(this.getArgumentVariableString(arg))
                writer.write(`if (!${arg.name})`).block(() => {
                  writer.writeLine(`await ${this.commandInternalArgument}.reply('Failed to get ${arg.type}')`)
                  writer.write('return')
                })
              }
              command.statementBlock.accept(new StatementBlockWriterVisitor(), writer);
            })
          })
        },
        writer => {
          writer.write(`slashCommands.push(${command.name}Command);`);
        }
    ])
  }

  private static getArgumentVariableString(arg: Argument): string {
    const options = `${this.commandInternalArgument}.options` 
    switch(arg.type) {
      case ArgType.Boolean:
        return `const ${arg.name} = ${options}.getBoolean('${arg.formattedName}')`
      case ArgType.Number:
        return `const ${arg.name} = ${options}.getNumber('${arg.formattedName}')`
      case ArgType.String:
        return `const ${arg.name} = ${options}.getString('${arg.formattedName}')`
    }
  }
}