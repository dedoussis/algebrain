import { List } from 'immutable';
import Transformation from '../src/Transformation';
import Rule from '../src/Rule';
import Node, { Num, Operator, OperatorSymbol, Rewritable } from '../src/Node';
import Algebrain from '../src/Algebrain';

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
});
