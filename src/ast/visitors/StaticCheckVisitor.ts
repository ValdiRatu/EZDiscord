import { ScopedSymbolTable, Type } from '../../util/ScopedSymbolTable';
import {
	Argument,
	Bot,
	Command,
	Conditional,
	ForEachLoop,
	FunctionCall,
	StatementBlock,
	Variable,
	WhileLoop,
} from '../nodes';
import { BuiltInFunction } from '../nodes/FunctionCall';
import { ASTBaseVisitor } from './ASTBaseVisitor';
import { TypeResolverVisitor } from './TypeResolverVisitor';
import chalk from 'chalk';

interface StaticCheckParams {
	command: string;
	argNames: string[];
}

const nonDeclaredVariable = (varName: string) => `variable: ${chalk.blueBright(varName)} has not been declared`;
const nonArrayVariable = (varName: string) => `variable: ${chalk.blueBright(varName)} is not an array`;

const invalidNumFunctionParams = (numGiven: number, numNeeded: number, functionName: string, scopeName: string) =>
	`invalid number of params given for function: ${chalk.magentaBright(functionName)} in Scope: ${chalk.yellowBright(
		scopeName
	)}. Require ${chalk.greenBright(numNeeded)}, given ${chalk.redBright(numGiven)}`;

const invalidFunctionParamType = (typeGiven: Type, typeNeeded: Type, functionName: string, scopeName: string) =>
	`invalid param type given for function: ${chalk.magentaBright(functionName)} in Scope: ${chalk.yellowBright(
		scopeName
	)}. Require type ${chalk.greenBright(typeNeeded)}, given ${chalk.redBright(typeGiven)}`;

const invalidFunctionParamError = (position: string, functionName: string, scopeName: string) =>
	`the ${position} paramter has a type of error for function ${chalk.magentaBright(
		functionName
	)} in Scope: ${chalk.yellowBright(scopeName)}. Please look at previous error messages to see why`;

const invalidFunctionParamArray = (functionName: string, scopeName: string) =>
	`function: ${chalk.magentaBright(functionName)} in scope: ${chalk.yellowBright(
		scopeName
	)} attempts to add an Array to an Array which is currently not supported`;

export class StaticCheckVisitor extends ASTBaseVisitor<StaticCheckParams | undefined, void> {
	private scopedSymbolTable: ScopedSymbolTable = new ScopedSymbolTable();
	private _errors: String[] = [];

	get errors() {
		return this._errors;
	}

	visitBot(bot: Bot, params: StaticCheckParams | undefined): void {
		for (const statement of bot.statements) {
			statement.accept(this, undefined);
		}
	}

	visitVariable<Y>(variable: Variable<Y>, params: StaticCheckParams | undefined): void {
		const [currentScope, scopeIndex] = this.scopedSymbolTable.getCurrentScope();
		const varName = variable.name;
		const varType = variable.accept(new TypeResolverVisitor(), { table: this.scopedSymbolTable, errors: this.errors });

		// if variable value is a function call we check the params for the function
		if (variable.value instanceof FunctionCall) {
			this.visitBuiltInFunctionVarValue(variable.value, params);
		}

		if (variable.isDeclaration) {
			if (params && params.argNames.includes(varName)) {
				this.errors.push(
					`variable: ${chalk.blueBright(varName)} has same name as one of the args for command: ${chalk.yellowBright(
						params.command
					)}`
				);
				return;
			}
			if (currentScope.has(varName)) {
				this.errors.push(`variable: ${chalk.blueBright(varName)} already declared in current scope`);
				return;
			}
			this.scopedSymbolTable.declareSymbol(varName, varType);
		} else {
			if (params && params.argNames.includes(varName)) {
				this.errors.push(
					`attempted to re-assign argument: ${chalk.blueBright(params.argNames)} of command: ${chalk.yellowBright(
						params.command
					)}`
				);
				return;
			}
			if (!this.scopedSymbolTable.lookupSymbol(varName)) {
				this.errors.push(nonDeclaredVariable(varName));
				return;
			}
			this.scopedSymbolTable.updateSymbol(varName, varType);
		}
	}

	visitCommand(command: Command, params: StaticCheckParams | undefined): void {
		this.scopedSymbolTable.pushScope();
		for (const arg of command.args) {
			this.visitArgument(arg, params);
		}
		command.statementBlock.accept(this, { command: command.name, argNames: command.args.map((arg) => arg.name) });
		this.scopedSymbolTable.popScope();
	}

	visitArgument(arg: Argument, params: StaticCheckParams | undefined): void {
		this.scopedSymbolTable.declareSymbol(arg.name, arg.type);
	}

	visitStatementBlock(block: StatementBlock, params: StaticCheckParams | undefined): void {
		for (const statement of block.statements) {
			statement.accept(this, params);
		}
	}

	visitConditional(conditional: Conditional, params: StaticCheckParams | undefined): void {
		const varName = conditional.varName;
		if (!this.scopedSymbolTable.lookupSymbol(varName)) {
			this.errors.push(nonDeclaredVariable(varName));
		}
		this.scopedSymbolTable.pushScope();
		conditional.ifBlock.accept(this, params);
		this.scopedSymbolTable.popScope();

		if (conditional.elseBlock) {
			this.scopedSymbolTable.pushScope();
			conditional.elseBlock.accept(this, params);
			this.scopedSymbolTable.popScope();
		}
	}

	visitForEachLoop(loop: ForEachLoop, params: StaticCheckParams | undefined): void {
		const arrayName = loop.arrayName;
		this.scopedSymbolTable.pushScope();
		this.scopedSymbolTable.declareSymbol(loop.loopVarName, Type.Any);
		const arrayVarType = this.scopedSymbolTable.lookupSymbol(arrayName);
		if (!arrayVarType) {
			this.errors.push(nonDeclaredVariable(arrayName));
		} else if (arrayVarType !== Type.Array) {
			this.errors.push(nonArrayVariable(arrayName));
		}
		loop.loopBlock.accept(this, params);
		this.scopedSymbolTable.popScope();
	}

	visitWhileLoop(loop: WhileLoop, params: StaticCheckParams | undefined): void {
		const varName = loop.varName;
		this.scopedSymbolTable.pushScope();
		if (!this.scopedSymbolTable.lookupSymbol(varName)) {
			this.errors.push(nonDeclaredVariable(varName));
		}
		loop.loopBlock.accept(this, params);
		this.scopedSymbolTable.popScope();
	}

	visitBuiltInFunctionVarValue(builtInFunction: FunctionCall, params: StaticCheckParams | undefined): void {
		const paramTypes = builtInFunction.params.map((funParam) =>
			funParam.accept(new TypeResolverVisitor(), {
				table: this.scopedSymbolTable,
				errors: this.errors,
			})
		);
		const func = builtInFunction.function;
		switch (func) {
			case BuiltInFunction.random:
				return this.checkRandomFunctionParams(paramTypes, params?.command ?? 'global');
			case BuiltInFunction.concat:
			case BuiltInFunction.reply:
				return this.checkInfParamFunctionParams(paramTypes, func, params?.command ?? 'global');
			case BuiltInFunction.len:
			case BuiltInFunction.find:
			case BuiltInFunction.remove:
			case BuiltInFunction.set:
			case BuiltInFunction.add:
			case BuiltInFunction.get:
				return this.checkArrayFunctionParams(paramTypes, func, params?.command ?? 'global');
		}
	}

	private checkRandomFunctionParams(paramTypes: Type[], scopeName: string) {
		const func = BuiltInFunction.random;
		if (paramTypes.length !== 2) {
			this.errors.push(invalidNumFunctionParams(paramTypes.length, 2, func, scopeName));
		} else if (paramTypes[0] !== Type.Number) {
			this.errors.push(invalidFunctionParamType(paramTypes[0], Type.Number, func, scopeName));
		} else if (paramTypes[1] !== Type.Number) {
			this.errors.push(invalidFunctionParamType(paramTypes[1], Type.Number, func, scopeName));
		}
	}

	private checkInfParamFunctionParams(paramTypes: Type[], functionName: string, scopeName: string) {
		const errorTypeIndexes: number[] = [];
		for (const [index, type] of paramTypes.entries()) {
			if (type === Type.Error) {
				errorTypeIndexes.push(index);
			}
		}
		if (errorTypeIndexes.length > 0) {
			this.errors.push(
				`the parameter(s) with index ${chalk.blueBright(errorTypeIndexes)} in function: ${chalk.magentaBright(
					functionName
				)} in scope: ${chalk.yellowBright(
					scopeName
				)} have type error. Please look at previous error messages to see why`
			);
		}
	}

	private checkArrayFunctionParams(
		paramTypes: Type[],
		arrayFunction: Exclude<BuiltInFunction, BuiltInFunction.reply | BuiltInFunction.random>,
		scopeName: string
	) {
		if (paramTypes[0] !== Type.Array) {
			this.errors.push(
				`an array was not passed as the first argument to function: ${chalk.magentaBright(
					arrayFunction
				)} in scope: ${chalk.yellowBright(scopeName)}`
			);
		}
		const numParams = paramTypes.length;
		switch (arrayFunction) {
			case BuiltInFunction.remove:
			case BuiltInFunction.get:
				if (numParams !== 2) {
					this.errors.push(invalidNumFunctionParams(numParams, 2, arrayFunction, scopeName));
				} else if (paramTypes[1] !== Type.Number) {
					this.errors.push(invalidFunctionParamType(paramTypes[1], Type.Number, arrayFunction, scopeName));
				}
				return;
			case BuiltInFunction.add:
			case BuiltInFunction.find:
				if (numParams !== 2) {
					this.errors.push(invalidNumFunctionParams(numParams, 2, arrayFunction, scopeName));
				} else if (paramTypes[1] === Type.Error) {
					this.errors.push(invalidFunctionParamError('second', arrayFunction, scopeName));
				} else if (paramTypes[1] === Type.Array) {
					this.errors.push(invalidFunctionParamArray(arrayFunction, scopeName));
				}
				return;
			case BuiltInFunction.len:
				if (numParams !== 1) {
					this.errors.push(invalidNumFunctionParams(numParams, 1, arrayFunction, scopeName));
				} else if (paramTypes[0] !== Type.Array) {
					this.errors.push(invalidFunctionParamArray(arrayFunction, scopeName));
				}
				return;
			case BuiltInFunction.set:
				if (numParams !== 3) {
					this.errors.push(invalidNumFunctionParams(numParams, 3, arrayFunction, scopeName));
				} else if (paramTypes[1] !== Type.Number) {
					this.errors.push(invalidFunctionParamType(paramTypes[1], Type.Number, arrayFunction, scopeName));
				} else if (paramTypes[2] === Type.Error) {
					this.errors.push(invalidFunctionParamError('third', arrayFunction, scopeName));
				} else if (paramTypes[2] === Type.Array) {
					this.errors.push(invalidFunctionParamArray(arrayFunction, scopeName));
				}
				return;
		}
	}
}
