import path from "node:path";
import { Project, VariableDeclarationKind } from "ts-morph";
import { PrintWriter } from "../../util/PrintWriter";
import { 
    Bot,
    ClientId,
    Config,
    GuildId,
    Token,
    Variable
} from '../nodes';
import { ASTBaseVisitor } from "./ASTBaseVisitor";
import { VariableResolverVisitor } from "./VariableResolverVisitor";

export class EvaluateVisitor extends ASTBaseVisitor<void, void> {

    private readonly fileWriter;
    private readonly project;

    constructor() {
        super();
        this.fileWriter = new PrintWriter(path.resolve('./out/.env'));
        this.project = new Project()
        this.project.addSourceFileAtPathIfExists('./out/*.ts')
        this.project.createSourceFile('./out/variableTest.ts', "", { overwrite: true });
    }

    visitBot(bot: Bot, params: void): void {
        this.visitConfig(bot.config);
        for (const statement of bot.statements) {
            statement.accept(this, params);
        }
    }

    visitVariable<Y>(variable: Variable<Y>, params: void) {
        const sourceFile = this.project.getSourceFile('./out/variableTest.ts');

        if (variable.isDeclaration) {
            this.project.getSourceFile('./out/variableTest.ts')!.addVariableStatement({
                declarationKind: VariableDeclarationKind.Let, // defaults to "let"
                declarations: [{
                    name: variable.name,
                    initializer: variable.value.accept(new VariableResolverVisitor(), undefined),
                }],
            },);
        } else {
            sourceFile!.addStatements((writer => {
                writer.write(`${variable.name} = ${variable.value.accept(new VariableResolverVisitor(), params)}`);
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
    
}