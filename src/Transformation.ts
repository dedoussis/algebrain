import { List } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Rule from './Rule';
import { indent, newLine } from './utils';

export default class Transformation implements Executable {
    constructor(readonly name: string, readonly rules: List<Rule> = List()) {}

    addRule(rule: Rule): Transformation {
        return new Transformation(this.name, this.rules.push(rule));
    }

    toString(): string {
        const newLineIndent = newLine + indent;
        return '[' + newLineIndent + this.rules.join(',' + newLineIndent) + newLine + ']';
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
            },
            stdOut: this.toString(),
        };
    }
}
