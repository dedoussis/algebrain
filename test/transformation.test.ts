import { List } from 'immutable';
import Transformation from '../src/Transformation';
import Rule from '../src/Rule';
import Node, { Num, Operator, OperatorSymbol, Rewritable } from '../src/Node';
import Algebrain from '../src/Algebrain';
import differentiation from '../src/transformations/differntiation';
import fibonacci from '../src/transformations/fibonacci';

describe('Transformation', () => {
    it('constructs', () => {
        const lhs: Operator = new Operator(
            OperatorSymbol.Mul,
            List<Node>([new Num(2), new Rewritable('u')])
        );
        const rhs: Operator = new Operator(
            OperatorSymbol.Plus,
            List<Node>([new Rewritable('u'), new Rewritable('u')])
        );
        const rule = new Rule(lhs, rhs);
        expect(new Transformation('expansion', List([rule]))).toBeInstanceOf(Transformation);
    });
    it('adds rule', () => {
        const lhs: Operator = new Operator(
            OperatorSymbol.Mul,
            List<Node>([new Num(2), new Rewritable('u')])
        );
        const rhs: Operator = new Operator(
            OperatorSymbol.Plus,
            List<Node>([new Rewritable('u'), new Rewritable('u')])
        );
        const rule = new Rule(lhs, rhs);
        const transformation = new Transformation('expansion', List([rule]));
        expect(transformation.addRule(rule).rules.size).toEqual(2);
    });
    it('transforms partial diff', () => {
        const rules = List([
            Algebrain.parse('diff(tan($v),$v)=1+tan($v)^2'),
            Algebrain.parse('diff(sin($v),$v)=cos($v)'),
            Algebrain.parse('diff(cos($v),$v)=0-sin($v)'),
        ]);
        const transformation = new Transformation('diff', rules as List<Rule>);
        const expression = Algebrain.parse('diff(sin(x),x)') as Node;
        expect(transformation.transform(expression).equals(Algebrain.parse('cos(x)'))).toBeTruthy();
    });
    it('transforms fibonacci', () => {
        const fibNum = new Operator('fib', List([new Num(15)]));
        expect(fibonacci.transform(fibNum).value).toEqual(610);
    });
    it('transforms full diff', () => {
        const expression = Algebrain.parse('diff(x,x)') as Node;
        expect(differentiation.transform(expression).equals(new Num(1))).toBeTruthy();
    });
});
