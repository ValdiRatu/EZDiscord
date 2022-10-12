import { ASTVisitor } from '../../visitors/ASTVisitor';
import { VarType } from './VarType';

export class BinaryValue extends VarType<string> {
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBinaryValue(this, params);
	}
}
