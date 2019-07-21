import { List, Map } from 'immutable';

export class Node {
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

    cannonical(): Node {
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
        return super.evaluate();
    }
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
    private readonly evaluators: Map<OperatorSymbol, Evaluator> = evaluators;
    readonly value: string;
    readonly children: List<Node>;
    private readonly evaluator: Evaluator;

    constructor(value: string, children: Node[] = []) {
        super(value);
        this.children = List(children);
        const notFoundEvaluator: Evaluator = {
            f: (children: List<Node>) => new Operator(this.value, children.toArray()),
            recursive: false,
        };
        this.evaluator = this.evaluators.get(this.value as OperatorSymbol, notFoundEvaluator);
    }

    addChild(child: Node): Operator {
        return new Operator(this.value, this.children.concat([child]).toArray());
    }

    toString(): string {
        return this.children.map(child => child.toString()).join(this.value);
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

    cannonical(): Operator {
        let sortedChildren: List<Node> = this.children.sort((one, other) =>
            Node.compare(one, other, List<Function>([Operator, Rewritable, Symbol, Num]))
        );
        sortedChildren = sortedChildren.map(child =>
            child instanceof Operator ? child.cannonical() : child
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

function evaluatePlus(children: List<Node>): Node {
    const nums: List<Num> = children.filter(child => child instanceof Num);
    const nonNums: List<Node> = children.filter(child => !(child instanceof Num));
    const sumNode: Num = nums.reduce(
        (existing: Num, num: Num) => new Num(existing.value + num.value)
    );
    if (nonNums.isEmpty()) {
        return sumNode;
    }
    return new Operator(
        OperatorSymbol.PLUS,
        sumNode ? nonNums.concat(sumNode).toArray() : nonNums.toArray()
    );
}

function evaluateMinus(children: List<Node>): Node {
    const substractable: List<Num> = children.takeWhile(child => child instanceof Num);
    const unsubstractable: List<Node> = children.skipWhile(child => child instanceof Num);
    const subNode: Num = substractable.reduce(
        (existing: Num, num: Num) => new Num(existing.value - num.value)
    );
    if (unsubstractable.isEmpty()) {
        return subNode;
    }

    return new Operator(
        OperatorSymbol.MINUS,
        subNode ? [subNode].concat(unsubstractable.toArray()) : unsubstractable.toArray()
    );
}

function evaluateMul(children: List<Node>): Node {
    const nums: List<Num> = children.filter(child => child instanceof Num);
    const nonNums: List<Node> = children.filter(child => !(child instanceof Num));
    const mulNode: Num = nums.reduce(
        (existing: Num, num: Num) => new Num(existing.value * num.value)
    );
    if (nonNums.isEmpty()) {
        return mulNode;
    }
    return new Operator(
        OperatorSymbol.MUL,
        mulNode ? nonNums.concat(mulNode).toArray() : nonNums.toArray()
    );
}

function evaluateDiv(children: List<Node>): Node {
    const divisible: List<Num> = children.takeWhile(child => child instanceof Num);
    const nonDivisible: List<Node> = children.skipWhile(child => child instanceof Num);
    const divNode: Num = divisible.reduce(
        (existing: Num, num: Num) => new Num(existing.value / num.value)
    );

    if (nonDivisible.isEmpty()) {
        return divNode;
    }
    return new Operator(
        OperatorSymbol.DIV,
        divNode ? [divNode].concat(nonDivisible.toArray()) : nonDivisible.toArray()
    );
}

function evaluatePow(children: List<Node>): Node {
    const nums: List<Num> = children.filter(child => child instanceof Num);
    const nonNums: List<Node> = children.filter(child => !(child instanceof Num));
    const powNode: Num = nums.reduce(
        (existing: Num, num: Num) => new Num(existing.value ** num.value)
    );

    if (nonNums.isEmpty()) {
        return powNode;
    }
    return new Operator(
        OperatorSymbol.POW,
        powNode ? nonNums.concat(powNode).toArray() : nonNums.toArray()
    );
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
                child => evaluateDepends(List([child, dependency])).value === 1
            )
                ? TRUE
                : FALSE;
        }
        if (!dependent.equals(dependency)) {
            return FALSE;
        }
        return TRUE;
    }
    return dependents.every(dependent => evaluateDepends(List([dependent, dependency])).value === 1)
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
    return children.every(child => child.evaluate().value > 0) ? TRUE : FALSE;
}

function evaluateLogicalOr(children: List<Node>): Num {
    return children.some(child => child.evaluate().value > 0) ? TRUE : FALSE;
}

function evaluateEquals(children: List<Node>): Num {
    return children.every(child => child.equals(children.first())) ? TRUE : FALSE;
}

function evaluateNegation(children: List<Node>): Num {
    if (children.size !== 1) {
        throw Error(`Cannot do negation evaluation on ${children.size} childen`);
    }
    return children.first<Node>().evaluate().value === 1 ? FALSE : TRUE;
}

type EvaluateFunction = (children: List<Node>) => Node;

type Evaluator = {
    f: EvaluateFunction;
    recursive: boolean;
};

const evaluators: Map<OperatorSymbol, Evaluator> = Map<OperatorSymbol, Evaluator>([
    [OperatorSymbol.PLUS, { f: evaluatePlus, recursive: false }],
    [OperatorSymbol.MINUS, { f: evaluateMinus, recursive: false }],
    [OperatorSymbol.MUL, { f: evaluateMul, recursive: false }],
    [OperatorSymbol.DIV, { f: evaluateDiv, recursive: false }],
    [OperatorSymbol.POW, { f: evaluatePow, recursive: false }],
    [OperatorSymbol.DEPENDS, { f: evaluateDepends, recursive: true }],
    [OperatorSymbol.AND, { f: evaluateLogicalAnd, recursive: false }],
    [OperatorSymbol.OR, { f: evaluateLogicalOr, recursive: false }],
    [OperatorSymbol.NOT, { f: evaluateNegation, recursive: false }],
    [OperatorSymbol.FLAG, { f: evaluateFlag, recursive: false }],
    [OperatorSymbol.EQUALS, { f: evaluateEquals, recursive: false }],
]);
