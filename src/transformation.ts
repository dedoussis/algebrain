import { List } from 'immutable';
import { Rule } from './rule';
import { Node } from './nodes';

export class Transformation {
    readonly rules: List<Rule>;

    constructor(rules: List<Rule> = List<Rule>()) {
        this.rules = rules;
    }

    addRule(rule: Rule): Transformation {
        return new Transformation(this.rules.push(rule));
    }

    transform(expression: Node): Node {
        return this.rules.reduce((transformed: Node, rule: Rule) => {
            const matches = rule.match(transformed);
            return matches.isEmpty() ? transformed : this.transform(rule.rhs.rewrite(matches));
        }, expression);
    }
}
