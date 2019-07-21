import { Node, Operator, Num, Symbol, OperatorSymbol, TRUE, FALSE, Rewritable } from '../src/nodes';
import Algebrain from '../src/algebrain';

const cases = [
    ['flat addition', new Operator(OperatorSymbol.PLUS, [new Num(1), new Num(3)]), new Num(4)],
    ['flat substraction', new Operator(OperatorSymbol.MINUS, [new Num(6), new Num(5)]), new Num(1)],
    [
        'flat multiplication',
        new Operator(OperatorSymbol.MUL, [new Num(8), new Num(3)]),
        new Num(24),
    ],
    [
        'flat division (3 children)',
        new Operator(OperatorSymbol.DIV, [new Num(20), new Num(5), new Num(2)]),
        new Num(2),
    ],
    ['equals true', new Operator(OperatorSymbol.EQUALS, [new Symbol('x'), new Symbol('x')]), TRUE],
    ['equals false', new Operator(OperatorSymbol.EQUALS, [new Num(5), new Num(33)]), FALSE],
    [
        'flag true',
        new Operator(OperatorSymbol.FLAG, [
            new Operator(OperatorSymbol.EQUALS, [new Num(5), new Num(5)]),
        ]),
        TRUE,
    ],
    [
        'flag false',
        new Operator(OperatorSymbol.FLAG, [
            new Operator(OperatorSymbol.EQUALS, [new Num(8), new Num(10)]),
        ]),
        FALSE,
    ],
    [
        'depends on true',
        new Operator(OperatorSymbol.DEPENDS, [
            new Operator(OperatorSymbol.MUL, [
                new Symbol('5'),
                new Operator(OperatorSymbol.DIV, [new Symbol('x'), new Num(10)]),
            ]),
            new Symbol('x'),
        ]),
        TRUE,
    ],
    [
        'depends on false',
        new Operator(OperatorSymbol.DEPENDS, [
            new Operator(OperatorSymbol.MINUS, [new Symbol('x'), new Num(10)]),
            new Symbol('y'),
        ]),
        FALSE,
    ],

    [
        'depends on true',
        new Operator(OperatorSymbol.DEPENDS, [
            new Operator(OperatorSymbol.MUL, [
                new Symbol('5'),
                new Operator(OperatorSymbol.DIV, [new Symbol('x'), new Num(10)]),
            ]),
            new Symbol('x'),
        ]),
        TRUE,
    ],
    [
        'logical AND true',
        new Operator(OperatorSymbol.AND, [
            new Operator(OperatorSymbol.EQUALS, [new Rewritable('v'), new Rewritable('v')]),
            new Operator(OperatorSymbol.NOT, [
                new Operator(OperatorSymbol.DEPENDS, [new Symbol('y'), new Symbol('x')]),
            ]),
            TRUE,
        ]),
        TRUE,
    ],
    [
        'logical AND false',
        new Operator(OperatorSymbol.AND, [
            new Operator(OperatorSymbol.EQUALS, [new Rewritable('v'), new Rewritable('v')]),
            new Operator(OperatorSymbol.NOT, [
                new Operator(OperatorSymbol.DEPENDS, [new Symbol('y'), new Symbol('y')]),
            ]),
            TRUE,
        ]),
        FALSE,
    ],
    [
        'logical OR true',
        new Operator(OperatorSymbol.OR, [
            new Operator(OperatorSymbol.EQUALS, [new Num(2), new Rewritable('v')]),
            new Operator(OperatorSymbol.NOT, [
                new Operator(OperatorSymbol.DEPENDS, [new Symbol('y'), new Symbol('x')]),
            ]),
            FALSE,
        ]),
        TRUE,
    ],
    [
        'logical OR false',
        new Operator(OperatorSymbol.OR, [
            new Operator(OperatorSymbol.EQUALS, [new Rewritable('u'), new Rewritable('v')]),
            new Operator(OperatorSymbol.NOT, [
                new Operator(OperatorSymbol.DEPENDS, [new Symbol('x'), new Symbol('x')]),
            ]),
            FALSE,
        ]),
        FALSE,
    ],
    [
        '5 - 4 / 2',
        new Operator(OperatorSymbol.MINUS, [
            new Num(5),
            new Operator(OperatorSymbol.DIV, [new Num(4), new Num(2)]),
        ]),
        new Num(3),
    ],
    [
        'x ^ 5 / 2 should remain the same',
        new Operator(OperatorSymbol.DIV, [
            new Operator(OperatorSymbol.POW, [new Symbol('x'), new Num(5)]),
            new Num(2),
        ]),
        new Operator(OperatorSymbol.DIV, [
            new Operator(OperatorSymbol.POW, [new Symbol('x'), new Num(5)]),
            new Num(2),
        ]),
    ],
    ['2^4/2*x+5*3', Algebrain.parse('2^4/2*x+5*3'), Algebrain.parse('x*8+15')],
];

describe('Node evaluation', () => {
    test.each(cases)('Evaluating case %p', (title, node, evaluatedNode) => {
        expect(node.evaluate()).toEqual(evaluatedNode);
    });
});

const cannonicalCases = [
    ['symbol', new Symbol('x'), new Symbol('x')],
    [
        '3+x',
        new Operator(OperatorSymbol.PLUS, [new Num(3), new Symbol('x')]),
        new Operator(OperatorSymbol.PLUS, [new Symbol('x'), new Num(3)]),
    ],
    [
        'x*(5+2)',
        new Operator(OperatorSymbol.MUL, [
            new Symbol('x'),
            new Operator(OperatorSymbol.PLUS, [new Num(5), new Num(2)]),
        ]),
        new Operator(OperatorSymbol.MUL, [
            new Operator(OperatorSymbol.PLUS, [new Num(2), new Num(5)]),
            new Symbol('x'),
        ]),
    ],
];

describe('Cannonical form', () => {
    test.each(cannonicalCases)('Formatting case %p', (title, node, formattedNode) => {
        expect(node.cannonical()).toEqual(formattedNode);
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
        const operatorNode: Operator = new Operator(OperatorSymbol.PLUS, [
            new Num(2),
            new Rewritable('u'),
        ]);
        expect(operatorNode.isFlat()).toBeTruthy();
    });

    it('is not flat', () => {
        const operatorNode: Operator = new Operator(OperatorSymbol.PLUS, [
            new Num(2),
            new Operator(OperatorSymbol.FLAG, [new Num(0)]),
        ]);
        expect(operatorNode.isFlat()).toBeFalsy();
    });
});
