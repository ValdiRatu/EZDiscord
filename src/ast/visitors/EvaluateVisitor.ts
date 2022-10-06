import path from "node:path";
import { Project, VariableDeclarationKind } from "ts-morph";
import { PrintWriter } from "../../util/PrintWriter";
import { Bot } from "../nodes/Bot";
import { ClientId } from "../nodes/ClientId";
import { Config } from "../nodes/Config";
import { GuildId } from "../nodes/GuildId";
import { Token } from "../nodes/Token";
import { ArrayValue } from "../nodes/variables/ArrayValue";
import { BooleanValue } from "../nodes/variables/BooleanValue";
import { BuiltInFunction } from "../nodes/variables/BuiltInFunction";
import { NumberValue } from "../nodes/variables/NumberValue";
import { StringValue } from "../nodes/variables/StringValue";
import { Variable } from "../nodes/variables/Variable";
import { VarNameValue } from "../nodes/variables/VarNameValue";
import { ASTVisitor } from "./ASTVisitor";
import { VariableResolverVisitor } from "./VariableResolverVisitor";

export class EvaluateVisitor implements ASTVisitor<void, any> {
    private readonly project;
    constructor() {
        this.project = new Project()
        this.project.addSourceFileAtPathIfExists('./out/*.ts')
        this.project.createSourceFile('./out/variableTest.ts', "", { overwrite: true });
    }
    visitArrayVarValue(arrVarVal: ArrayValue, params: void) {
        throw new Error("Method not implemented. 1");
    }
    visitBooleanVarValue(booleanVarVal: BooleanValue, params: void) {
        throw new Error("Method not implemented. 2");
    }
    visitBuiltInFunctionVarValue(BuiltInFunction: BuiltInFunction, params: void) {
        throw new Error("Method not implemented. 3");
    }
    visitNumberVarValue(numberVarValue: NumberValue, params: void) {
        throw new Error("Method not implemented.");
    }
    visitStringVarValue(stringVarValue: StringValue, params: void) {
        throw new Error("Method not implemented.");
    }
    visitVariable<Y>(variable: Variable<Y>, params: void) {
          
        this.project.getSourceFile('./out/variableTest.ts')!.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const, // defaults to "let"
            declarations: [{
              name: variable.name,
              initializer: variable.value.accept(new VariableResolverVisitor(), undefined),
            }],
          },);

        this.project.saveSync();

    }
    visitVarNameValue(varName: VarNameValue, params: void) {
        throw new Error("Method not implemented.");
    }

    private readonly fileWriter = new PrintWriter(path.resolve('./out/.env'));

    visitBot(bot: Bot, params: void): void {
        
        for (const statement of bot.statements) {
            statement.accept(this, params);
        }
    }

    visitConfig(config: Config, params: void): void {
        config.item.accept(this, params);
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