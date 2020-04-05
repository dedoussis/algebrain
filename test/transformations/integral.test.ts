import { Map } from 'immutable';
import { plus, minus, mul, div, pow } from '../../src/utils';
import { Node, Symbol, Num, differentiation, simplification } from '../../src';
import integral, { integrate } from '../../src/transformations/integral';

const transformationMap = Map({
    [differentiation.name]: differentiation,
    [simplification.name]: simplification,
    [integral.name]: integral,
});

const integralCases = [
    [
        'integral(x*y,x,3)',
        integrate(mul(new Symbol('x'), new Symbol('y')), new Symbol('x'), new Num(3)),
        minus(
            mul(new Symbol('x'), mul(new Symbol('y'), new Symbol('x'))),
            mul(div(pow(new Symbol('x'), new Num(2)), new Num(2)), new Symbol('y'))
        ),
    ],
];

describe('integral', () => {
    test.each(integralCases)('Integral case %p', (title: string, expr: Node, expected: Node) => {
        const transformed = expr.transform(transformationMap, simplification);
        const actual = transformed.transform(Map(), simplification);
        expect(actual).toEqual(expected);
    });
});
