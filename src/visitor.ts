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
    OperatorContext,
    TrueContext,
    FalseContext,
    BooleanExprParensContext,
    EquationContext,
    BooleanAtomEquationContext,
    MultiplyingExprContext,
    PowExprContext,
    AdditionExprContext,
    AtomExprContext,
} from './parser/AlgebrainParser';
import { Executable } from './executable';
import { Node, Num, Symbol, Rewritable, Operator, OperatorSymbol, TRUE, FALSE } from './nodes';
import { Rule } from './rule';
import { Transformation } from './transformation';
import { Command, CommandName } from './commands';

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

    private visitTypeCtx(type: any, tree: ParseTree): any {
        // TODO generic type
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

    visitOperator(ctx: OperatorContext): Operator {
        return this.visitOperatorCtx(ctx.func());
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

    visitBooleanAtomEquation(ctx: BooleanAtomEquationContext): Operator {
        return this.visitEquation(ctx.equation());
    }

    visitEquation(ctx: EquationContext): Operator {
        return this.constructOperator(OperatorSymbol.EQUALS, List(ctx.expr()));
    }

    visitBooleanExpr(ctx: BooleanExprContext): Node {
        if (ctx._op.text === undefined) {
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
        return this.constructOperator(OperatorSymbol.POW, List(ctx.expr()));
    }

    visitAtomExpr(ctx: AtomExprContext): Node {
        return this.visitNodeCtx(ctx.signedAtom());
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
