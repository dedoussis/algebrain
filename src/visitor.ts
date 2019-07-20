import { AlgebrainVisitor } from './parser/AlgebrainVisitor'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
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
  PrintExprContext
} from './parser/AlgebrainParser'
import { Node, Num, Symbol, Rewritable, Operator, OperatorSymbol } from './nodes'

export default class Visitor extends AbstractParseTreeVisitor<Node>
  implements AlgebrainVisitor<Node> {
  private constructOperator(symbol: string, childrenValues: any[]): Operator {
    const children: Node[] = childrenValues.map(value => this.visit(value))
    return new Operator(symbol, children)
  }

  defaultResult(): Node {
    return new Node(null)
  }

  visitPrintExpr(ctx: PrintExprContext): Node {
    return this.visit(ctx.expr())
  }

  visitInt(ctx: IntContext): Num {
    return new Num(Number(ctx.INT().text))
  }

  visitId(ctx: IdContext): Symbol {
    return new Symbol(ctx.ID().text)
  }

  visitPow(ctx: PowContext): Operator {
    const left: Node = this.visit(ctx.expr(0))
    const right: Node = this.visit(ctx.expr(1))
    return new Operator(OperatorSymbol.POW, [left, right])
  }

  visitAddSub(ctx: AddSubContext): Operator {
    if (ctx._op.text === undefined) {
      throw Error
    }
    return this.constructOperator(ctx._op.text, [ctx.expr(0), ctx.expr(1)])
  }

  visitMulDiv(ctx: MulDivContext): Operator {
    if (ctx._op.text === undefined) {
      throw Error
    }
    return this.constructOperator(ctx._op.text, [ctx.expr(0), ctx.expr(1)])
  }

  visitParens(ctx: ParensContext): Node {
    return this.visit(ctx.expr())
  }

  visitOperator(ctx: OperatorContext): Node {
    return this.constructOperator(ctx.ID().text, ctx.expr())
  }

  visitRewritable(ctx: RewritableContext): Rewritable {
    return new Rewritable(ctx.REWRITABLE().text)
  }

  visitLogical(ctx: LogicalContext): Operator {
    if (ctx._op.text === undefined) {
      throw Error
    }
    return this.constructOperator(ctx._op.text, [ctx.bexp(0), ctx.bexp(1)])
  }

  visitEquality(ctx: EqualityContext): Operator {
    return this.constructOperator(OperatorSymbol.EQUALS, [ctx.expr(0), ctx.expr(1)])
  }

  visitFlag(ctx: FlagContext): Operator {
    return this.constructOperator(OperatorSymbol.FLAG, [ctx.TRUE() ? '1' : '0'])
  }

  visitNegation(ctx: NegationContext): Operator {
    return this.constructOperator(OperatorSymbol.NOT, [ctx.bexp().text])
  }

  visitBooleanOperator(ctx: BooleanOperatorContext): Operator {
    return this.constructOperator(ctx.ID().text, ctx.expr())
  }

  visitUnary(ctx: UnaryContext): Operator {
    return this.constructOperator(OperatorSymbol.MINUS, [ctx._val.text])
  }
}
