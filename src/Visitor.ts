import { List } from 'immutable';
import { AlgebrainVisitor } from './parser/AlgebrainVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import {
    IdContext,
    RewritableContext,
    NumberContext,
    ExprParensContext,
    CommandContext,
    TransformationContext,
    RewritingContext,
    BooleanExprContext,
    FuncContext,
    TrueContext,
    FalseContext,
    BooleanExprParensContext,
    EquationContext,
    MultiplyingExprContext,
    PowExprContext,
    AdditionExprContext,
    UnaryContext,
} from './parser/AlgebrainParser';
import Object, {
    Expr,
    Num,
    Symbol,
    Rewritable,
    Operator,
    OperatorSymbol,
    True,
    False,
    Command,
    CommandName,
    Rule,
    Transformation,
} from './Object';
import { Token } from 'antlr4ts/Token';

export default class Visitor extends AbstractParseTreeVisitor<Object>
    implements AlgebrainVisitor<Object> {
    private constructOperator(symbol: string, childrenValues: List<ParseTree>): Operator {
        const children: List<Expr> = childrenValues.map(value => this.visitNodeCtx(value));
        return new Operator(symbol, children);
    }

    private visitNodeCtx: (tree: ParseTree) => Expr = (tree: ParseTree) =>
        this.visitTypeCtx(Expr, tree);

    private visitOperatorCtx: (tree: ParseTree) => Operator = (tree: ParseTree) =>
        this.visitTypeCtx(Operator, tree);

    private visitTypeCtx(type: Function, tree: ParseTree): any {
        const result: Object = this.visit(tree);
        if (!(result instanceof type)) {
            throw Error(`Parsed tree should be of ${type.constructor.name} type`);
        }
        return result;
    }

    defaultResult(): Expr {
        return False;
    }

    visitNumber(ctx: NumberContext): Num {
        return new Num(Number(ctx.NUMBER().text));
    }

    visitId(ctx: IdContext): Symbol {
        return new Symbol(ctx.ID().text);
    }

    visitRewritable(ctx: RewritableContext): Rewritable {
        return new Rewritable(ctx.ID().text);
    }

    visitExprParens(ctx: ExprParensContext): Expr {
        return this.visitNodeCtx(ctx.expr());
    }

    visitFunc(ctx: FuncContext): Operator {
        return this.constructOperator(ctx.ID().text, List(ctx.expr()));
    }

    visitTrue(_: TrueContext): Num {
        return True;
    }

    visitFalse(_: FalseContext): Num {
        return False;
    }

    visitBooleanExprParens(ctx: BooleanExprParensContext): Expr {
        return this.visitNodeCtx(ctx.booleanExpr());
    }

    visitEquation(ctx: EquationContext): Operator {
        return this.constructOperator(OperatorSymbol.Equals, List(ctx.expr()));
    }

    visitBooleanExpr(ctx: BooleanExprContext): Expr {
        if ((ctx._op as Token | undefined) === undefined) {
            return this.visitNodeCtx(ctx.booleanAtom(0));
        }
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.booleanAtom()));
    }

    visitAdditionExpr(ctx: AdditionExprContext): Expr {
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.expr()));
    }

    visitMultiplyingExpr(ctx: MultiplyingExprContext): Expr {
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.expr()));
    }

    visitPowExpr(ctx: PowExprContext): Expr {
        return this.constructOperator(OperatorSymbol.Pow, List(ctx.expr()));
    }

    visitUnary(ctx: UnaryContext): Operator {
        return this.constructOperator(OperatorSymbol.Minus, List([ctx.signedAtom()]));
    }

    visitRewriting(ctx: RewritingContext): Rule {
        const lhs: Expr = this.visitNodeCtx(ctx.expr(0));
        const rhs: Expr = this.visitNodeCtx(ctx.expr(1));
        const bexpCtx: BooleanExprContext | undefined = ctx.booleanExpr();
        const condition: Expr | undefined =
            bexpCtx !== undefined ? this.visitNodeCtx(bexpCtx) : bexpCtx;
        return new Rule(lhs, rhs, condition);
    }

    visitCommand(ctx: CommandContext): Command {
        const params: List<string> = List(ctx.ID().map(id => id.text));
        const cmd: CommandName = ctx.COMMAND().text as CommandName;
        return new Command(cmd, params);
    }

    visitTransformation(ctx: TransformationContext): Transformation {
        return new Transformation(
            ctx.ID().text,
            List<Rule>(ctx.rewriting().map(ruleCtx => this.visitTypeCtx(Rule, ruleCtx)))
        );
    }
}
