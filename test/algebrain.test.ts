import Algebrain from '../src/Algebrain';
import { List } from 'immutable';
import { Num, Symbol } from '../src/Node';
import Rule from '../src/Rule';
import { mul, plus, minus, div, pow, equals } from '../src/utils';
import { differentiate } from '../src/transformations/differntiation';

const cases = [
    ['x', new Symbol('x')],
    ['1+3', plus(new Num(1), new Num(3))],
    ['1-3/2', minus(new Num(1), div(new Num(3), new Num(2)))],
    ['x^5/2', div(pow(new Symbol('x'), new Num(5)), new Num(2))],
    ['x^5/(2+y)', div(pow(new Symbol('x'), new Num(5)), plus(new Num(2), new Symbol('y')))],
    [
        'x^5.67/(122.31+y)',
        div(pow(new Symbol('x'), new Num(5.67)), plus(new Num(122.31), new Symbol('y'))),
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
                differentiate(new Symbol('x')),
                differentiate(new Symbol('y')),
                equals(new Num(3), new Num(5))
            ),
            new Rule(
                differentiate(mul(new Num(2), new Symbol('x'))),
                differentiate(new Symbol('y'))
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
