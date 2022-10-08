import path from "node:path";
import { Project, VariableDeclarationKind } from "ts-morph";
import { PrintWriter } from "../../util/PrintWriter";
import {
    Bot,
    ClientId,
    Config,
    GuildId,
    Token,
    Variable,
    Conditional,
    WhileLoop,
    ForEachLoop
} from '../nodes';
import { ASTBaseVisitor } from "./ASTBaseVisitor";
import { VariableValueResolverVisitor } from "./VariableValueResolverVisitor";
import { StatementBlockWriterVisitor } from "./StatementBlockWriterVisitor";

export class EvaluateVisitor extends ASTBaseVisitor<void, void> {

    private readonly fileWriter;
    private readonly project;
    private readonly sourceFile;

    constructor() {
        super();
        this.fileWriter = new PrintWriter(path.resolve('./out/.env'));
        this.project = new Project()
        this.project.addSourceFileAtPathIfExists('./out/*.ts')
        this.sourceFile = this.project.createSourceFile('./out/variableTest.ts', "", { overwrite: true });
    }

    visitBot(bot: Bot, params: void): void {
        this.visitConfig(bot.config);
        for (const statement of bot.statements) {
            statement.accept(this, params);
        }
    }

    visitVariable<Y>(variable: Variable<Y>, params: void) {
        const name = variable.name;
        const value = variable.value.accept(new VariableValueResolverVisitor(), undefined);

        if (variable.isDeclaration) {
            this.sourceFile.addVariableStatement({
                declarationKind: VariableDeclarationKind.Let, // defaults to "let"
                declarations: [{
                    name,
                    initializer: value,
                }],
            },);
        } else {
            this.sourceFile.addStatements((writer => {
                writer.write(`${name} = ${value}`);
            }));
        }
        this.project.saveSync();

    }

    visitConfig(config: Config, params: void): void {
        config.token.accept(this, params);
        config.clientId.accept(this, params);
        config.guildId.accept(this, params)
    }

    visitToken(token: Token, params: void): void {
        this.fileWriter.println(`TOKEN=${token.value}`)
    }
    visitClientId(clientId: ClientId, params: void): void {
        this.fileWriter.println(`CLIENT_ID=${clientId.value}`)
    }
    visitGuildId(guildId: GuildId, params: void): void {
        const guildIds = guildId.values.reduce((guildIdList, guildId) => {
            return guildIdList += guildId + " "
        }, "").trimEnd();
        this.fileWriter.println(`GUILD_ID=${guildIds}`)
    }

    visitConditional(conditional: Conditional, params: void) {
        this.sourceFile.addStatements([
            writer => {
                const statementBlockWriter = new StatementBlockWriterVisitor();
                conditional.accept(statementBlockWriter, writer);
            }
        ]);
        this.project.saveSync();
    }

    visitWhileLoop(loop: WhileLoop, params: void) {
        this.sourceFile.addStatements([
           writer => {
                const statementBlockWriter = new StatementBlockWriterVisitor();
                loop.accept(statementBlockWriter, writer);
           }
        ]);
        this.project.saveSync();
    }

    visitForEachLoop(loop: ForEachLoop, params: void) {
        this.sourceFile.addStatements([
            writer => {
                const statementBlockWriter = new StatementBlockWriterVisitor();
                loop.accept(statementBlockWriter, writer);
            }
        ]);
        this.project.saveSync();
    }
}