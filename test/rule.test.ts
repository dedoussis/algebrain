import { Map } from 'immutable';
import Rule from '../src/Rule';
import { Rewritable, Num, Symbol, TRUE, FALSE } from '../src/Node';
import Algebrain from '../src/Algebrain';
import { plus, minus, pow, mul, flag } from '../src/utils';

describe('Rule', () => {
    it('constructs', () => {
        const lhs = mul(new Num(2), new Rewritable('u'));
        const rhs = plus(new Rewritable('u'), new Rewritable('u'));
        expect(new Rule(lhs, rhs)).toBeInstanceOf(Rule);
    });
});

const matchCases = [
    [
        '$u -> -x',
        new Rewritable('u'),
        minus(new Symbol('x')),
        flag(TRUE),
        Map({ $u: minus(new Symbol('x')) }),
    ],
    [
        '3-$u -> 3-x',
        minus(new Num(3), new Rewritable('u')),
        minus(new Num(3), new Symbol('x')),
        flag(TRUE),
        Map({ $u: new Symbol('x') }),
    ],
    [
        '3-$u -> 3-x',
        minus(new Num(3), new Rewritable('u')),
        minus(new Num(3), new Symbol('x')),
        flag(FALSE),
        Map(),
    ],
    [
        '$u+3 -> x+4',
        plus(new Rewritable('u'), new Num(3)),
        plus(new Rewritable('u'), new Num(4)),
        flag(TRUE),
        Map(),
    ],
    [
        '3-$u -> 3-x^5+2',
        minus(new Num(3), new Rewritable('u')),
        minus(new Num(3), plus(pow(new Symbol('x'), new Num(5)), new Num(2))),
        flag(TRUE),
        Map({ $u: plus(pow(new Symbol('x'), new Num(5)), new Num(2)) }),
    ],
    [
        '4/(5-$u)+$v -> 4/(5-x)+y',
        Algebrain.parse('4/(5-$u)+$v'),
        Algebrain.parse('4/(5-x)+y'),
        flag(TRUE),
        Map({ $u: new Symbol('x'), $v: new Symbol('y') }),
    ],
    ['4/x-6 -> 4/y+6', Algebrain.parse('4/x-6'), Algebrain.parse('4/y+6'), flag(TRUE), Map()],
    ['4/$u-6 -> 4/$v+6', Algebrain.parse('4/$u-6'), Algebrain.parse('4/$v+6'), flag(TRUE), Map()],
    ['111 -> 222', new Num(111), new Num(222), flag(TRUE), Map()],
    [
        'diff(2*$u,$u) -> diff(2*x,x)',
        Algebrain.parse('diff(2*$u,$u)'),
        Algebrain.parse('diff(2*x,x)'),
        flag(TRUE),
        Map({ $u: new Symbol('x') }),
    ],
    [
        'diff(2*$u,$u+$v) -> diff(2*$u,$u+$v)',
        Algebrain.parse('diff(2*$u,$u+$v)'),
        Algebrain.parse('diff(2*$u,$u+$v)'),
        flag(TRUE),
        Map({ $u: new Rewritable('u'), $v: new Rewritable('v') }),
    ],
];

describe('matches', () => {
    test.each(matchCases)('Matching case %p', (title, lhs, other, condition, matches) => {
        const rule = new Rule(lhs, new Num(0), condition);
        expect(rule.matches(other)).toEqual(matches);
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
