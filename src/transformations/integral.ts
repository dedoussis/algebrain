import { List } from 'immutable';
import { Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, plus, minus, mul, div, pow, depends, not, constant } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';
import { differentiate } from './differntiation';
import { simplify } from './simplification';

// integral=[
//   integral($v^$b,$v)=$v^($b+1)/($b+1),
//   integral($b/$v,$v)=$b*ln(abs($v)),
//   integral($b^$v,$v)=$b^$v/ln($b),
//   integral($a*$b,$v)=integral($a,$v)*$b if not(depends($b,$v)),
//   integral($a*$b,$v)=integral($b,$v)*$a if not(depends($a,$v)),
//   integral($a/$b,$v)=integral($a,$v)/$b if not(depends($b,$v)),
//   integral($a+$b,$v)=integral($a,$v)+integral($b,$v),
//   integral($a-$b,$v)=integral($a,$v)-integral($b,$v),
//   integral($a,$v,1)=integral($a,$v),
//   integral($a*$b,$v,$n)=$a*integral($b,$v)-integral(diff($a,$v)*integral($b,$v),$v,$n-1),
//   integral($v,$v)=$v^2/2,
//   integral($a,$v)=$a*$v if const($a),
//   integral($v/$b,$v)=integral($v^-$b,$v),
//   integral($a*$b,$v)=integral($a,$b) if depends($a,simpl(integral($b,$v)))
// ]

const name = 'integral';

export const integrate = generateOperator(name as OperatorSymbol);
const ln = generateOperator('ln' as OperatorSymbol);
const abs = generateOperator('abs' as OperatorSymbol);

const integral: Transformation = new Transformation(
    name,
    List([
        new Rule(
            integrate(pow(new Rewritable('v'), new Rewritable('b')), new Rewritable('v')),
            div(
                pow(new Rewritable('v'), plus(new Rewritable('b'), new Num(1))),
                plus(new Rewritable('b'), new Num(1))
            )
        ),
        new Rule(
            integrate(div(new Rewritable('b'), new Rewritable('v')), new Rewritable('v')),
            mul(new Rewritable('b'), ln(abs(new Rewritable('v'))))
        ),
        new Rule(
            integrate(pow(new Rewritable('b'), new Rewritable('v')), new Rewritable('v')),
            pow(new Rewritable('b'), div(new Rewritable('v'), ln(new Rewritable('b'))))
        ),
        new Rule(
            integrate(mul(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            mul(integrate(new Rewritable('a'), new Rewritable('v')), new Rewritable('b')),
            not(depends(new Rewritable('b'), new Rewritable('v')))
        ),
        new Rule(
            integrate(mul(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            mul(integrate(new Rewritable('b'), new Rewritable('v')), new Rewritable('a')),
            not(depends(new Rewritable('a'), new Rewritable('v')))
        ),
        new Rule(
            integrate(div(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            div(integrate(new Rewritable('a'), new Rewritable('v')), new Rewritable('b')),
            not(depends(new Rewritable('b'), new Rewritable('v')))
        ),
        new Rule(
            integrate(plus(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            plus(
                integrate(new Rewritable('a'), new Rewritable('v')),
                integrate(new Rewritable('b'), new Rewritable('v'))
            )
        ),
        new Rule(
            integrate(minus(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            minus(
                integrate(new Rewritable('a'), new Rewritable('v')),
                integrate(new Rewritable('b'), new Rewritable('v'))
            )
        ),
        new Rule(
            integrate(new Rewritable('a'), new Rewritable('v'), new Num(1)),
            integrate(new Rewritable('a'), new Rewritable('v'))
        ),
        new Rule(
            integrate(
                mul(new Rewritable('a'), new Rewritable('b')),
                new Rewritable('v'),
                new Rewritable('n')
            ),
            minus(
                mul(new Rewritable('a'), integrate(new Rewritable('b'), new Rewritable('v'))),
                integrate(
                    mul(
                        differentiate(new Rewritable('a'), new Rewritable('v')),
                        integrate(new Rewritable('b'), new Rewritable('v'))
                    ),
                    new Rewritable('v'),
                    minus(new Rewritable('n'), new Num(1))
                )
            )
        ),
        new Rule(
            integrate(new Rewritable('v'), new Rewritable('v')),
            div(pow(new Rewritable('v'), new Num(2)), new Num(2))
        ),
        new Rule(
            integrate(new Rewritable('a'), new Rewritable('v')),
            mul(new Rewritable('a'), new Rewritable('v')),
            constant(new Rewritable('a'))
        ),
        new Rule(
            integrate(div(new Rewritable('v'), new Rewritable('b')), new Rewritable('v')),
            integrate(pow(new Rewritable('v'), minus(new Rewritable('b'))), new Rewritable('v'))
        ),
        new Rule(
            integrate(mul(new Rewritable('a'), new Rewritable('b')), new Rewritable('v')),
            integrate(new Rewritable('a'), new Rewritable('b')),
            depends(
                new Rewritable('a'),
                simplify(integrate(new Rewritable('b'), new Rewritable('v')))
            )
        ),
    ])
);

export default integral;
