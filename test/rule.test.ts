import { Rule } from '../src/rule';
import { Map } from 'immutable';
import { Operator, OperatorSymbol, Rewritable, Num, Symbol, Node, TRUE, FALSE } from '../src/nodes';
import Algebrain from '../src/algebrain';

describe('Rule', () => {
    it('constructs', () => {
        const lhs: Operator = new Operator(OperatorSymbol.MUL, [new Num(2), new Rewritable('u')]);
        const rhs: Operator = new Operator(OperatorSymbol.PLUS, [
            new Rewritable('u'),
            new Rewritable('u'),
        ]);
        expect(new Rule(lhs, rhs)).toBeInstanceOf(Rule);
    });
});

const matchCases = [
    [
        '$u -> -x',
        new Rewritable('u'),
        new Operator(OperatorSymbol.MINUS, [new Symbol('x')]),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>().set(
            new Rewritable('u').toString(),
            new Operator(OperatorSymbol.MINUS, [new Symbol('x')])
        ),
    ],
    [
        '3-$u -> 3-x',
        new Operator(OperatorSymbol.MINUS, [new Num(3), new Rewritable('u')]),
        new Operator(OperatorSymbol.MINUS, [new Num(3), new Symbol('x')]),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>().set(new Rewritable('u').toString(), new Symbol('x')),
    ],
    [
        '3-$u -> 3-x',
        new Operator(OperatorSymbol.MINUS, [new Num(3), new Rewritable('u')]),
        new Operator(OperatorSymbol.MINUS, [new Num(3), new Symbol('x')]),
        new Operator(OperatorSymbol.FLAG, [FALSE]),
        Map<string, Node>(),
    ],
    [
        '$u+3 -> x+4',
        new Operator(OperatorSymbol.PLUS, [new Rewritable('u'), new Num(3)]),
        new Operator(OperatorSymbol.PLUS, [new Rewritable('u'), new Num(4)]),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>(),
    ],
    [
        '3-$u -> 3-x^5+2',
        new Operator(OperatorSymbol.MINUS, [new Num(3), new Rewritable('u')]),
        new Operator(OperatorSymbol.MINUS, [
            new Num(3),
            new Operator(OperatorSymbol.PLUS, [
                new Operator(OperatorSymbol.POW, [new Symbol('x'), new Num(5)]),
                new Num(2),
            ]),
        ]),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>().set(
            new Rewritable('u').toString(),
            new Operator(OperatorSymbol.PLUS, [
                new Operator(OperatorSymbol.POW, [new Symbol('x'), new Num(5)]),
                new Num(2),
            ])
        ),
    ],
    [
        '4/(5-$u)+$v -> 4/(5-x)+y',
        Algebrain.parse('4/(5-$u)+$v'),
        Algebrain.parse('4/(5-x)+y'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Symbol('x')],
            [new Rewritable('v').toString(), new Symbol('y')],
        ]),
    ],
    [
        '4/x-6 -> 4/y+6',
        Algebrain.parse('4/x-6'),
        Algebrain.parse('4/y+6'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>(),
    ],
    [
        '4/$u-6 -> 4/$v+6',
        Algebrain.parse('4/$u-6'),
        Algebrain.parse('4/$v+6'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>(),
    ],
    [
        '111 -> 222',
        Algebrain.parse('111'),
        Algebrain.parse('222'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>(),
    ],
    [
        'diff(2*$u,$u) -> diff(2*x,x)',
        Algebrain.parse('diff(2*$u,$u)'),
        Algebrain.parse('diff(2*x,x)'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>().set(new Rewritable('u').toString(), new Symbol('x')),
    ],
    [
        'diff(2*$u,$u+$v) -> diff(2*$u,$u+$v)',
        Algebrain.parse('diff(2*$u,$u+$v)'),
        Algebrain.parse('diff(2*$u,$u+$v)'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Rewritable('u')],
            [new Rewritable('v').toString(), new Rewritable('v')],
        ]),
    ],
    [
        'diff(2*$u,$u+$v) -> diff(2*$u,$u+$v)',
        Algebrain.parse('diff(2*$u,$u+$v)'),
        Algebrain.parse('diff(2*$u,$u+$v)'),
        new Operator(OperatorSymbol.FLAG, [TRUE]),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Rewritable('u')],
            [new Rewritable('v').toString(), new Rewritable('v')],
        ]),
    ],
];

describe('match', () => {
    test.each(matchCases)('Matching case %p', (title, lhs, other, condition, matches) => {
        const rule = new Rule(lhs, new Node(null), condition);
        expect(rule.match(other)).toEqual(matches);
    });
});
