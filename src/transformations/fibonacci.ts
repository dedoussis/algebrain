import { List } from 'immutable';
import { Operator, Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, OperatorGenerator, add, substract } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

// fib=[
//   fib(0)=0,
//   fib(1)=1,
//   fib($a)=fib($a-1)+fib($a-2) if const($a)
// ]

const name: string = 'dib';

const fibonaccify: OperatorGenerator = generateOperator(name as OperatorSymbol);

const fibonacci: Transformation = new Transformation(
    name,
    List([
        new Rule(fibonaccify(new Num(0)), new Num(0)),
        new Rule(fibonaccify(new Num(1)), new Num(1)),
        new Rule(
            fibonaccify(new Rewritable('a')),
            add(
                substract(new Rewritable('a'), new Num(1)),
                substract(new Rewritable('a'), new Num(2))
            ),
            new Operator(OperatorSymbol.Constant).addChild(new Rewritable('a'))
        ),
    ])
);

export default fibonacci;
