import { List } from 'immutable';
import Node, { Operator, OperatorSymbol } from './Node';

export type OperatorGenerator = (...children: Node[]) => Operator;

export function generateOperator(value: OperatorSymbol): OperatorGenerator {
    return (...children: Node[]) => new Operator(value, List(children));
}

export const add: OperatorGenerator = generateOperator(OperatorSymbol.Plus);
export const substract: OperatorGenerator = generateOperator(OperatorSymbol.Minus);
export const multiply: OperatorGenerator = generateOperator(OperatorSymbol.Mul);
export const divide: OperatorGenerator = generateOperator(OperatorSymbol.Div);
export const exp: OperatorGenerator = generateOperator(OperatorSymbol.Pow);
