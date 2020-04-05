import { List } from 'immutable';
import Node, { Operator, OperatorSymbol } from './Node';

export type OperatorGenerator = (...children: Node[]) => Operator;

export function generateOperator(value: OperatorSymbol): OperatorGenerator {
    return (...children: Node[]): Operator => new Operator(value, List(children));
}

export const plus = generateOperator(OperatorSymbol.Plus);
export const minus = generateOperator(OperatorSymbol.Minus);
export const mul = generateOperator(OperatorSymbol.Mul);
export const div = generateOperator(OperatorSymbol.Div);
export const pow = generateOperator(OperatorSymbol.Pow);
export const depends = generateOperator(OperatorSymbol.Depends);
export const constant = generateOperator(OperatorSymbol.Constant);
export const not = generateOperator(OperatorSymbol.Not);
export const and = generateOperator(OperatorSymbol.And);
export const or = generateOperator(OperatorSymbol.Or);
export const flag = generateOperator(OperatorSymbol.Flag);
export const equals = generateOperator(OperatorSymbol.Equals);
