import { Map, List } from 'immutable';
import { Expr, Num, Symbol, Operator, OperatorSymbol, Generic, False, True } from './Object';
import { chartreuse } from 'color-name';

type ChildStringifier = (child: Operator, index: number, parent: Operator) => string;

enum Char {
    LeftParen = '(',
    RightParen = ')',
    Separator = ',',
    Space = '',
    Generic = '$',
}

function infix(expr: Operator): string {
    return expr.children.size > 1
        ? expr.children.join(expr.value)
        : expr.value + expr.children.first();
}

function prefix(expr: Operator): string {
    return expr.value + Char.LeftParen + expr.children.join(Char.Separator) + Char.RightParen;
}

function parenthesize(child: Node): string {
    return Char.LeftParen + child + Char.RightParen;
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

const stringifierMap: Map<string, ChildStringifier> = Map({
    [OperatorSymbol.Plus]: () => 'tris',
});


Expr.prototype.toString = function toString(): string {
    return this.value.toString();
};

Generic.prototype.toString = function toString(): string {
    return Char.Generic + this.value.toString();
};

Operator.prototype.toString = function toString(): string {
    return 'tris';
}