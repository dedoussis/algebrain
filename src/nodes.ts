import { List, Map } from 'immutable';

export abstract class Parsable {}

export class Node implements Parsable {
    readonly value: any;
    constructor(value: any) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    evaluate(): Node {
        return new Node(this.value);
    }

    equals(other: any): boolean {
        return this.constructor === other.constructor && this.value === other.value;
    }

    canonical(): Node {
        return new Node(this.value);
    }

    public static compare(one: Node, other: Node, precedence: List<Function>): number {
        if (one.constructor === other.constructor) {
            return one.value - other.value;
        }
        return (
            precedence.findIndex(instanceType => one instanceof instanceType) -
            precedence.findIndex(instanceType => other instanceof instanceType)
        );
    }
}

export class Num extends Node {
    readonly value: number;
    constructor(value: number) {
        super(value);
    }

    evaluate(): Node {
        if (this.value < 0) {
            return new Operator(OperatorSymbol.MINUS, [new Num(this.value * -1)]);
        }
        return new Num(this.value);
    }
}

export enum ExpressionSymbol {
    LPARENS = '(',
    RAPRENS = ')',
    COMMA = ',',
    NONE = '',
}

export enum OperatorSymbol {
    PLUS = '+',
    MINUS = '-',
    MUL = '*',
    DIV = '/',
    POW = '^',
    AND = 'AND',
    OR = 'OR',
    EQUALS = '==',
    FLAG = 'IS',
    NOT = 'NOT',
    DEPENDS = 'depends',
}

export class Operator extends Node {
    private readonly handlers: Map<OperatorSymbol, Handlers> = operatorSymbolHandlers;
    private readonly evaluator: Evaluator;
    private readonly stringifier: Stringifier;

    readonly value: string;
    readonly children: List<Node>;

    constructor(value: string, children: Node[] = []) {
        super(value);
        this.children = List(children);
        const notFoundHandlers: Handlers = {
            evaluator: {
                f: (children: List<Node>) => new Operator(this.value, children.toArray()),
                recursive: false,
            },
            stringifier: {
                f: (child: Operator, index: number) => child.toString(),
                infix: false,
            },
        };
        const handlers = this.handlers.get(this.value as OperatorSymbol, notFoundHandlers);
        this.evaluator = handlers.evaluator;
        this.stringifier = handlers.stringifier;
    }

    addChild(child: Node): Operator {
        return new Operator(this.value, this.children.concat([child]).toArray());
    }

    toString(): string {
        const stringified: List<string> = this.children.map((child: Node, index: number) =>
            child instanceof Operator ? this.stringifier.f(child, index) : child.toString()
        );
        return this.stringifier.infix
            ? infix(this.value, stringified)
            : prefix(this.value, stringified);
    }

    isFlat(): boolean {
        return this.children.every(child => !(child instanceof Operator));
    }

    evaluate(): Node {
        let evaluatedChildren: List<Node> = this.children;

        if (!(this.evaluator.recursive || this.isFlat())) {
            this.children.forEach((child: Node, index: number) => {
                if (child instanceof Operator) {
                    evaluatedChildren = evaluatedChildren.set(index, child.evaluate());
                }
            });
        }
        return this.evaluator.f(evaluatedChildren);
    }

    canonical(): Operator {
        let sortedChildren: List<Node> = this.children.sort((one, other) =>
            Node.compare(one, other, List<Function>([Operator, Rewritable, Symbol, Num]))
        );
        sortedChildren = sortedChildren.map(child =>
            child instanceof Operator ? child.canonical() : child
        );
        return new Operator(this.value, sortedChildren.toArray());
    }
}

export class Symbol extends Node {
    readonly value: string;
    constructor(value: string) {
        super(value);
    }
}

export class Rewritable extends Node {
    readonly value: string;
    constructor(value: string) {
        super(value);
    }

    toString(): string {
        return `$${super.toString()}`;
    }
}

export const TRUE = new Num(1);
export const FALSE = new Num(0);

function evaluateNumericalOperator(
    operatorSymbol: OperatorSymbol,
    commutative: boolean,
    operation: (left: number, right: number) => number
): (children: List<Node>) => Node {
    return (children: List<Node>) => {
        const toEval: List<Num> = commutative
            ? children.filter(child => child instanceof Num)
            : children.takeWhile(child => child instanceof Num);
        const notToEval: List<Node> = commutative
            ? children.filter(child => !(child instanceof Num))
            : children.skipWhile(child => child instanceof Num);
        const resultNode: Num = toEval.reduce(
            (existing: Num, num: Num) => new Num(operation(existing.value, num.value))
        );
        if (notToEval.isEmpty()) {
            return resultNode;
        }
        return new Operator(
            operatorSymbol,
            resultNode ? [resultNode].concat(notToEval.toArray()) : notToEval.toArray()
        );
    };
}

function evaluateDepends(children: List<Node>): Num {
    const dependency: Node = children.last();
    if (dependency instanceof Num) {
        throw Error(`No expression can depend on ${dependency}`);
    }
    const dependents: List<Node> = children.butLast();
    if (dependents.size === 1) {
        const dependent: Node = dependents.first();
        if (dependent instanceof Operator) {
            return dependent.children.some(
                child => evaluateDepends(List([child, dependency])) === TRUE
            )
                ? TRUE
                : FALSE;
        }
        if (!dependent.equals(dependency)) {
            return FALSE;
        }
        return TRUE;
    }
    return dependents.every(dependent =>
        evaluateDepends(List([dependent, dependency])).equals(TRUE)
    )
        ? TRUE
        : FALSE;
}

function evaluateFlag(children: List<Node>): Num {
    if (children.size !== 1) {
        throw Error(`Cannot do flag evaluation on ${children.size} childen`);
    }
    return children.first<Node>().evaluate();
}

function evaluateLogicalAnd(children: List<Node>): Num {
    return children.every(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE;
}

function evaluateLogicalOr(children: List<Node>): Num {
    return children.some(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE;
}

function evaluateEquals(children: List<Node>): Num {
    return children.every(child => child.equals(children.first())) ? TRUE : FALSE;
}

function evaluateNegation(children: List<Node>): Num {
    if (children.size !== 1) {
        throw Error(`Cannot do negation evaluation on ${children.size} childen`);
    }
    return children
        .first<Node>()
        .evaluate()
        .equals(TRUE)
        ? FALSE
        : TRUE;
}

type Evaluator = {
    f: (children: List<Node>) => Node;
    recursive?: boolean;
};
type Stringifier = {
    f: (child: Operator, index: number) => string;
    infix?: boolean;
};

type Handlers = {
    evaluator: Evaluator;
    stringifier: Stringifier;
};

const operatorSymbolHandlers: Map<OperatorSymbol, Handlers> = Map<OperatorSymbol, Handlers>([
    [
        OperatorSymbol.PLUS,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.PLUS,
                    true,
                    (left, right) => left + right
                ),
                recursive: false,
            },
            stringifier: { f: stringifyChildPlus, infix: true },
        },
    ],
    [
        OperatorSymbol.MINUS,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.MINUS,
                    false,
                    (left, right) => left - right
                ),
                recursive: false,
            },
            stringifier: { f: stringifyChildMinus, infix: true },
        },
    ],
    [
        OperatorSymbol.MUL,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.MUL,
                    true,
                    (left, right) => left * right
                ),
                recursive: false,
            },
            stringifier: {
                f: stringifyChild(
                    List<OperatorSymbol>([OperatorSymbol.PLUS, OperatorSymbol.MINUS])
                ),
                infix: true,
            },
        },
    ],
    [
        OperatorSymbol.DIV,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.DIV,
                    false,
                    (left, right) => left / right
                ),
                recursive: false,
            },
            stringifier: {
                f: stringifyChild(
                    List<OperatorSymbol>([OperatorSymbol.PLUS, OperatorSymbol.MINUS])
                ),
                infix: true,
            },
        },
    ],
    [
        OperatorSymbol.POW,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.POW,
                    true,
                    (left, right) => left ** right
                ),
                recursive: false,
            },
            stringifier: {
                f: stringifyChild(
                    List<OperatorSymbol>([
                        OperatorSymbol.PLUS,
                        OperatorSymbol.MINUS,
                        OperatorSymbol.MUL,
                        OperatorSymbol.DIV,
                    ])
                ),
                infix: true,
            },
        },
    ],
    [
        OperatorSymbol.DEPENDS,
        {
            evaluator: { f: evaluateDepends, recursive: true },
            stringifier: { f: stringifyChildPlus },
        },
    ],
    [
        OperatorSymbol.AND,
        {
            evaluator: { f: evaluateLogicalAnd, recursive: false },
            stringifier: { f: stringifyChildPlus },
        },
    ],
    [
        OperatorSymbol.OR,
        {
            evaluator: { f: evaluateLogicalOr, recursive: false },
            stringifier: { f: stringifyChildPlus },
        },
    ],
    [
        OperatorSymbol.NOT,
        {
            evaluator: { f: evaluateNegation, recursive: false },
            stringifier: { f: stringifyChildPlus },
        },
    ],
    [
        OperatorSymbol.FLAG,
        {
            evaluator: { f: evaluateFlag, recursive: false },
            stringifier: { f: stringifyChildPlus },
        },
    ],
    [
        OperatorSymbol.EQUALS,
        {
            evaluator: { f: evaluateEquals, recursive: false },
            stringifier: { f: stringifyChildPlus },
        },
    ],
]);

function infix(operatorSymbol: string, children: List<string>): string {
    return children.size > 1
        ? children.join(operatorSymbol)
        : `${operatorSymbol}${children.first()}`;
}

function prefix(operatorSymbol: string, children: List<string>): string {
    return [
        operatorSymbol,
        ExpressionSymbol.LPARENS,
        children.join(children.size > 1 ? ExpressionSymbol.COMMA : ExpressionSymbol.NONE),
        ExpressionSymbol.RAPRENS,
    ].join(ExpressionSymbol.NONE);
}

function parenthesize(child: Node): string {
    return [ExpressionSymbol.LPARENS, child, ExpressionSymbol.RAPRENS].join(ExpressionSymbol.NONE);
}

function stringifyChildPlus(child: Operator, index: number): string {
    return index !== 0 && child.value === OperatorSymbol.MINUS && child.children.size === 1
        ? parenthesize(child)
        : child.toString();
}

function stringifyChildMinus(child: Operator, index: number): string {
    return index !== 0 &&
        (child.value === OperatorSymbol.PLUS ||
            (child.value === OperatorSymbol.MINUS && child.children.size === 1))
        ? parenthesize(child)
        : child.toString();
}

function stringifyChild(
    parenthesized: List<OperatorSymbol>
): (child: Operator, index: number) => string {
    return (child: Operator, index: number) =>
        parenthesized.includes(child.value as OperatorSymbol)
            ? parenthesize(child)
            : child.toString();
}
