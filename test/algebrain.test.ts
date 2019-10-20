import Algebrain from '../src/Algebrain';
import { List } from 'immutable';
import { Operator, Num, Symbol, OperatorSymbol } from '../src/Node';
import Rule from '../src/Rule';

const cases = [
    ['x', new Symbol('x')],
    ['1+3', new Operator(OperatorSymbol.PLUS, List([new Num(1), new Num(3)]))],
    [
        '1-3/2',
        new Operator(
            OperatorSymbol.MINUS,
            List([new Num(1), new Operator(OperatorSymbol.DIV, List([new Num(3), new Num(2)]))])
        ),
    ],
    [
        'x^5/2',
        new Operator(
            OperatorSymbol.DIV,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(5)])),
                new Num(2),
            ])
        ),
    ],
    [
        'x^5/(2+y)',
        new Operator(
            OperatorSymbol.DIV,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(5)])),
                new Operator(OperatorSymbol.PLUS, List([new Num(2), new Symbol('y')])),
            ])
        ),
    ],
    [
        'x^5.67/(122.31+y)',
        new Operator(
            OperatorSymbol.DIV,
            List([
                new Operator(OperatorSymbol.POW, List([new Symbol('x'), new Num(5.67)])),
                new Operator(OperatorSymbol.PLUS, List([new Num(122.31), new Symbol('y')])),
            ])
        ),
    ],
];

describe('parsing', () => {
    test.each(cases)('Parsing case: %p', (freeText, expected) => {
        expect(Algebrain.parse(freeText)).toEqual(expected);
    });
});

const multilineCases = [
    [
        `diff(x)=diff(y) if 3==5
    diff(2*x)=diff(y)
    3`,
        List([
            new Rule(
                new Operator('diff', List([new Symbol('x')])),
                new Operator('diff', List([new Symbol('y')])),
                new Operator(OperatorSymbol.EQUALS, List([new Num(3), new Num(5)]))
            ),
            new Rule(
                new Operator(
                    'diff',
                    List([new Operator(OperatorSymbol.MUL, List([new Num(2), new Symbol('x')]))])
                ),
                new Operator('diff', List([new Symbol('y')]))
            ),
            new Num(3),
        ]),
    ],
];

describe('multiline parsing', () => {
    test.each(multilineCases)('Parsing case: %p', (freeText, expected) => {
        expect(
            Algebrain.multiParse(freeText).every((item, index) => item.equals(expected.get(index)))
        ).toBeTruthy();
    });
});
