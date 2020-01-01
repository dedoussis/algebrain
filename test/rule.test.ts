import { Map, List } from 'immutable';
import Rule from '../src/Rule';
import Node, { Operator, OperatorSymbol, Rewritable, Num, Symbol, TRUE, FALSE } from '../src/Node';
import Algebrain from '../src/Algebrain';

describe('Rule', () => {
    it('constructs', () => {
        const lhs: Operator = new Operator(
            OperatorSymbol.Mul,
            List<Node>([new Num(2), new Rewritable('u')])
        );
        const rhs: Operator = new Operator(
            OperatorSymbol.Plus,
            List<Node>([new Rewritable('u'), new Rewritable('u')])
        );
        expect(new Rule(lhs, rhs)).toBeInstanceOf(Rule);
    });
});

const matchCases = [
    [
        '$u -> -x',
        new Rewritable('u'),
        new Operator(OperatorSymbol.Minus, List<Node>([new Symbol('x')])),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>().set(
            new Rewritable('u').toString(),
            new Operator(OperatorSymbol.Minus, List([new Symbol('x')]))
        ),
    ],
    [
        '3-$u -> 3-x',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Rewritable('u')])),
        new Operator(OperatorSymbol.Minus, List<Node>([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>().set(new Rewritable('u').toString(), new Symbol('x')),
    ],
    [
        '3-$u -> 3-x',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Rewritable('u')])),
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Flag, List([FALSE])),
        Map<string, Node>(),
    ],
    [
        '$u+3 -> x+4',
        new Operator(OperatorSymbol.Plus, List([new Rewritable('u'), new Num(3)])),
        new Operator(OperatorSymbol.Plus, List([new Rewritable('u'), new Num(4)])),
        new Operator(OperatorSymbol.Flag, List([TRUE])),
        Map<string, Node>(),
    ],
    [
        '3-$u -> 3-x^5+2',
        new Operator(OperatorSymbol.Minus, List<Node>([new Num(3), new Rewritable('u')])),
        new Operator(
            OperatorSymbol.Minus,
            List<Node>([
                new Num(3),
                new Operator(
                    OperatorSymbol.Plus,
                    List<Node>([
                        new Operator(OperatorSymbol.Pow, List<Node>([new Symbol('x'), new Num(5)])),
                        new Num(2),
                    ])
                ),
            ])
        ),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>().set(
            new Rewritable('u').toString(),
            new Operator(
                OperatorSymbol.Plus,
                List<Node>([
                    new Operator(OperatorSymbol.Pow, List<Node>([new Symbol('x'), new Num(5)])),
                    new Num(2),
                ])
            )
        ),
    ],
    [
        '4/(5-$u)+$v -> 4/(5-x)+y',
        Algebrain.parse('4/(5-$u)+$v'),
        Algebrain.parse('4/(5-x)+y'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Symbol('x')],
            [new Rewritable('v').toString(), new Symbol('y')],
        ]),
    ],
    [
        '4/x-6 -> 4/y+6',
        Algebrain.parse('4/x-6'),
        Algebrain.parse('4/y+6'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>(),
    ],
    [
        '4/$u-6 -> 4/$v+6',
        Algebrain.parse('4/$u-6'),
        Algebrain.parse('4/$v+6'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>(),
    ],
    [
        '111 -> 222',
        Algebrain.parse('111'),
        Algebrain.parse('222'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>(),
    ],
    [
        'diff(2*$u,$u) -> diff(2*x,x)',
        Algebrain.parse('diff(2*$u,$u)'),
        Algebrain.parse('diff(2*x,x)'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>().set(new Rewritable('u').toString(), new Symbol('x')),
    ],
    [
        'diff(2*$u,$u+$v) -> diff(2*$u,$u+$v)',
        Algebrain.parse('diff(2*$u,$u+$v)'),
        Algebrain.parse('diff(2*$u,$u+$v)'),
        new Operator(OperatorSymbol.Flag, List<Node>([TRUE])),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Rewritable('u')],
            [new Rewritable('v').toString(), new Rewritable('v')],
        ]),
    ],
    [
        'diff(2*$u,$u+$v) -> diff(2*$u,$u+$v)',
        Algebrain.parse('diff(2*$u,$u+$v)'),
        Algebrain.parse('diff(2*$u,$u+$v)'),
        new Operator(OperatorSymbol.Flag, List([TRUE])),
        Map<string, Node>([
            [new Rewritable('u').toString(), new Rewritable('u')],
            [new Rewritable('v').toString(), new Rewritable('v')],
        ]),
    ],
];

describe('matches', () => {
    test.each(matchCases)('Matching case %p', (title, lhs, other, condition, matches) => {
        const rule = new Rule(lhs, new Num(0), condition);
        expect(rule.matches(other)).toEqual(matches);
    });
});

const mirrorCases = [
    [
        '3-x === 3-x',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        undefined,
        true,
    ],
    [
        '3-x === 3-x if True',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Flag, List([TRUE])),
        true,
    ],
    [
        '3-x === 3-x if False',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('x')])),
        new Operator(OperatorSymbol.Flag, List([FALSE])),
        false,
    ],
    [
        '3-$u === 3-y if False',
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Rewritable('u')])),
        new Operator(OperatorSymbol.Minus, List([new Num(3), new Symbol('y')])),
        new Operator(OperatorSymbol.Flag, List([FALSE])),
        false,
    ],
];
describe('mirrorCases', () => {
    test.each(mirrorCases)('Mirror case %p', (title, lhs, other, condition, outcome) => {
        const rule = new Rule(lhs, new Num(0), condition);
        expect(rule.mirrors(other)).toBe(outcome);
    });
});

const equalsCases = [
    [
        'Equal rules',
        Algebrain.parse('diff(2*x)=ndiff(x) if x==0'),
        Algebrain.parse('diff(2*x)=ndiff(x) if x==0'),
        true,
    ],
    [
        'Equal rules with undefined conditions',
        Algebrain.parse('diff(2*x)=ndiff(x)'),
        Algebrain.parse('diff(2*x)=ndiff(x)'),
        true,
    ],
    [
        'Different rhs',
        Algebrain.parse('diff(2*x)=ndiff(y) if x==0'),
        Algebrain.parse('diff(2*x)=ndiff(x) if x==0'),
        false,
    ],
    [
        'Different condition',
        Algebrain.parse('diff(2*x)=ndiff(y) if x==1'),
        Algebrain.parse('diff(2*x)=ndiff(x) if x==0'),
        false,
    ],
    [
        'Undefined condition',
        Algebrain.parse('diff(2*x)=ndiff(y) if x==1'),
        Algebrain.parse('diff(2*x)=ndiff(x)'),
        false,
    ],
];
describe('equals', () => {
    test.each(equalsCases)('Equals case %p', (title, one, other, equality) => {
        if (equality) {
            expect(one.equals(other)).toBeTruthy();
        } else {
            expect(one.equals(other)).toBeFalsy();
        }
    });
});
