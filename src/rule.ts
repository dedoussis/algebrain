import { Map, List } from 'immutable';
import { Node, Operator, Parsable, Rewritable } from './nodes';

export class Rule implements Parsable {
    readonly lhs: Node;
    readonly rhs: Node;
    readonly condition: Operator | undefined;

    constructor(lhs: Node, rhs: Node, condition?: Operator) {
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
            });
        }
        return matches;
    }

    match(other: Node): Map<string, Node> {
        try {
            return Rule.matchNodes(this.lhs, other);
        } catch {
            return Map<string, Node>();
        }
    }
}
