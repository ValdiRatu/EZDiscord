import { ScopedSymbolTable, Type } from '../../util/ScopedSymbolTable';
import {
	ArrayValue,
	BinaryValue,
	BooleanValue,
	FunctionCall,
	MathValue,
	NumberValue,
	StringValue,
	Variable,
	VarNameValue,
} from '../nodes';
import { BuiltInFunction } from '../nodes/FunctionCall';
import { ASTBaseVisitor } from './ASTBaseVisitor';
import chalk from 'chalk';

interface TypeResolverParam {
	table: ScopedSymbolTable;
	errors: string[];
}

export class TypeResolverVisitor extends ASTBaseVisitor<TypeResolverParam, Type> {
	visitVariable<Y>(variable: Variable<Y>, context: TypeResolverParam): Type {
		return variable.value.accept(this, context);
	}

	visitArrayVarValue(arrVarVal: ArrayValue, context: TypeResolverParam): Type {
		return Type.Array;
	}

	visitBinaryValue(binaryValue: BinaryValue, context: TypeResolverParam): Type {
		return Type.Boolean;
	}

	visitBooleanVarValue(booleanVarVal: BooleanValue, context: TypeResolverParam): Type {
		return Type.Boolean;
	}

	visitMathValue(mathValue: MathValue, context: TypeResolverParam): Type {
		return Type.Number;
	}

	visitNumberVarValue(numberVarValue: NumberValue, context: TypeResolverParam): Type {
		return Type.Number;
	}

	visitStringVarValue(stringVarValue: StringValue, context: TypeResolverParam): Type {
		return Type.String;
	}

	visitVarNameValue(varName: VarNameValue, context: TypeResolverParam): Type {
		const varType = context.table.lookupSymbol(varName.value);
		if (!varType) {
			context.errors.push(
				`invalid variable: ${chalk.blueBright(varName.value)} used out of scope or without being declared`
			);
			return Type.Error;
		}
		return varType;
	}

	visitBuiltInFunctionVarValue(builtInFunction: FunctionCall, context: TypeResolverParam): Type {
		switch (builtInFunction.function) {
			case BuiltInFunction.concat:
				return Type.String;
			case BuiltInFunction.random:
			case BuiltInFunction.len:
			case BuiltInFunction.find:
				return Type.Number;
			case BuiltInFunction.remove:
			case BuiltInFunction.set:
			case BuiltInFunction.reply:
			case BuiltInFunction.add:
				context.errors.push(`function: ${chalk.magentaBright(builtInFunction.function)} does not return a value`);
				return Type.Error;
			case BuiltInFunction.get:
				return Type.Any;
		}
	}
}
