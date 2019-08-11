import { List } from 'immutable';
import { Rule } from './rule';
import { Node, Operator } from './nodes';

export class Transformation {
    readonly rules: List<Rule>;

    constructor(rules: List<Rule> = List<Rule>()) {
        this.rules = rules;
    }

    addRule(rule: Rule): Transformation {
        return new Transformation(this.rules.push(rule));
    }

    transform(expression: Node, recursive: boolean = true): Node {
        let transformed: Node = expression;
        const matchFound: boolean = this.rules.some(rule => {
            if (rule.mirrors(transformed)) {
                transformed = rule.rhs;
                return true;
            }
            const matches = rule.matches(expression);
            if (!matches.isEmpty()) {
                transformed = rule.rhs.rewrite(matches).evaluate();
                return true;
            }
            return false;
        });
        if (matchFound && recursive && transformed instanceof Operator) {
            return transformed
                .setChildren(transformed.children.map(child => this.transform(child)))
                .evaluate();
        }
        return transformed;
    }
}
