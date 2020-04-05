import { List, Map } from 'immutable';
import Node, { Operator, Num, Symbol, OperatorSymbol, TRUE, FALSE, Rewritable } from '../src/Node';
import {
    plus,
    minus,
    mul,
    div,
    pow,
    equals,
    depends,
    constant,
    flag,
    and,
    or,
    not,
} from '../src/utils';
import Algebrain from '../src/Algebrain';
import differentiation, { differentiate } from '../src/transformations/differntiation';
import fibonacci, { fibonaccify } from '../src/transformations/fibonacci';

import { Transformation, Rule, simplification } from '../src';

const cases = [
    ['unary should stay the same', minus(new Num(3)), minus(new Num(3))],
    ['flat addition', plus(new Num(1), new Num(3)), new Num(4)],
    ['flat substraction', minus(new Num(6), new Num(5)), new Num(1)],
    ['flat multiplication', mul(new Num(8), new Num(3)), new Num(24)],
    ['flat division (3 children)', div(new Num(20), new Num(5), new Num(2)), new Num(2)],
    ['x==x should be true', equals(new Symbol('x'), new Symbol('x')), TRUE],
    ['equals false', equals(new Num(5), new Num(33)), FALSE],
    ['is(5==5) should be true', flag(equals(new Num(5), new Num(5))), TRUE],
    ['is(8==10) should be false', flag(equals(new Num(8), new Num(10))), FALSE],
    [
        'depends(5*(x/10),x) should be true',
        depends(mul(new Num(5), div(new Symbol('x'), new Num(10))), new Symbol('x')),
        TRUE,
    ],
    [
        'depends(x-10,y) should be false',
        depends(minus(new Symbol('x'), new Num(10)), new Symbol('y')),
        FALSE,
    ],
    [
        'depends(k+3-y^6*(2*x+5),2*x+5) should be true',
        depends(
            plus(
                new Symbol('k'),
                minus(
                    new Num(3),
                    pow(
                        new Symbol('y'),
                        mul(new Num(6), plus(mul(new Num(2), new Symbol('x')), new Num(5)))
                    )
                )
            ),
            plus(mul(new Num(2), new Symbol('x')), new Num(5))
        ),
        TRUE,
    ],
    [
        'depends(k+3-y^6*(2*x+5),2*x) should be true',
        depends(
            plus(
                new Symbol('k'),
                minus(
                    new Num(3),
                    pow(
                        new Symbol('y'),
                        mul(new Num(6), plus(mul(new Num(2), new Symbol('x')), new Num(5)))
                    )
                )
            ),
            mul(new Num(2), new Symbol('x'))
        ),
        TRUE,
    ],
    [
        'depends(k+3-y^6*(2*x+5),x+5) should be false',
        depends(
            plus(
                new Symbol('k'),
                minus(
                    new Num(3),
                    pow(
                        new Symbol('y'),
                        mul(new Num(6), plus(mul(new Num(2), new Symbol('x')), new Num(5)))
                    )
                )
            ),
            plus(new Symbol('x'), new Num(5))
        ),
        FALSE,
    ],
    [
        'depends(3+k+x/y,x/y) should be true',
        depends(
            plus(new Num(3), new Symbol('k'), div(new Symbol('x'), new Symbol('y'))),
            div(new Symbol('x'), new Symbol('y'))
        ),
        TRUE,
    ],
    [
        'v==v and not(depends(y,x)) and True should be true',
        and(
            equals(new Rewritable('v'), new Rewritable('v')),
            not(depends(new Symbol('y'), new Symbol('x'))),
            TRUE
        ),
        TRUE,
    ],
    [
        'v==v and not(depends(y,y)) and True should be false',
        and(
            equals(new Rewritable('v'), new Rewritable('v')),
            not(depends(new Symbol('y'), new Symbol('y'))),
            TRUE
        ),
        FALSE,
    ],
    ['const($u) should be false', constant(new Rewritable('u')), FALSE],
    ['const(x) should be true', constant(new Symbol('x')), TRUE],
    ['const(6) should be true', constant(new Num(6)), TRUE],
    [
        '2==$v or not(depends(y,x)) or False should be true',
        or(
            equals(new Num(2), new Rewritable('v')),
            not(depends(new Symbol('y'), new Symbol('x'))),
            FALSE
        ),
        TRUE,
    ],
    [
        '$u==$v or not(depends(x,x)) or False should be false',
        or(
            equals(new Rewritable('u'), new Rewritable('v')),
            not(depends(new Symbol('x'), new Symbol('x'))),
            FALSE
        ),
        FALSE,
    ],
    ['5 - 4 / 2', minus(new Num(5), div(new Num(4), new Num(2))), new Num(3)],
    ['5 + 4 / 1.25', plus(new Num(5), div(new Num(4), new Num(1.25))), new Num(8.2)],
    [
        'x ^ 5 / 2 should remain the same',
        div(pow(new Symbol('x'), new Num(5)), new Num(2)),
        div(pow(new Symbol('x'), new Num(5)), new Num(2)),
    ],
    ['2^4/2*x+5*3', Algebrain.parse('2^4/2*x+5*3'), Algebrain.parse('x*8+15')],
    [
        '5^g+g^5',
        plus(pow(new Num(5), new Symbol('g')), pow(new Symbol('g'), new Num(5))),
        plus(pow(new Num(5), new Symbol('g')), pow(new Symbol('g'), new Num(5))),
    ],
    [
        '+(5, x, z, 3, 2, y, 5)',
        plus(
            new Num(5),
            new Symbol('x'),
            new Symbol('z'),
            new Num(3),
            new Num(2),
            new Symbol('y'),
            new Num(5)
        ),
        plus(new Symbol('x'), new Symbol('z'), new Symbol('y'), new Num(15)),
    ],
    [
        '/(10, 5, x, z, 6, 2, y, 5)',
        div(
            new Num(10),
            new Num(5),
            new Symbol('x'),
            new Symbol('z'),
            new Num(6),
            new Num(2),
            new Symbol('y'),
            new Num(5)
        ),
        div(new Num(2), new Symbol('x'), new Symbol('z'), new Num(3), new Symbol('y'), new Num(5)),
    ],
];

describe('Evaluation', () => {
    test.each(cases)('Evaluating case %p', (title, node, evaluatedNode) => {
        expect(node.evaluate()).toEqual(evaluatedNode);
    });
});

const toStringCases = [
    ['x', new Symbol('x')],
    ['6', new Num(6)],
    ['$u', new Rewritable('u')],
    ['3+x', plus(new Num(3), new Symbol('x'))],
    ['(2+5)*x', mul(plus(new Num(2), new Num(5)), new Symbol('x'))],
    ['2^(3+1)/2*x+5*3', Algebrain.parse('2^(3+1)/2*x+5*3')],
    ['-4+x', plus(minus(new Num(3), new Num(7)), new Symbol('x')).evaluate()],
    ['-(x-5)', minus(minus(new Symbol('x'), new Num(5)))],
    ['-4-(-x)', minus(minus(new Num(4)), minus(new Symbol('x')))],
    ['-10', minus(new Num(10))],
    ['(6+5)*4/(2-x)-3', Algebrain.parse('(6+5)*4/(2-x)-3')],
    ['x+3-(x+2)', minus(plus(new Symbol('x'), new Num(3)), plus(new Symbol('x'), new Num(2)))],
    ['-x*3', minus(mul(new Symbol('x'), new Num(3)))],
];

describe('Stringification', () => {
    test.each(toStringCases)('Formatting case %p', (stringified, node) => {
        expect(node.toString()).toEqual(stringified);
    });
});

const rewriteCases = [
    [
        new Num(5),
        Map<string, Node>([['$u', pow(new Symbol('x'), new Num(3))], ['$v', minus(new Num(5))]]),
        new Num(5),
    ],
    [
        new Rewritable('u'),
        Map<string, Node>([['$u', pow(new Symbol('x'), new Num(3))], ['$v', minus(new Num(5))]]),
        pow(new Symbol('x'), new Num(3)),
    ],
    [
        plus(new Rewritable('u'), new Rewritable('v')),
        Map<string, Node>([['$u', pow(new Symbol('x'), new Num(3))], ['$v', minus(new Num(5))]]),
        plus(pow(new Symbol('x'), new Num(3)), minus(new Num(5))),
    ],
    [
        plus(new Rewritable('u'), div(new Rewritable('v'), new Symbol('k'), new Rewritable('u'))),
        Map<string, Node>([['$u', pow(new Symbol('x'), new Num(3))], ['$v', minus(new Num(5))]]),
        plus(
            pow(new Symbol('x'), new Num(3)),
            div(minus(new Num(5)), new Symbol('k'), pow(new Symbol('x'), new Num(3)))
        ),
    ],
];

describe('Rewriting', () => {
    test.each(rewriteCases)('Rewriting case %p with %p', (rhs, matches, rewritten) => {
        expect(rhs.rewrite(matches)).toEqual(rewritten);
    });
});

const transformationCases = [
    [fibonaccify(new Num(15)), fibonacci, new Num(610)],
    [differentiate(new Symbol('x'), new Symbol('x')), differentiation, new Num(1)],
    [
        differentiate(new Operator('sin', List([new Symbol('x')])), new Symbol('x')),
        new Transformation('diff', List([
            Algebrain.parse('diff(tan($v),$v)=1+tan($v)^2'),
            Algebrain.parse('diff(sin($v),$v)=cos($v)'),
            Algebrain.parse('diff(cos($v),$v)=0-sin($v)'),
        ]) as List<Rule>),
        new Operator('cos', List([new Symbol('x')])),
    ],
    [plus(new Symbol('y'), mul(new Symbol('x'), new Num(0))), simplification, new Symbol('y')],
];

describe('Transformation', () => {
    test.each(transformationCases)(
        'Transformation case %p with %p',
        (expression: Node, transformation: Transformation, transformed: Node) => {
            expect(expression.transform(transformation).equals(transformed)).toBeTruthy();
        }
    );
});

describe('Operator', () => {
    it('constructs', () => {
        const value = OperatorSymbol.Plus;
        expect(new Operator(value).value).toEqual(value);
    });

    it('is equal with another Operator when all children are equal', () => {
        const one: Operator = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('diff', List([new Rewritable('u'), new Rewritable('y')]))
        );
        const another: Operator = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('diff', List([new Rewritable('u'), new Rewritable('y')]))
        );
        expect(one.equals(another)).toBeTruthy();
    });

    it('it is not equal with another Operator that has more children', () => {
        const one: Operator = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('diff', List([new Rewritable('u'), new Rewritable('y')]))
        );
        const another = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('ndiff', List([new Rewritable('u'), new Rewritable('y'), new Num(2)]))
        );
        expect(one.equals(another)).toBeFalsy();
    });

    it('it is not equal with another Operator that has different children', () => {
        const one = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('diff', List([new Rewritable('u'), new Rewritable('y')]))
        );
        const another = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('ndiff', List([new Rewritable('u'), new Rewritable('z')]))
        );
        expect(one.equals(another)).toBeFalsy();
    });

    it('it treeifies', () => {
        const expr: Operator = div(
            plus(minus(new Rewritable('u'), new Symbol('x')), new Num(5)),
            pow(new Symbol('g'), new Num(5))
        );
        const treefied: string[] = [
            '/',
            '├─ +',
            '│  ├─ -',
            '│  │  ├─ $u',
            '│  │  └─ x',
            '│  └─ 5',
            '└─ ^',
            '   ├─ g',
            '   └─ 5',
        ];
        expect(expr.treeify('', ' ')).toEqual(treefied.join('\n'));
    });
});
