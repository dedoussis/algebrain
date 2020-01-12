import { List, Map } from 'immutable';
import Node, { Operator, Num, Symbol, OperatorSymbol, TRUE, FALSE, Rewritable } from '../src/Node';
import { plus, minus, mul, div, pow } from '../src/utils';
import Algebrain from '../src/Algebrain';
import differentiation, { differentiate } from '../src/transformations/differntiation';
import fibonacci, { fibonaccify } from '../src/transformations/fibonacci';
import simplification from '../src/transformations/simplification';

import { Transformation, Rule } from '../src';

const cases = [
    ['unary should stay the same', minus(new Num(3)), minus(new Num(3))],
    ['flat addition', plus(new Num(1), new Num(3)), new Num(4)],
    ['flat substraction', minus(new Num(6), new Num(5)), new Num(1)],
    ['flat multiplication', mul(new Num(8), new Num(3)), new Num(24)],
    ['flat division (3 children)', div(new Num(20), new Num(5), new Num(2)), new Num(2)],
    [
        'equals true',
        new Operator(OperatorSymbol.Equals, List([new Symbol('x'), new Symbol('x')])),
        TRUE,
    ],
    ['equals false', new Operator(OperatorSymbol.Equals, List([new Num(5), new Num(33)])), FALSE],
    [
        'flag true',
        new Operator(
            OperatorSymbol.Flag,
            List([new Operator(OperatorSymbol.Equals, List([new Num(5), new Num(5)]))])
        ),
        TRUE,
    ],
    [
        'flag false',
        new Operator(
            OperatorSymbol.Flag,
            List([new Operator(OperatorSymbol.Equals, List([new Num(8), new Num(10)]))])
        ),
        FALSE,
    ],
    [
        'depends on true',
        new Operator(
            OperatorSymbol.Depends,
            List([
                new Operator(
                    OperatorSymbol.Mul,
                    List([
                        new Num(5),
                        new Operator(OperatorSymbol.Div, List([new Symbol('x'), new Num(10)])),
                    ])
                ),
                new Symbol('x'),
            ])
        ),
        TRUE,
    ],
    [
        'depends on false',
        new Operator(
            OperatorSymbol.Depends,
            List([
                new Operator(OperatorSymbol.Minus, List([new Symbol('x'), new Num(10)])),
                new Symbol('y'),
            ])
        ),
        FALSE,
    ],

    [
        'depends on true',
        new Operator(
            OperatorSymbol.Depends,
            List([
                new Operator(
                    OperatorSymbol.Mul,
                    List([
                        new Symbol('5'),
                        new Operator(OperatorSymbol.Div, List([new Symbol('x'), new Num(10)])),
                    ])
                ),
                new Symbol('x'),
            ])
        ),
        TRUE,
    ],
    [
        'logical And true',
        new Operator(
            OperatorSymbol.And,
            List([
                new Operator(
                    OperatorSymbol.Equals,
                    List([new Rewritable('v'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.Not,
                    List([
                        new Operator(
                            OperatorSymbol.Depends,
                            List([new Symbol('y'), new Symbol('x')])
                        ),
                    ])
                ),
                TRUE,
            ])
        ),
        TRUE,
    ],
    ['const of $u', new Operator(OperatorSymbol.Constant, List([new Rewritable('u')])), FALSE],
    ['const of x', new Operator(OperatorSymbol.Constant, List([new Symbol('x')])), TRUE],
    ['const of 6', new Operator(OperatorSymbol.Constant, List([new Num(6)])), TRUE],
    [
        'logical And false',
        new Operator(
            OperatorSymbol.And,
            List([
                new Operator(
                    OperatorSymbol.Equals,
                    List([new Rewritable('v'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.Not,
                    List([
                        new Operator(
                            OperatorSymbol.Depends,
                            List([new Symbol('y'), new Symbol('y')])
                        ),
                    ])
                ),
                TRUE,
            ])
        ),
        FALSE,
    ],
    [
        'logical Or true',
        new Operator(
            OperatorSymbol.Or,
            List([
                new Operator(OperatorSymbol.Equals, List([new Num(2), new Rewritable('v')])),
                new Operator(
                    OperatorSymbol.Not,
                    List([
                        new Operator(
                            OperatorSymbol.Depends,
                            List([new Symbol('y'), new Symbol('x')])
                        ),
                    ])
                ),
                FALSE,
            ])
        ),
        TRUE,
    ],
    [
        'logical Or false',
        new Operator(
            OperatorSymbol.Or,
            List([
                new Operator(
                    OperatorSymbol.Equals,
                    List([new Rewritable('u'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.Not,
                    List([
                        new Operator(
                            OperatorSymbol.Depends,
                            List([new Symbol('x'), new Symbol('x')])
                        ),
                    ])
                ),
                FALSE,
            ])
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
        const value: OperatorSymbol = OperatorSymbol.Plus;
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
        const another: Operator = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('ndiff', List([new Rewritable('u'), new Rewritable('y'), new Num(2)]))
        );
        expect(one.equals(another)).toBeFalsy();
    });

    it('it is not equal with another Operator that has different children', () => {
        const one: Operator = minus(
            new Num(5),
            new Symbol('x'),
            new Operator('diff', List([new Rewritable('u'), new Rewritable('y')]))
        );
        const another: Operator = minus(
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
