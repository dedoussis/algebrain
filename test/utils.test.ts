import { List } from 'immutable';
import { generateOperator, OperatorGenerator, plus, minus, mul, div, pow } from '../src/utils';
import { Operator, OperatorSymbol, Num } from '../src/Node';

describe('generateOperator', () => {
    it('generates any given operator symbol', () => {
        const differentiate: OperatorGenerator = generateOperator('diff' as OperatorSymbol);
        const operator: Operator = differentiate(new Num(3));
        expect(new Operator('diff', List([new Num(3)])).equals(operator)).toBeTruthy;
    });
    it('implementes a plus partial', () => {
        const operator: Operator = plus(new Num(3), new Num(5));
        expect(new Operator(OperatorSymbol.Plus, List([new Num(3), new Num(5)])).equals(operator))
            .toBeTruthy;
    });
    it('implementes a minus partial', () => {
        const operator: Operator = minus(new Num(3), new Num(5));
        expect(new Operator(OperatorSymbol.Minus, List([new Num(3), new Num(5)])).equals(operator))
            .toBeTruthy;
    });
    it('implementes a mul partial', () => {
        const operator: Operator = mul(new Num(3), new Num(5));
        expect(new Operator(OperatorSymbol.Mul, List([new Num(3), new Num(5)])).equals(operator))
            .toBeTruthy;
    });
    it('implementes a div partial', () => {
        const operator: Operator = div(new Num(3), new Num(5));
        expect(new Operator(OperatorSymbol.Div, List([new Num(3), new Num(5)])).equals(operator))
            .toBeTruthy;
    });
    it('implementes a pow partial', () => {
        const operator: Operator = pow();
        expect(new Operator(OperatorSymbol.Pow).equals(operator)).toBeTruthy;
    });
});
