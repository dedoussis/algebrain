import { List } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Rule from './Rule';
import Node, { Operator } from './Node';

export default class Transformation implements Executable {
    constructor(readonly name: string, readonly rules: List<Rule> = List()) {}

    addRule(rule: Rule): Transformation {
        return new Transformation(this.name, this.rules.push(rule));
    }

    transform(expression: Node, recursive: boolean = true): Node {
        let transformed: Node = expression;
        this.rules.some(rule => {
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
        if (recursive && transformed instanceof Operator) {
            return transformed
                .setChildren(transformed.children.map(child => this.transform(child)))
                .evaluate();
        }
        return transformed;
    }

    toString(): string {
        return `[\n\xa0\xa0${this.rules.join(`,\n\xa0\xa0`)}\n]`;
    }

    equals(other: any): boolean {
        return (
            other !== undefined &&
            this.constructor === other.constructor &&
            this.rules.every((rule: Rule, index: number) => rule.equals(other.rules.get(index)))
        );
    }

    execute(namespace: Namespace): Output {
        return {
            namespace: {
                ...namespace,
                transformations: namespace.transformations.set(this.name, this),
                transformationName: this.name,
            },
            stdOut: this.toString(),
        };
    }
}
