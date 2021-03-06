import { List } from 'immutable';
import { Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, OperatorGenerator, plus, minus, mul, div, pow } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

// simpl=[
//   simpl($s)=$s,
//   $s+0=$s,
//   0+$s=$s,
//   $s-0=$s,
//   $s*0=0,
//   0*$s=0,
//   $s*1=$s,
//   1*$s=$s,
//   0/$s=0,
//   $s/$s=1,
//   0^$s=0,
//   $s^0=1,
//   $s^1=$s,
//   $s^$c*$s=$s^($c+1),
//   $s^$c/$s=$s^($c-1),
//   $s-$s=0
// ]

const name = 'simpl';

export const simplify: OperatorGenerator = generateOperator(name as OperatorSymbol);

const simplification: Transformation = new Transformation(
    name,
    List([
        new Rule(simplify(new Rewritable('s')), new Rewritable('s')),
        new Rule(plus(new Rewritable('s'), new Num(0)), new Rewritable('s')),
        new Rule(plus(new Num(0), new Rewritable('s')), new Rewritable('s')),
        new Rule(minus(new Rewritable('s'), new Num(0)), new Rewritable('s')),
        new Rule(minus(new Num(0), new Rewritable('s')), minus(new Rewritable('s'))),
        new Rule(mul(new Rewritable('s'), new Num(0)), new Num(0)),
        new Rule(mul(new Num(0), new Rewritable('s')), new Num(0)),
        new Rule(mul(new Rewritable('s'), new Num(1)), new Rewritable('s')),
        new Rule(mul(new Num(1), new Rewritable('s')), new Rewritable('s')),
        new Rule(div(new Num(0), new Rewritable('s')), new Num(0)),
        new Rule(div(new Rewritable('s'), new Rewritable('s')), new Num(1)),
        new Rule(pow(new Num(0), new Rewritable('s')), new Num(0)),
        new Rule(pow(new Rewritable('s'), new Num(0)), new Num(1)),
        new Rule(pow(new Rewritable('s'), new Num(1)), new Rewritable('s')),
        new Rule(
            mul(pow(new Rewritable('s'), new Rewritable('c')), new Rewritable('s')),
            pow(new Rewritable('s'), plus(new Rewritable('c'), new Num(1)))
        ),
        new Rule(
            div(pow(new Rewritable('s'), new Rewritable('c')), new Rewritable('s')),
            pow(new Rewritable('s'), minus(new Rewritable('c'), new Num(1)))
        ),
        new Rule(minus(new Rewritable('s'), new Rewritable('s')), new Num(0)),
    ])
);

export default simplification;
