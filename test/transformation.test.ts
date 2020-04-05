import { List } from 'immutable';
import Transformation from '../src/Transformation';
import Rule from '../src/Rule';
import { Num, Rewritable } from '../src/Node';
import { mul, plus } from '../src/utils';

describe('Transformation', () => {
    it('constructs', () => {
        const lhs = mul(new Num(2), new Rewritable('u'));
        const rhs = plus(new Rewritable('u'), new Rewritable('u'));
        const rule = new Rule(lhs, rhs);
        expect(new Transformation('expansion', List([rule]))).toBeInstanceOf(Transformation);
    });
    it('adds rule', () => {
        const lhs = mul(new Num(2), new Rewritable('u'));
        const rhs = plus(new Rewritable('u'), new Rewritable('u'));
        const rule = new Rule(lhs, rhs);
        const transformation = new Transformation('expansion', List([rule]));
        expect(transformation.addRule(rule).rules.size).toEqual(2);
    });
});
