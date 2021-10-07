import { Expr, Num, Symbol, Operator, OperatorSymbol, False, True } from './Object';
import { List, Map } from 'immutable';

type Evaluator = (expr: Operator) => Expr;

function evaluateNumericalOperator(
    commutative: boolean,
    operation: (left: number, right: number) => number
): Evaluator {
    return (expr: Operator): Expr => {
        const reducedChildren = expr.children.reduce((reducedChildren: List<Expr>, child: Expr) => {
            const last = reducedChildren.last();
            if (last instanceof Num && child instanceof Num) {
                return reducedChildren.butLast().push(new Num(operation(last.value, child.value)));
            }
            const numComparator: (previous: Expr, next: Expr) => number = (previous, next) => {
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
        }, List());
        const first: Expr = reducedChildren.first();
        return reducedChildren.size === 1 ? first : expr.setChildren(reducedChildren);
    };
}

function evaluateDepends(expr: Operator): Num {
    const dependent: Expr = expr.children.first();
    const dependency: Expr = expr.children.last();
    if (dependency instanceof Num) {
        throw Error(`No expression can depend on ${dependency}`);
    }
    if (dependent.equals(dependency)) {
        return True;
    }
    if (dependent instanceof Operator) {
        if (
            dependent.children.some(child =>
                evaluateDepends(expr.setChildren(List([child, dependency]))).equals(True)
            )
        ) {
            return True;
        }
    }
    return False;
}

const evaluatorMap: Map<string, Evaluator> = Map({
    [OperatorSymbol.Plus]: evaluateNumericalOperator(true, (left, right) => left + right),
    [OperatorSymbol.Minus]: evaluateNumericalOperator(false, (left, right) => left - right),
    [OperatorSymbol.Mul]: evaluateNumericalOperator(true, (left, right) => left * right),
    [OperatorSymbol.Div]: evaluateNumericalOperator(false, (left, right) => left / right),
    [OperatorSymbol.Pow]: evaluateNumericalOperator(false, (left, right) => left ^ right),
    [OperatorSymbol.Depends]: evaluateDepends,
    [OperatorSymbol.And]: (expr: Operator) =>
        expr.children.every(child => child.equals(True)) ? True : False,
    [OperatorSymbol.Or]: (expr: Operator) =>
        expr.children.some(child => child.equals(True)) ? True : False,
    [OperatorSymbol.Not]: (expr: Operator) =>
        expr.children.first(True).equals(True) ? False : True,
    [OperatorSymbol.Flag]: (expr: Operator) =>
        expr.children.first(True).equals(True) ? True : False,
    [OperatorSymbol.Equals]: (expr: Operator) =>
        expr.children.every(child => child.equals(expr.children.first())) ? True : False,
    [OperatorSymbol.Constant]: (expr: Operator) =>
        expr.children.first() instanceof Num || expr.children.first() instanceof Symbol
            ? True
            : False,
});

export default function evaluate(expr: Expr): Expr {
    if (expr instanceof Num) {
        return expr.value < 0
            ? new Operator(OperatorSymbol.Minus, List([new Num(expr.value * -1)]))
            : expr;
    }
    if (expr instanceof Operator) {
        const evaluator = evaluatorMap.get(expr.value, () => expr);
        const evaluatedChildren = expr.children.map((child: Expr) => evaluate(child));
        return evaluator(expr.setChildren(evaluatedChildren));
    }
    return expr;
}
