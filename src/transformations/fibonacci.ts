import { List } from 'immutable';
import { Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, OperatorGenerator, plus, minus, constant } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

// fib=[
//   fib(0)=0,
//   fib(1)=1,
//   fib($a)=fib($a-1)+fib($a-2) if const($a)
// ]

const name: string = 'fib';

export const fibonaccify: OperatorGenerator = generateOperator(name as OperatorSymbol);

const fibonacci: Transformation = new Transformation(
    name,
    List([
        new Rule(fibonaccify(new Num(0)), new Num(0)),
        new Rule(fibonaccify(new Num(1)), new Num(1)),
        new Rule(
            fibonaccify(new Rewritable('a')),
            plus(
                fibonaccify(minus(new Rewritable('a'), new Num(1))),
                fibonaccify(minus(new Rewritable('a'), new Num(2)))
            ),
            constant(new Rewritable('a'))
        ),
    ])
);

export default fibonacci;
