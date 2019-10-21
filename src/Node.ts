import { List, Map } from 'immutable';
import Executable, { Namespace, Output } from './Executable';

export default class Node implements Executable {
    constructor(readonly value: any) {}

    toString(): string {
        return this.value.toString();
    }

    evaluate(): Node {
        return this;
    }

    equals(other: any): boolean {
        return (
            other !== undefined &&
            this.constructor === other.constructor &&
            this.value === other.value
        );
    }

    rewrite(matches: Map<string, Node>): Node {
        return this;
    }

    execute(namespace: Namespace): Output {
        const evaluated: Node = this.evaluate();
        return {
            namespace: { ...namespace, expression: evaluated },
            stdOut: evaluated.toString(),
        };
    }
}

export class Num extends Node {
    constructor(value: number) {
        super(value);
    }

    evaluate(): Node {
        if (this.value < 0) {
            return new Operator(OperatorSymbol.MINUS, List([new Num(this.value * -1)]));
        }
        return super.evaluate();
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
    AND = 'and',
    OR = 'or',
    EQUALS = '==',
    FLAG = 'is',
    NOT = 'not',
    DEPENDS = 'depends',
    CONSTANT = 'const',
}

export class Operator extends Node {
    private readonly evaluator: Evaluator;
    private readonly stringifier: Stringifier | undefined;

    constructor(
        value: string,
        readonly children: List<Node> = List<Node>(),
        operatorHandlers: Map<OperatorSymbol, Handlers> = operatorSymbolHandlers
    ) {
        super(value);
        const notFoundHandlers: Handlers = {
            evaluator: {
                f: (children: List<Node>) => new Operator(this.value, children),
                recursive: false,
            },
        };
        const handlers = operatorHandlers.get(this.value as OperatorSymbol, notFoundHandlers);
        this.evaluator = handlers.evaluator;
        this.stringifier = handlers.stringifier;
    }

    setChildren(childen: List<Node>) {
        return new Operator(this.value, childen);
    }

    addChild(child: Node): Operator {
        return new Operator(this.value, this.children.push(child));
    }

    toString(): string {
        const stringified: List<string> = this.children.map((child: Node, index: number) =>
            child instanceof Operator && this.stringifier
                ? this.stringifier(child, index)
                : child.toString()
        );
        return this.stringifier ? infix(this.value, stringified) : prefix(this.value, stringified);
    }

    evaluate(): Node {
        const evaluatedChildren: List<Node> = this.evaluator.recursive
            ? this.children
            : this.children.map((child: Node) => {
                  return child instanceof Operator ? child.evaluate() : child;
              });
        return this.evaluator.f(evaluatedChildren);
    }

    equals(other: any): boolean {
        return (
            super.equals(other) &&
            this.children.size === other.children.size &&
            this.children.every((child, index) => child.equals(other.children.get(index)))
        );
    }

    rewrite(matches: Map<string, Node>): Operator {
        return this.setChildren(this.children.map(child => child.rewrite(matches)));
    }
}

export class Symbol extends Node {
    constructor(value: string) {
        super(value);
    }
}

export class Rewritable extends Node {
    constructor(value: string) {
        super(value);
    }

    rewrite(matches: Map<string, Node>): Node {
        return matches.get(this.toString(), new Rewritable(this.value));
    }

    toString(): string {
        return `$${super.toString()}`;
    }
}

type Evaluator = {
    f: (children: List<Node>) => Node;
    recursive?: boolean;
};

type Stringifier = (child: Operator, index: number) => string;

type Handlers = {
    evaluator: Evaluator;
    stringifier?: Stringifier;
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
            stringifier: stringifyChildPlus,
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
            stringifier: stringifyChildMinus,
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
            stringifier: stringifyChild(
                List<OperatorSymbol>([OperatorSymbol.PLUS, OperatorSymbol.MINUS])
            ),
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
            stringifier: stringifyChild(
                List<OperatorSymbol>([OperatorSymbol.PLUS, OperatorSymbol.MINUS])
            ),
        },
    ],
    [
        OperatorSymbol.POW,
        {
            evaluator: {
                f: evaluateNumericalOperator(
                    OperatorSymbol.POW,
                    false,
                    (left, right) => left ** right
                ),
                recursive: false,
            },
            stringifier: stringifyChild(
                List<OperatorSymbol>([
                    OperatorSymbol.PLUS,
                    OperatorSymbol.MINUS,
                    OperatorSymbol.MUL,
                    OperatorSymbol.DIV,
                ])
            ),
        },
    ],
    [
        OperatorSymbol.DEPENDS,
        {
            evaluator: { f: evaluateDepends, recursive: true },
        },
    ],
    [
        OperatorSymbol.AND,
        {
            evaluator: {
                f: (children: List<Node>) =>
                    children.every(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE,
                recursive: false,
            },
        },
    ],
    [
        OperatorSymbol.OR,
        {
            evaluator: {
                f: (children: List<Node>) =>
                    children.some(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE,
                recursive: false,
            },
        },
    ],
    [
        OperatorSymbol.NOT,
        {
            evaluator: {
                f: (children: List<Node>) =>
                    children
                        .first<Node>()
                        .evaluate()
                        .equals(TRUE)
                        ? FALSE
                        : TRUE,
                recursive: false,
            },
        },
    ],
    [
        OperatorSymbol.FLAG,
        {
            evaluator: {
                f: (children: List<Node>) => children.first<Node>().evaluate(),
                recursive: false,
            },
        },
    ],
    [
        OperatorSymbol.EQUALS,
        {
            evaluator: {
                f: (children: List<Node>) =>
                    children.every(child => child.equals(children.first())) ? TRUE : FALSE,
                recursive: false,
            },
            stringifier: (child: Operator, index: number) => child.toString(),
        },
    ],
    [
        OperatorSymbol.CONSTANT,
        {
            evaluator: {
                f: (children: List<Node>) => {
                    const evaluatedChild: Node = children.first<Node>().evaluate();
                    return evaluatedChild instanceof Num || evaluatedChild instanceof Symbol
                        ? TRUE
                        : FALSE;
                },
                recursive: false,
            },
        },
    ],
]);

export const TRUE = new Num(1);
export const FALSE = new Num(0);

function evaluateNumericalOperator(
    operatorSymbol: OperatorSymbol,
    commutative: boolean,
    operation: (left: number, right: number) => number
): (children: List<Node>) => Node {
    return (children: List<Node>) => {
        if (children.size === 1) {
            return new Operator(operatorSymbol, children);
        }
        const toEval: List<Num> = commutative
            ? children.filter(child => child instanceof Num)
            : children.takeWhile(child => child instanceof Num);
        if (toEval.isEmpty()) {
            return new Operator(operatorSymbol, children);
        }
        const notToEval: List<Node> = commutative
            ? children.filter(child => !(child instanceof Num))
            : children.skipWhile(child => child instanceof Num);
        const resultNum: Num = toEval
            .reduce((existing: Num, num: Num) => new Num(operation(existing.value, num.value)))
            .evaluate();

        if (notToEval.isEmpty()) {
            return resultNum;
        }
        return new Operator(operatorSymbol, resultNum ? notToEval.push(resultNum) : notToEval);
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
    return !(index === 0 && child.children.size === 1) &&
        List<string>([OperatorSymbol.PLUS, OperatorSymbol.MINUS]).includes(child.value)
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
