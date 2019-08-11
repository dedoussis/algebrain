import { List } from 'immutable';
import { AlgebrainVisitor } from './parser/AlgebrainVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import {
    IntContext,
    IdContext,
    PowContext,
    AddSubContext,
    MulDivContext,
    ParensContext,
    EqualityContext,
    RewritableContext,
    LogicalContext,
    NegationContext,
    FlagContext,
    BooleanOperatorContext,
    OperatorContext,
    UnaryContext,
    PrintExprContext,
    RewritingRuleContext,
    BexpContext,
} from './parser/AlgebrainParser';
import { Parsable, Node, Num, Symbol, Rewritable, Operator, OperatorSymbol } from './nodes';
import { Rule } from './rule';

export default class Visitor extends AbstractParseTreeVisitor<Parsable>
    implements AlgebrainVisitor<Parsable> {
    private constructOperator(symbol: string, childrenValues: List<any>): Operator {
        const children: List<Node> = childrenValues.map(value => this.visitNodeCtx(value));
        return new Operator(symbol, children);
    }

    private visitNodeCtx: (tree: ParseTree) => Node = (tree: ParseTree) =>
        this.visitTypeCtx(Node, tree);

    private visitOperatorCtx: (tree: ParseTree) => Operator = (tree: ParseTree) =>
        this.visitTypeCtx(Operator, tree);

    private visitTypeCtx(type: any, tree: ParseTree): any {
        const result: Parsable = this.visit(tree);
        if (!(result instanceof type)) {
            throw Error(`Parsed tree should be of ${type.constructor.name} type`);
        }
        return result;
    }

    defaultResult(): Node {
        return new Node(null);
    }

    visitPrintExpr(ctx: PrintExprContext): Parsable {
        return this.visit(ctx.expr());
    }

    visitInt(ctx: IntContext): Num {
        return new Num(Number(ctx.INT().text));
    }

    visitId(ctx: IdContext): Symbol {
        return new Symbol(ctx.ID().text);
    }

    visitPow(ctx: PowContext): Operator {
        return this.constructOperator(OperatorSymbol.POW, List([ctx.expr(0), ctx.expr(1)]));
    }

    visitAddSub(ctx: AddSubContext): Operator {
        return this.constructOperator(ctx._op.text as string, List([ctx.expr(0), ctx.expr(1)]));
    }

    visitMulDiv(ctx: MulDivContext): Operator {
        return this.constructOperator(ctx._op.text as string, List([ctx.expr(0), ctx.expr(1)]));
    }

    visitParens(ctx: ParensContext): Node {
        return this.visitNodeCtx(ctx.expr());
    }

    visitOperator(ctx: OperatorContext): Node {
        return this.constructOperator(ctx.ID().text, List(ctx.expr()));
    }

    visitRewritable(ctx: RewritableContext): Rewritable {
        return new Rewritable(ctx.REWRITABLE().text.substring(1)); // removes $
    }

    visitLogical(ctx: LogicalContext): Operator {
        return this.constructOperator(ctx._op.text as string, List([ctx.bexp(0), ctx.bexp(1)]));
    }

    visitEquality(ctx: EqualityContext): Operator {
        return this.constructOperator(OperatorSymbol.EQUALS, List([ctx.expr(0), ctx.expr(1)]));
    }

    visitFlag(ctx: FlagContext): Operator {
        return this.constructOperator(OperatorSymbol.FLAG, List([ctx.TRUE() ? '1' : '0']));
    }

    visitNegation(ctx: NegationContext): Operator {
        return this.constructOperator(OperatorSymbol.NOT, List([ctx.bexp().text]));
    }

    visitBooleanOperator(ctx: BooleanOperatorContext): Operator {
        return this.constructOperator(ctx.ID().text, List(ctx.expr()));
    }

    visitUnary(ctx: UnaryContext): Operator {
        return this.constructOperator(OperatorSymbol.MINUS, List([ctx._val.text]));
    }

    visitRewritingRule(ctx: RewritingRuleContext): Rule {
        const lhs: Node = this.visitNodeCtx(ctx.expr(0));
        const rhs: Node = this.visitNodeCtx(ctx.expr(1));
        const bexpCtx: BexpContext | undefined = ctx.bexp();
        const condition: Node | undefined =
            bexpCtx !== undefined ? this.visitNodeCtx(bexpCtx) : bexpCtx;
        return new Rule(lhs, rhs, condition);
    }
}
