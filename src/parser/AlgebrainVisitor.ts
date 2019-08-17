// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { PrintExprContext } from './AlgebrainParser';
import { BlankContext } from './AlgebrainParser';
import { LogicalContext } from './AlgebrainParser';
import { BooleanOperatorContext } from './AlgebrainParser';
import { NegationContext } from './AlgebrainParser';
import { EqualityContext } from './AlgebrainParser';
import { FlagContext } from './AlgebrainParser';
import { PowContext } from './AlgebrainParser';
import { MulDivContext } from './AlgebrainParser';
import { AddSubContext } from './AlgebrainParser';
import { RewritingRuleContext } from './AlgebrainParser';
import { ParensContext } from './AlgebrainParser';
import { UnaryContext } from './AlgebrainParser';
import { OperatorContext } from './AlgebrainParser';
import { RewritableContext } from './AlgebrainParser';
import { NumberContext } from './AlgebrainParser';
import { IdContext } from './AlgebrainParser';
import { ProgContext } from './AlgebrainParser';
import { StatContext } from './AlgebrainParser';
import { ExprContext } from './AlgebrainParser';
import { BexpContext } from './AlgebrainParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `AlgebrainParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface AlgebrainVisitor<Result> extends ParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by the `printExpr`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrintExpr?: (ctx: PrintExprContext) => Result;

    /**
     * Visit a parse tree produced by the `blank`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlank?: (ctx: BlankContext) => Result;

    /**
     * Visit a parse tree produced by the `Logical`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogical?: (ctx: LogicalContext) => Result;

    /**
     * Visit a parse tree produced by the `BooleanOperator`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanOperator?: (ctx: BooleanOperatorContext) => Result;

    /**
     * Visit a parse tree produced by the `Negation`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNegation?: (ctx: NegationContext) => Result;

    /**
     * Visit a parse tree produced by the `Equality`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEquality?: (ctx: EqualityContext) => Result;

    /**
     * Visit a parse tree produced by the `Flag`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFlag?: (ctx: FlagContext) => Result;

    /**
     * Visit a parse tree produced by the `Pow`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPow?: (ctx: PowContext) => Result;

    /**
     * Visit a parse tree produced by the `MulDiv`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMulDiv?: (ctx: MulDivContext) => Result;

    /**
     * Visit a parse tree produced by the `AddSub`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddSub?: (ctx: AddSubContext) => Result;

    /**
     * Visit a parse tree produced by the `RewritingRule`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRewritingRule?: (ctx: RewritingRuleContext) => Result;

    /**
     * Visit a parse tree produced by the `Parens`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParens?: (ctx: ParensContext) => Result;

    /**
     * Visit a parse tree produced by the `Unary`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnary?: (ctx: UnaryContext) => Result;

    /**
     * Visit a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOperator?: (ctx: OperatorContext) => Result;

    /**
     * Visit a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRewritable?: (ctx: RewritableContext) => Result;

    /**
     * Visit a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumber?: (ctx: NumberContext) => Result;

    /**
     * Visit a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitId?: (ctx: IdContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.prog`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProg?: (ctx: ProgContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.stat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStat?: (ctx: StatContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr?: (ctx: ExprContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBexp?: (ctx: BexpContext) => Result;
}
