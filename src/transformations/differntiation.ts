import { List } from 'immutable';
import { Operator, Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, OperatorGenerator, plus, minus, mul, div, pow } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

// diff=[
//   diff($a+$b,$v)=diff($a,$v)+diff($b,$v),
//   diff($a-$b,$v)=diff($a,$v)-diff($b,$v),
//   diff($a*$b,$v)=diff($a,$v)*$b+diff($b,$v)*$a,
//   diff($a/$b,$v)=(diff($a,$v)*$b-diff($b,$v)*$a)/$b^2,
//   diff($a^$b,$v)=$b*$a^($b-1)*diff($a,$v),
//   diff($u,$v)=0 if const($u) and not(depends($u,$v)),
//   diff($v,$v)=1
// ]

const name: string = 'diff';

const differentiate: OperatorGenerator = generateOperator(name as OperatorSymbol);

const diff: Transformation = new Transformation(
    name,
    List([
        new Rule(
            differentiate(plus(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            plus(
                differentiate(new Rewritable('a'), new Rewritable('v')),
                differentiate(new Rewritable('b'), new Rewritable('v'))
            )
        ),
        new Rule(
            differentiate(minus(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            minus(
                differentiate(new Rewritable('a'), new Rewritable('v')),
                differentiate(new Rewritable('b'), new Rewritable('v'))
            )
        ),
        new Rule(
            differentiate(mul(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            plus(
                mul(differentiate(new Rewritable('a'), new Rewritable('v')), new Rewritable('b')),
                mul(differentiate(new Rewritable('b'), new Rewritable('v')), new Rewritable('a'))
            )
        ),
        new Rule(
            differentiate(div(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            div(
                minus(
                    mul(
                        differentiate(new Rewritable('a'), new Rewritable('v')),
                        new Rewritable('b')
                    ),
                    mul(
                        differentiate(new Rewritable('b'), new Rewritable('v')),
                        new Rewritable('a')
                    )
                ),
                pow(new Rewritable('b'), new Num(2))
            )
        ),
        new Rule(
            differentiate(pow(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            mul(
                mul(
                    new Rewritable('b'),
                    pow(new Rewritable('a'), minus(new Rewritable('b'), new Num(1)))
                ),
                differentiate(new Rewritable('a'), new Rewritable('v'))
            )
        ),
        new Rule(
            differentiate(new Rewritable('u'), new Rewritable('v')),
            new Num(0),
            new Operator(
                OperatorSymbol.And,
                List([
                    new Operator(OperatorSymbol.Constant).addChild(new Rewritable('u')),
                    new Operator(OperatorSymbol.Not).addChild(
                        new Operator(
                            OperatorSymbol.Depends,
                            List([new Rewritable('u'), new Rewritable('v')])
                        )
                    ),
                ])
            )
        ),
        new Rule(differentiate(new Rewritable('v'), new Rewritable('v')), new Num(1)),
    ])
);

export default diff;
