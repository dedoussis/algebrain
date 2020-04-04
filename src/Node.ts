import { List, Map } from 'immutable';
import Executable, { Namespace, Output, TransformationMap } from './Executable';
import Transformation from './Transformation';

export default abstract class Node implements Executable {
    abstract readonly value: number | string;

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

    treeify(..._: any[]): string {
        return this.toString();
    }

    transform(transformationMap: TransformationMap, defaultTransformation: Transformation): Node {
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
    constructor(readonly value: number) {
        super();
    }

    evaluate(): Node {
        return this.value < 0
            ? new Operator(OperatorSymbol.Minus, List([new Num(this.value * -1)]))
            : super.evaluate();
    }
}

export enum ExpressionSymbol {
    LeftParens = '(',
    RightParens = ')',
    Comma = ',',
    None = '',
}

export enum OperatorSymbol {
    Plus = '+',
    Minus = '-',
    Mul = '*',
    Div = '/',
    Pow = '^',
    And = 'and',
    Or = 'or',
    Equals = '==',
    Flag = 'is',
    Not = 'not',
    Depends = 'depends',
    Constant = 'const',
}

export class Operator extends Node {
    private readonly evaluator: Evaluator;
    private readonly commutative: boolean;
    private readonly stringifier: Stringifier | undefined;

    constructor(
        readonly value: string,
        readonly children: List<Node> = List<Node>(),
        operatorHandlers: Map<OperatorSymbol, Handlers> = operatorSymbolHandlers
    ) {
        super();
        const notFoundHandlers: Handlers = {
            evaluator: {
                f: (children: List<Node>) => new Operator(this.value, children),
                recursive: false,
            },
            commutative: false,
        };
        const handlers = operatorHandlers.get(this.value as OperatorSymbol, notFoundHandlers);
        this.evaluator = handlers.evaluator;
        this.commutative = handlers.commutative;
        this.stringifier = handlers.stringifier;
    }

    setChildren(childen: List<Node>) {
        return new Operator(this.value, childen);
    }

    addChild(child: Node): Operator {
        return new Operator(this.value, this.children.push(child));
    }

    toString(): string {
        const stringifier = this.stringifier;
        if (!stringifier) {
            return prefix(this.value, this.children.map(child => child.toString()));
        }
        const stringifiedChildren: List<string> = this.children.map((child: Node, index: number) =>
            child instanceof Operator ? stringifier(child, index, this) : child.toString()
        );
        return infix(this.value, stringifiedChildren);
    }

    treeify(childPrefix: string = '', space: string = '\xa0'): string {
        return this.children.reduce(
            (treeified: string, child: Node, index: number, children: List<Node>) => {
                const [branch, prefixExtention]: [string, string] =
                    index === children.size - 1 ? ['└─', space] : ['├─', '│'];
                return `${treeified}\n${childPrefix}${branch} ${child.treeify(
                    `${childPrefix}${prefixExtention}${space}${space}`,
                    space
                )}`;
            },
            this.value
        );
    }

    transform(transformationMap: TransformationMap, defaultTransformation: Transformation): Node {
        const transformation = transformationMap.get(this.value, defaultTransformation);

        const transformed = transformation.apply(this).evaluate();

        const recursivelyTransformed =
            transformed instanceof Operator
                ? transformed
                      .setChildren(
                          transformed.children.map(child =>
                              child.transform(transformationMap, defaultTransformation)
                          )
                      )
                      .evaluate()
                : transformed;

        return this.equals(recursivelyTransformed)
            ? recursivelyTransformed
            : recursivelyTransformed.transform(transformationMap, defaultTransformation);
    }

    evaluate(): Node {
        const evaluatedChildren: List<Node> = this.evaluator.recursive
            ? this.children
            : this.children.map((child: Node) => {
                  return child instanceof Operator ? child.evaluate() : child;
              });
        return this.evaluator.f(evaluatedChildren, this.commutative);
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
    constructor(readonly value: string) {
        super();
    }
}

export class Rewritable extends Node {
    constructor(readonly value: string) {
        super();
    }

    rewrite(matches: Map<string, Node>): Node {
        return matches.get(this.toString(), new Rewritable(this.value));
    }

    toString(): string {
        return `$${super.toString()}`;
    }
}

type Evaluator = {
    f: (children: List<Node>, commutative: boolean) => Node;
    recursive?: boolean;
};

type Stringifier = (child: Operator, index: number, parent: Operator) => string;

type Handlers = {
    evaluator: Evaluator;
    commutative: boolean;
    stringifier?: Stringifier;
};

const operatorSymbolHandlers: Map<OperatorSymbol, Handlers> = Map<OperatorSymbol, Handlers>([
    [
        OperatorSymbol.Plus,
        {
            evaluator: {
                f: evaluateNumericalOperator(OperatorSymbol.Plus, (left, right) => left + right),
                recursive: false,
            },
            commutative: true,
            stringifier: stringifyChildPlus,
        },
    ],
    [
        OperatorSymbol.Minus,
        {
            evaluator: {
                f: evaluateNumericalOperator(OperatorSymbol.Minus, (left, right) => left - right),
                recursive: false,
            },
            commutative: false,
            stringifier: stringifyChildMinus,
        },
    ],
    [
        OperatorSymbol.Mul,
        {
            evaluator: {
                f: evaluateNumericalOperator(OperatorSymbol.Mul, (left, right) => left * right),
                recursive: false,
            },
            commutative: true,
            stringifier: stringifyChild(
                List<OperatorSymbol>([OperatorSymbol.Plus, OperatorSymbol.Minus])
            ),
        },
    ],
    [
        OperatorSymbol.Div,
        {
            evaluator: {
                f: evaluateNumericalOperator(OperatorSymbol.Div, (left, right) => left / right),
                recursive: false,
            },
            commutative: false,
            stringifier: stringifyChild(
                List<OperatorSymbol>([OperatorSymbol.Plus, OperatorSymbol.Minus])
            ),
        },
    ],
    [
        OperatorSymbol.Pow,
        {
            evaluator: {
                f: evaluateNumericalOperator(OperatorSymbol.Pow, (left, right) => left ** right),
                recursive: false,
            },
            commutative: false,
            stringifier: stringifyChild(
                List<OperatorSymbol>([
                    OperatorSymbol.Plus,
                    OperatorSymbol.Minus,
                    OperatorSymbol.Mul,
                    OperatorSymbol.Div,
                ])
            ),
        },
    ],
    [
        OperatorSymbol.Depends,
        {
            evaluator: { f: evaluateDepends, recursive: true },
            commutative: false,
        },
    ],
    [
        OperatorSymbol.And,
        {
            evaluator: {
                f: (children: List<Node>, _: boolean) =>
                    children.every(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE,
                recursive: false,
            },
            commutative: false,
        },
    ],
    [
        OperatorSymbol.Or,
        {
            evaluator: {
                f: (children: List<Node>, _: boolean) =>
                    children.some(child => child.evaluate().equals(TRUE)) ? TRUE : FALSE,
                recursive: false,
            },
            commutative: false,
        },
    ],
    [
        OperatorSymbol.Not,
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
            commutative: false,
        },
    ],
    [
        OperatorSymbol.Flag,
        {
            evaluator: {
                f: (children: List<Node>, _: boolean) => children.first<Node>().evaluate(),
                recursive: false,
            },
            commutative: false,
        },
    ],
    [
        OperatorSymbol.Equals,
        {
            evaluator: {
                f: (children: List<Node>, _: boolean) =>
                    children.every(child => child.equals(children.first())) ? TRUE : FALSE,
                recursive: false,
            },
            commutative: true,
            stringifier: (child: Operator, index: number) => child.toString(),
        },
    ],
    [
        OperatorSymbol.Constant,
        {
            evaluator: {
                f: (children: List<Node>, _: boolean) => {
                    const evaluatedChild: Node = children.first<Node>().evaluate();
                    return evaluatedChild instanceof Num || evaluatedChild instanceof Symbol
                        ? TRUE
                        : FALSE;
                },
                recursive: false,
            },
            commutative: false,
        },
    ],
]);

export const TRUE = new Num(1);
export const FALSE = new Num(0);

function evaluateNumericalOperator(
    operatorSymbol: OperatorSymbol,
    operation: (left: number, right: number) => number
): (children: List<Node>, commutative: boolean) => Node {
    return (children: List<Node>, commutative: boolean) => {
        if (children.size < 2) {
            return new Operator(operatorSymbol, children);
        }
        const reducedChildren: List<Node> = children.reduce(
            (reducedChildren: List<Node>, child: Node) => {
                const last = reducedChildren.last();
                if (last instanceof Num && child instanceof Num) {
                    return reducedChildren
                        .butLast()
                        .push(new Num(operation(last.value, child.value)));
                }
                const numComparator: (previous: Node, next: Node) => number = (previous, next) => {
                    if (previous instanceof Num) {
                        if (next instanceof Num) {
                            return 0;
                        }
                        return 1;
                    }
                    if (next instanceof Num) {
                        return -1;
                    }
                    return 0;
                };
                return commutative
                    ? reducedChildren.push(child).sort(numComparator)
                    : reducedChildren.push(child);
            },
            List()
        );
        const first: Node = reducedChildren.first();
        return reducedChildren.size === 1
            ? first.evaluate()
            : new Operator(operatorSymbol, reducedChildren);
    };
}

function evaluateDepends(children: List<Node>, commutative: boolean = false): Num {
    const dependency: Node = children.last();
    if (dependency instanceof Num) {
        throw Error(`No expression can depend on ${dependency}`);
    }
    const dependents: List<Node> = children.butLast();
    if (dependents.size === 1) {
        const dependent: Node = dependents.first();
        if (dependent.equals(dependency)) {
            return TRUE;
        }
        if (dependent instanceof Operator) {
            if (
                dependent.children.some(child =>
                    evaluateDepends(List([child, dependency])).equals(TRUE)
                )
            ) {
                return TRUE;
            }
        }
        return FALSE;
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
        ExpressionSymbol.LeftParens,
        children.join(children.size > 1 ? ExpressionSymbol.Comma : ExpressionSymbol.None),
        ExpressionSymbol.RightParens,
    ].join(ExpressionSymbol.None);
}

function parenthesize(child: Node): string {
    return [ExpressionSymbol.LeftParens, child, ExpressionSymbol.RightParens].join(
        ExpressionSymbol.None
    );
}

function stringifyChildPlus(child: Operator, index: number, _: any): string {
    return index !== 0 && child.value === OperatorSymbol.Minus && child.children.size === 1
        ? parenthesize(child)
        : child.toString();
}

function stringifyChildMinus(child: Operator, index: number, parent: Operator): string {
    const startIdx: number = parent.children.size === 1 ? 0 : 1;
    return index >= startIdx &&
        List<string>([OperatorSymbol.Plus, OperatorSymbol.Minus]).includes(child.value)
        ? parenthesize(child)
        : child.toString();
}

function stringifyChild(parenthesized: List<OperatorSymbol>): Stringifier {
    return (child: Operator, ..._: any[]) =>
        parenthesized.includes(child.value as OperatorSymbol)
            ? parenthesize(child)
            : child.toString();
}
