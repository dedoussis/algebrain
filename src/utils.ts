import { List } from 'immutable';
import Node, { Operator, OperatorSymbol } from './Node';

export type OperatorGenerator = (...children: Node[]) => Operator;

export function generateOperator(value: OperatorSymbol): OperatorGenerator {
    return (...children: Node[]) => new Operator(value, List(children));
}

export const plus: OperatorGenerator = generateOperator(OperatorSymbol.Plus);
export const minus: OperatorGenerator = generateOperator(OperatorSymbol.Minus);
export const mul: OperatorGenerator = generateOperator(OperatorSymbol.Mul);
export const div: OperatorGenerator = generateOperator(OperatorSymbol.Div);
export const pow: OperatorGenerator = generateOperator(OperatorSymbol.Pow);
