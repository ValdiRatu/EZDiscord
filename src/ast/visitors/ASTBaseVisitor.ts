import {
    Bot,
    Config,
    Token,
    ClientId,
    GuildId,
    ArrayValue,
    BooleanValue,
    FunctionCall,
    NumberValue,
    StringValue,
    Variable,
    VarNameValue,
    BinaryValue,
    MathValue,
    Conditional,
    StatementBlock,
    WhileLoop,
    ForEachLoop
} from "../nodes";
import { ASTVisitor } from "./ASTVisitor";

export class ASTBaseVisitor<T, U> implements ASTVisitor<T, U> {
    visitBinaryValue(binaryValue: BinaryValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitMathValue(mathValue: MathValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitBot(bot: Bot, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitConfig(config: Config, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitToken(token: Token, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitClientId(clientId: ClientId, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitGuildId(guildId: GuildId, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitArrayVarValue(arrVarVal: ArrayValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitBooleanVarValue(booleanVarVal: BooleanValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitBuiltInFunctionVarValue(BuiltInFunction: FunctionCall, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitNumberVarValue(numberVarValue: NumberValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitStringVarValue(stringVarValue: StringValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitVariable<Y>(variable: Variable<Y>, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitVarNameValue(varName: VarNameValue, params: T): U {
        throw new Error("Method not implemented.");
    }
    visitConditional(conditional: Conditional, params: T): U {
        throw new Error("Method not implemented.");
    }

    visitStatementBlock(block: StatementBlock, params: T): U {
        throw new Error("Method not implemented.");
    }

    visitForEachLoop(loop: ForEachLoop, params: T): U {
        throw new Error("Method not implemented.");
    }

    visitWhileLoop(loop: WhileLoop, params: T): U {
        throw new Error("Method not implemented.");
    }


}