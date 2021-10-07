import { List } from 'immutable';

export default abstract class Object {}

export abstract class Expr extends Object {
    abstract readonly value: number | string;
    abstract equals(other: Expr): boolean;

    toString(): string {
        return this.value.toString();
    }

    evaluate(): Expr {
        return this;
    }

    transform(defaultTransformation: Transformation, transformationMap: TransformationMap = Map()): Expr {
        console.log(transformation);
        return this;
    }
}

export class Num extends Expr {
    constructor(readonly value: number) {
        super();
    }

    equals(other: Expr): boolean {
        return other instanceof Num && this.value === other.value;
    }
}

export class Symbol extends Expr {
    constructor(readonly value: string) {
        super();
    }

    equals(other: Expr): boolean {
        return other instanceof Symbol && this.value === other.value;
    }
}

export class Generic extends Expr {
    constructor(readonly value: string) {
        super();
    }

    equals(other: Expr): boolean {
        return other instanceof Generic && this.value === other.value;
    }
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

export class Operator extends Expr {
    constructor(readonly value: string, readonly children: List<Expr> = List()) {
        super();
    }

    setChildren(childen: List<Expr>): Operator {
        return new Operator(this.value, childen);
    }

    addChild(child: Expr): Operator {
        return new Operator(this.value, this.children.push(child));
    }

    equals(other: Expr): boolean {
        return (
            other instanceof Operator &&
            this.value === other.value &&
            this.children.size === other.children.size &&
            this.children.every((child, index) => {
                const otherChild = other.children.get(index);
                return otherChild instanceof Expr && child.equals(otherChild);
            })
        );
    }
}

export class Rule extends Object {
    constructor(readonly lhs: Expr, readonly rhs: Expr, readonly condition?: Expr) {
        super();
    }
}

export class Transformation extends Object {
    constructor(readonly name: string, readonly rules: List<Rule> = List()) {
        super();
    }

    addRule(rule: Rule): Transformation {
        return new Transformation(this.name, this.rules.push(rule));
    }
}

export enum CommandName {
    Transform = 'transform',
    Transformations = 'transformations',
    Evaluate = 'evaluate',
    Rules = 'rules',
    Help = 'help',
    Tree = 'tree',
}

export class Command extends Object {
    constructor(readonly name: CommandName, readonly parameters: List<string> = List()) {
        super();
    }
}

export const True = new Num(1);
export const False = new Num(0);
