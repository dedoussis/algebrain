import { List } from 'immutable';
import { Transformation } from '../src/transformation';
import { Rule } from '../src/rule';
import { Node, Num, Operator, OperatorSymbol, Rewritable } from '../src/nodes';
import Algebrain from '../src/algebrain';

describe('Transformation', () => {
    it('constructs', () => {
        const lhs: Operator = new Operator(
            OperatorSymbol.MUL,
            List<Node>([new Num(2), new Rewritable('u')])
        );
        const rhs: Operator = new Operator(
            OperatorSymbol.PLUS,
            List<Node>([new Rewritable('u'), new Rewritable('u')])
        );
        const rule = new Rule(lhs, rhs);
        expect(new Transformation(List([rule]))).toBeInstanceOf(Transformation);
    });
    it('adds rule', () => {
        const lhs: Operator = new Operator(
            OperatorSymbol.MUL,
            List<Node>([new Num(2), new Rewritable('u')])
        );
        const rhs: Operator = new Operator(
            OperatorSymbol.PLUS,
            List<Node>([new Rewritable('u'), new Rewritable('u')])
        );
        const rule = new Rule(lhs, rhs);
        const transformation = new Transformation(List([rule]));
        expect(transformation.addRule(rule).rules.size).toEqual(2);
    });
    it('transforms', () => {
        const rules = List([
            Algebrain.parse('diff(tan($v),$v)=1+tan($v)^2'),
            Algebrain.parse('diff(sin($v),$v)=cos($v)'),
            Algebrain.parse('diff(cos($v),$v)=0-sin($v)'),
        ]);
        const transformation = new Transformation(rules as List<Rule>);
        const expression = Algebrain.parse('diff(sin(x),x)') as Node;
        expect(transformation.transform(expression).equals(Algebrain.parse('cos(x)'))).toBeTruthy();
    });
});
