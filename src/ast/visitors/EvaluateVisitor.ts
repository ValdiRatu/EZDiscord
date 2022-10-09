import path from "node:path";
import { Project, SourceFile, VariableDeclarationKind } from "ts-morph";
import { PrintWriter } from "../../util/PrintWriter";
import {
    Bot,
    ClientId,
    Config,
    GuildId,
    Token,
    Variable,
    Conditional,
    Command,
    ForEachLoop,
    WhileLoop
} from '../nodes';
import { ASTBaseVisitor } from "./ASTBaseVisitor";
import { ValueResolverVisitor } from "./ValueResolverVisitor";
import {StatementBlockWriterVisitor} from "./StatementBlockWriterVisitor";
import { GlobalStatementWriter } from "../../util/GlobalStatementWriter";

/**
 * Visitor that evaluates AST and generates TS files for the discord bot
 */
export class EvaluateVisitor extends ASTBaseVisitor<void, void> {
    private readonly fileWriter: PrintWriter;
    private readonly project: Project;
    private readonly projectStructure: { globalVarFile: SourceFile, commandFile: SourceFile};

    constructor() {
        super();
        this.fileWriter = new PrintWriter(path.resolve('./out/.env'));
        this.project = new Project()
        this.project.addSourceFilesAtPaths('./out/*.ts')
        this.projectStructure = {
          globalVarFile: this.project.createSourceFile('./out/GlobalVariables.ts', '', { overwrite: true }),
          commandFile: this.project.createSourceFile('./out/Commands.ts', '', { overwrite: true })
        }
    }

    visitBot(bot: Bot, params: void): void {
        this.visitConfig(bot.config);
        for (const statement of bot.statements) {
            statement.accept(this, params);
        }
    }

    visitVariable<Y>(variable: Variable<Y>, params: void) {
        GlobalStatementWriter.writeGlobalVariable(variable, this.projectStructure.globalVarFile)
        this.project.saveSync()
    }

    visitCommand(command: Command, params: void): void {
        GlobalStatementWriter.writeCommand(command, this.projectStructure.commandFile)
        this.project.saveSync()
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
}