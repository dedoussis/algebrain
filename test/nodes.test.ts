import { List, Map } from 'immutable';
import { Node, Operator, Num, Symbol, OperatorSymbol, TRUE, FALSE, Rewritable } from '../src/nodes';
import Algebrain from '../src/algebrain';

const cases = [
    [
        'flat addition',
        new Operator(OperatorSymbol.PLUS, List([new Num(1), new Num(3)])),
        new Num(4),
    ],
    [
        'flat substraction',
        new Operator(OperatorSymbol.MINUS, List([new Num(6), new Num(5)])),
        new Num(1),
    ],
    [
        'flat multiplication',
        new Operator(OperatorSymbol.MUL, List([new Num(8), new Num(3)])),
        new Num(24),
    ],
    [
        'flat division (3 children)',
        new Operator(OperatorSymbol.DIV, List([new Num(20), new Num(5), new Num(2)])),
        new Num(2),
    ],
    [
        'equals true',
        new Operator(OperatorSymbol.EQUALS, List([new Symbol('x'), new Symbol('x')])),
        TRUE,
    ],
    ['equals false', new Operator(OperatorSymbol.EQUALS, List([new Num(5), new Num(33)])), FALSE],
    [
        'flag true',
        new Operator(
            OperatorSymbol.FLAG,
            List([new Operator(OperatorSymbol.EQUALS, List([new Num(5), new Num(5)]))])
        ),
        TRUE,
    ],
    [
        'flag false',
        new Operator(
            OperatorSymbol.FLAG,
            List([new Operator(OperatorSymbol.EQUALS, List([new Num(8), new Num(10)]))])
        ),
        FALSE,
    ],
    [
        'depends on true',
        new Operator(
            OperatorSymbol.DEPENDS,
            List([
                new Operator(
                    OperatorSymbol.MUL,
                    List([
                        new Num(5),
                        new Operator(OperatorSymbol.DIV, List([new Symbol('x'), new Num(10)])),
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
            OperatorSymbol.DEPENDS,
            List([
                new Operator(OperatorSymbol.MINUS, List([new Symbol('x'), new Num(10)])),
                new Symbol('y'),
            ])
        ),
        FALSE,
    ],

    [
        'depends on true',
        new Operator(
            OperatorSymbol.DEPENDS,
            List([
                new Operator(
                    OperatorSymbol.MUL,
                    List([
                        new Symbol('5'),
                        new Operator(OperatorSymbol.DIV, List([new Symbol('x'), new Num(10)])),
                    ])
                ),
                new Symbol('x'),
            ])
        ),
        TRUE,
    ],
    [
        'logical AND true',
        new Operator(
            OperatorSymbol.AND,
            List([
                new Operator(
                    OperatorSymbol.EQUALS,
                    List([new Rewritable('v'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.NOT,
                    List([
                        new Operator(
                            OperatorSymbol.DEPENDS,
                            List([new Symbol('y'), new Symbol('x')])
                        ),
                    ])
                ),
                TRUE,
            ])
        ),
        TRUE,
    ],
    ['const of $u', new Operator(OperatorSymbol.CONSTANT, List([new Rewritable('u')])), FALSE],
    ['const of x', new Operator(OperatorSymbol.CONSTANT, List([new Symbol('x')])), TRUE],
    ['const of 6', new Operator(OperatorSymbol.CONSTANT, List([new Num(6)])), TRUE],
    [
        'logical AND false',
        new Operator(
            OperatorSymbol.AND,
            List([
                new Operator(
                    OperatorSymbol.EQUALS,
                    List([new Rewritable('v'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.NOT,
                    List([
                        new Operator(
                            OperatorSymbol.DEPENDS,
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
        'logical OR true',
        new Operator(
            OperatorSymbol.OR,
            List([
                new Operator(OperatorSymbol.EQUALS, List([new Num(2), new Rewritable('v')])),
                new Operator(
                    OperatorSymbol.NOT,
                    List([
                        new Operator(
                            OperatorSymbol.DEPENDS,
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
        'logical OR false',
        new Operator(
            OperatorSymbol.OR,
            List([
                new Operator(
                    OperatorSymbol.EQUALS,
                    List([new Rewritable('u'), new Rewritable('v')])
                ),
                new Operator(
                    OperatorSymbol.NOT,
                    List([
                        new Operator(
                            OperatorSymbol.DEPENDS,
                            List([new Symbol('x'), new Symbol('x')])
                        ),
                    ])
                ),
                FALSE,
            ])
        ),
        FALSE,
    ],
    [
        '5 - 4 / 2',
        new Operator(
            OperatorSymbol.MINUS,
            List([new Num(5), new Operator(OperatorSymbol.DIV, List([new Num(4), new Num(2)]))])
        ),
        new Num(3),
    ],
    [
        'x ^ 5 / 2 should remain the same',
        new Operator(
            OperatorSymbol.DIV,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(5)])),
                new Num(2),
            ])
        ),
        new Operator(
            OperatorSymbol.DIV,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(5)])),
                new Num(2),
            ])
        ),
    ],
    ['2^4/2*x+5*3', Algebrain.parse('2^4/2*x+5*3'), Algebrain.parse('x*8+15')],
];

describe('Node evaluation', () => {
    test.each(cases)('Evaluating case %p', (title, node, evaluatedNode) => {
        expect(node.evaluate().canonical()).toEqual(evaluatedNode.canonical());
    });
});

const cannonicalCases = [
    ['symbol', new Symbol('x'), new Symbol('x')],
    [
        '3+x',
        new Operator(OperatorSymbol.PLUS, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.PLUS, List([new Symbol('x'), new Num(3)])),
    ],
    [
        'x*(5+2)',
        new Operator(
            OperatorSymbol.MUL,
            List([
                new Symbol('x'),
                new Operator(OperatorSymbol.PLUS, List([new Num(5), new Num(2)])),
            ])
        ),
        new Operator(
            OperatorSymbol.MUL,
            List([
                new Operator(OperatorSymbol.PLUS, List([new Num(2), new Num(5)])),
                new Symbol('x'),
            ])
        ),
    ],
];

describe('Cannonical form', () => {
    test.each(cannonicalCases)('Formatting case %p', (title, node, formattedNode) => {
        expect(node.canonical()).toEqual(formattedNode);
    });
});

const toStringCases = [
    ['x', new Symbol('x')],
    ['6', new Num(6)],
    ['$u', new Rewritable('u')],
    ['3+x', new Operator(OperatorSymbol.PLUS, List([new Num(3), new Symbol('x')]))],
    [
        '(2+5)*x',
        new Operator(
            OperatorSymbol.MUL,
            List([
                new Operator(OperatorSymbol.PLUS, List([new Num(2), new Num(5)])),
                new Symbol('x'),
            ])
        ),
    ],
    ['2^(3+1)/2*x+5*3', Algebrain.parse('2^(3+1)/2*x+5*3')],
    [
        '-4+x',
        new Operator(
            OperatorSymbol.PLUS,
            List([
                new Operator(OperatorSymbol.MINUS, List([new Num(3), new Num(7)])),
                new Symbol('x'),
            ])
        ).evaluate(),
    ],
    [
        '-4-(-x)',
        new Operator(
            OperatorSymbol.MINUS,
            List([
                new Operator(OperatorSymbol.MINUS, List([new Num(4)])),
                new Operator(OperatorSymbol.MINUS, List([new Symbol('x')])),
            ])
        ),
    ],
    ['-10', new Operator(OperatorSymbol.MINUS, List([new Num(10)]))],
    ['(6+5)*4/(2-x)-3', Algebrain.parse('(6+5)*4/(2-x)-3')],
];

describe('Stringification', () => {
    test.each(toStringCases)('Formatting case %p', (stringified, node) => {
        expect(node.toString()).toEqual(stringified);
    });
});

const rewriteCases = [
    [
        new Num(5),
        Map<string, Node>([
            ['$u', new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)]))],
            ['$v', new Operator(OperatorSymbol.MINUS, List([new Num(5)]))],
        ]),
        new Num(5),
    ],
    [
        new Rewritable('u'),
        Map<string, Node>([
            ['$u', new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)]))],
            ['$v', new Operator(OperatorSymbol.MINUS, List([new Num(5)]))],
        ]),
        new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)])),
    ],
    [
        new Operator(OperatorSymbol.PLUS, List([new Rewritable('u'), new Rewritable('v')])),
        Map<string, Node>([
            ['$u', new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)]))],
            ['$v', new Operator(OperatorSymbol.MINUS, List([new Num(5)]))],
        ]),
        new Operator(
            OperatorSymbol.PLUS,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)])),
                new Operator(OperatorSymbol.MINUS, List([new Num(5)])),
            ])
        ),
    ],
    [
        new Operator(
            OperatorSymbol.PLUS,
            List([
                new Rewritable('u'),
                new Operator(
                    OperatorSymbol.DIV,
                    List([new Rewritable('v'), new Symbol('k'), new Rewritable('u')])
                ),
            ])
        ),
        Map<string, Node>([
            ['$u', new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)]))],
            ['$v', new Operator(OperatorSymbol.MINUS, List([new Num(5)]))],
        ]),
        new Operator(
            OperatorSymbol.PLUS,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)])),
                new Operator(
                    OperatorSymbol.DIV,
                    List([
                        new Operator(OperatorSymbol.MINUS, List([new Num(5)])),
                        new Symbol('k'),
                        new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(3)])),
                    ])
                ),
            ])
        ),
    ],
];

describe('Rewriting', () => {
    test.each(rewriteCases)('Rewriting case %p with %p', (rhs, matches, rewritten) => {
        expect(rhs.rewrite(matches)).toEqual(rewritten);
    });
});

describe('Node superclass', () => {
    it('constructs', () => {
        const value: any = 'tacos';
        expect(new Node(value).value).toEqual(value);
    });
});

describe('Operator', () => {
    it('constructs', () => {
        const value: OperatorSymbol = OperatorSymbol.PLUS;
        expect(new Operator(value).value).toEqual(value);
    });

    it('is flat', () => {
        const operatorNode: Operator = new Operator(
            OperatorSymbol.PLUS,
            List([new Num(2), new Rewritable('u')])
        );
        expect(operatorNode.isFlat()).toBeTruthy();
    });

    it('is not flat', () => {
        const operatorNode: Operator = new Operator(
            OperatorSymbol.PLUS,
            List([new Num(2), new Operator(OperatorSymbol.FLAG, List([FALSE]))])
        );
        expect(operatorNode.isFlat()).toBeFalsy();
    });

    it('is equal with another Operator when all children are equal', () => {
        const one: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('diff', List([new Rewritable('u'), new Rewritable('y')])),
            ])
        );
        const another: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('diff', List([new Rewritable('u'), new Rewritable('y')])),
            ])
        );
        expect(one.equals(another)).toBeTruthy();
    });

    it('it is not equal with another Operator that has more children', () => {
        const one: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('diff', List([new Rewritable('u'), new Rewritable('y')])),
            ])
        );
        const another: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('ndiff', List([new Rewritable('u'), new Rewritable('y'), new Num(2)])),
            ])
        );
        expect(one.equals(another)).toBeFalsy();
    });

    it('it is not equal with another Operator that has different children', () => {
        const one: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('diff', List([new Rewritable('u'), new Rewritable('y')])),
            ])
        );
        const another: Operator = new Operator(
            OperatorSymbol.MINUS,
            List([
                new Num(5),
                new Symbol('x'),
                new Operator('ndiff', List([new Rewritable('u'), new Rewritable('z')])),
            ])
        );
        expect(one.equals(another)).toBeFalsy();
    });
});
