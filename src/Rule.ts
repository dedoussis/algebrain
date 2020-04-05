import { Map } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Node, { Operator, Rewritable, TRUE, FALSE } from './Node';

export default class Rule implements Executable {
    constructor(readonly lhs: Node, readonly rhs: Node, readonly condition?: Node) {}

    private static matchNodes(
        one: Node,
        other: Node,
        matches: Map<string, Node> = Map()
    ): Map<string, Node> {
        if (one instanceof Rewritable) {
            if (!matches.get(one.toString(), other).equals(other)) {
                throw Error('No match');
            }
            return matches.set(one.toString(), other);
        }
        if (one.constructor !== other.constructor || one.value !== other.value) {
            throw Error('No match');
        }
        if (
            one instanceof Operator &&
            other instanceof Operator &&
            one.children.size === other.children.size
        ) {
            return one.children.reduce(
                (matches: Map<string, Node>, child: Node, index: number) =>
                    Rule.matchNodes(child, other.children.get(index, child), matches),
                matches
            );
        }
        return matches;
    }

    matches(other: Node): Map<string, Node> {
        try {
            const matches = Rule.matchNodes(this.lhs, other);
            if (
                this.condition &&
                this.condition
                    .rewrite(matches)
                    .evaluate()
                    .equals(FALSE)
            ) {
                throw Error('No match - false condition');
            }
            return matches;
        } catch {
            return Map<string, Node>();
        }
    }

    equals(other: any): boolean {
        return (
            this.constructor === other.constructor &&
            Object.entries(this).every(([key, value]: [string, any]) =>
                value instanceof Node ? value.equals(other[key]) : value === other[key]
            )
        );
    }

    toString(): string {
        const equation: string = `${this.lhs}=${this.rhs}`;
        return this.condition === undefined ? equation : `${equation} if ${this.condition}`;
    }

    execute(namespace: Namespace): Output {
        return {
            namespace: namespace,
            stdOut: this.toString(),
        };
    }
}
