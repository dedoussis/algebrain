// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { BooleanAtomFunc_Context } from './AlgebrainParser';
import { TrueContext } from './AlgebrainParser';
import { FalseContext } from './AlgebrainParser';
import { BooleanAtomEquation_Context } from './AlgebrainParser';
import { BooleanExprParensContext } from './AlgebrainParser';
import { UnaryContext } from './AlgebrainParser';
import { SignedAtomFunc_Context } from './AlgebrainParser';
import { SignedAtomAtom_Context } from './AlgebrainParser';
import { PowExprContext } from './AlgebrainParser';
import { MultiplyingExprContext } from './AlgebrainParser';
import { AdditionExprContext } from './AlgebrainParser';
import { ExprSignedAtom_Context } from './AlgebrainParser';
import { RewritableContext } from './AlgebrainParser';
import { NumberContext } from './AlgebrainParser';
import { IdContext } from './AlgebrainParser';
import { ExprParensContext } from './AlgebrainParser';
import { StatContext } from './AlgebrainParser';
import { CommandContext } from './AlgebrainParser';
import { TransformationContext } from './AlgebrainParser';
import { RewritingContext } from './AlgebrainParser';
import { BooleanExprContext } from './AlgebrainParser';
import { EquationContext } from './AlgebrainParser';
import { BooleanAtomContext } from './AlgebrainParser';
import { ExprContext } from './AlgebrainParser';
import { SignedAtomContext } from './AlgebrainParser';
import { FuncContext } from './AlgebrainParser';
import { AtomContext } from './AlgebrainParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `AlgebrainParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface AlgebrainVisitor<Result> extends ParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by the `booleanAtomFunc_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanAtomFunc_?: (ctx: BooleanAtomFunc_Context) => Result;

    /**
     * Visit a parse tree produced by the `true`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTrue?: (ctx: TrueContext) => Result;

    /**
     * Visit a parse tree produced by the `false`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFalse?: (ctx: FalseContext) => Result;

    /**
     * Visit a parse tree produced by the `booleanAtomEquation_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanAtomEquation_?: (ctx: BooleanAtomEquation_Context) => Result;

    /**
     * Visit a parse tree produced by the `booleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanExprParens?: (ctx: BooleanExprParensContext) => Result;

    /**
     * Visit a parse tree produced by the `unary`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnary?: (ctx: UnaryContext) => Result;

    /**
     * Visit a parse tree produced by the `signedAtomFunc_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSignedAtomFunc_?: (ctx: SignedAtomFunc_Context) => Result;

    /**
     * Visit a parse tree produced by the `signedAtomAtom_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSignedAtomAtom_?: (ctx: SignedAtomAtom_Context) => Result;

    /**
     * Visit a parse tree produced by the `powExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPowExpr?: (ctx: PowExprContext) => Result;

    /**
     * Visit a parse tree produced by the `multiplyingExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplyingExpr?: (ctx: MultiplyingExprContext) => Result;

    /**
     * Visit a parse tree produced by the `additionExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdditionExpr?: (ctx: AdditionExprContext) => Result;

    /**
     * Visit a parse tree produced by the `exprSignedAtom_`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprSignedAtom_?: (ctx: ExprSignedAtom_Context) => Result;

    /**
     * Visit a parse tree produced by the `rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRewritable?: (ctx: RewritableContext) => Result;

    /**
     * Visit a parse tree produced by the `number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumber?: (ctx: NumberContext) => Result;

    /**
     * Visit a parse tree produced by the `id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitId?: (ctx: IdContext) => Result;

    /**
     * Visit a parse tree produced by the `exprParens`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprParens?: (ctx: ExprParensContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.stat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStat?: (ctx: StatContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.command`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommand?: (ctx: CommandContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.transformation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTransformation?: (ctx: TransformationContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.rewriting`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRewriting?: (ctx: RewritingContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.booleanExpr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanExpr?: (ctx: BooleanExprContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.equation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEquation?: (ctx: EquationContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanAtom?: (ctx: BooleanAtomContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr?: (ctx: ExprContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSignedAtom?: (ctx: SignedAtomContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.func`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunc?: (ctx: FuncContext) => Result;

    /**
     * Visit a parse tree produced by `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAtom?: (ctx: AtomContext) => Result;
}
