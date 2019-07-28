import Algebrain from '../src/algebrain';
import { List } from 'immutable';
import { Operator, Num, Symbol, OperatorSymbol } from '../src/nodes';

const cases = [
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
];

describe('Algebrain parsing', () => {
    test.each(cases)('Parsing case: %p', (freeText, expectedRootNode) => {
        expect(Algebrain.parse(freeText)).toEqual(expectedRootNode);
    });
});
