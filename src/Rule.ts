import { Map } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Node, { Operator, Rewritable, TRUE } from './Node';

export default class Rule implements Executable {
    readonly lhs: Node;
    readonly rhs: Node;
    readonly condition: Node | undefined;

    constructor(lhs: Node, rhs: Node, condition?: Node) {
        this.lhs = lhs;
        this.rhs = rhs;
        this.condition = condition;
    }

    private static matchNodes(
        one: Node,
        other: Node,
        matches: Map<string, Node> = Map<string, Node>()
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
            one.children.forEach((child, index) => {
                matches = Rule.matchNodes(child, other.children.get(index, child), matches);
            }); // to be reduced
        }
        return matches;
    }

    matches(other: Node): Map<string, Node> {
        try {
            const matches = Rule.matchNodes(this.lhs, other);
            if (
                this.condition === undefined ||
                this.condition
                    .rewrite(matches)
                    .evaluate()
                    .equals(TRUE)
            ) {
                return matches;
            }
            return Map<string, Node>();
        } catch {
            return Map<string, Node>();
        }
    }

    mirrors(other: Node): boolean {
        return (
            this.lhs.equals(other) &&
            (this.condition === undefined || this.condition.evaluate().equals(TRUE))
        );
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
