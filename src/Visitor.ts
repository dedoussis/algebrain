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
import Executable from './Executable';
import Node, { Num, Symbol, Rewritable, Operator, OperatorSymbol, TRUE, FALSE } from './Node';
import Rule from './Rule';
import Transformation from './Transformation';
import Command, { CommandName } from './Command';
import { Token } from 'antlr4ts/Token';

export default class Visitor extends AbstractParseTreeVisitor<Executable>
    implements AlgebrainVisitor<Executable> {
    private constructOperator(symbol: string, childrenValues: List<any>): Operator {
        const children: List<Node> = childrenValues.map(value => this.visitNodeCtx(value));
        return new Operator(symbol, children);
    }

    private visitNodeCtx: (tree: ParseTree) => Node = (tree: ParseTree) =>
        this.visitTypeCtx(Node, tree);

    private visitOperatorCtx: (tree: ParseTree) => Operator = (tree: ParseTree) =>
        this.visitTypeCtx(Operator, tree);

    private visitTypeCtx(type: Function, tree: ParseTree): any {
        const result: Executable = this.visit(tree);
        if (!(result instanceof type)) {
            throw Error(`Parsed tree should be of ${type.constructor.name} type`);
        }
        return result;
    }

    defaultResult(): Node {
        return new Node(null);
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

    visitExprParens(ctx: ExprParensContext): Node {
        return this.visitNodeCtx(ctx.expr());
    }

    visitFunc(ctx: FuncContext): Operator {
        return this.constructOperator(ctx.ID().text, List(ctx.expr()));
    }

    visitTrue(_: TrueContext): Num {
        return TRUE;
    }

    visitFalse(_: FalseContext): Num {
        return FALSE;
    }

    visitBooleanExprParens(ctx: BooleanExprParensContext): Node {
        return this.visitNodeCtx(ctx.booleanExpr());
    }

    visitEquation(ctx: EquationContext): Operator {
        return this.constructOperator(OperatorSymbol.Equals, List(ctx.expr()));
    }

    visitBooleanExpr(ctx: BooleanExprContext): Node {
        if ((ctx._op as Token | undefined) === undefined) {
            return this.visitNodeCtx(ctx.booleanAtom(0));
        }
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.booleanAtom()));
    }

    visitAdditionExpr(ctx: AdditionExprContext): Node {
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.expr()));
    }

    visitMultiplyingExpr(ctx: MultiplyingExprContext): Node {
        return this.constructOperator(ctx._op.text as OperatorSymbol, List(ctx.expr()));
    }

    visitPowExpr(ctx: PowExprContext): Node {
        return this.constructOperator(OperatorSymbol.Pow, List(ctx.expr()));
    }

    visitUnary(ctx: UnaryContext): Operator {
        return this.constructOperator(OperatorSymbol.Minus, List([ctx.signedAtom()]));
    }

    visitRewriting(ctx: RewritingContext): Rule {
        const lhs: Node = this.visitNodeCtx(ctx.expr(0));
        const rhs: Node = this.visitNodeCtx(ctx.expr(1));
        const bexpCtx: BooleanExprContext | undefined = ctx.booleanExpr();
        const condition: Node | undefined =
            bexpCtx !== undefined ? this.visitNodeCtx(bexpCtx) : bexpCtx;
        return new Rule(lhs, rhs, condition);
    }

    visitCommand(ctx: CommandContext): Command | Symbol | Operator {
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
