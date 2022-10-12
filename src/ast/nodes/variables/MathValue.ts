import { ASTVisitor } from '../../visitors/ASTVisitor';
import { VarType } from './VarType';

export class MathValue extends VarType<string> {
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitMathValue(this, params);
	}
}
