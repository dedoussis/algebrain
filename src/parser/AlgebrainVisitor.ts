// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { OperatorContext } from './AlgebrainParser';
import { TrueContext } from './AlgebrainParser';
import { FalseContext } from './AlgebrainParser';
import { BooleanAtomEquationContext } from './AlgebrainParser';
import { BooleanExprParensContext } from './AlgebrainParser';
import { PowExprContext } from './AlgebrainParser';
import { MultiplyingExprContext } from './AlgebrainParser';
import { AdditionExprContext } from './AlgebrainParser';
import { AtomExprContext } from './AlgebrainParser';
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
     * Visit a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOperator?: (ctx: OperatorContext) => Result;

    /**
     * Visit a parse tree produced by the `True`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTrue?: (ctx: TrueContext) => Result;

    /**
     * Visit a parse tree produced by the `False`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFalse?: (ctx: FalseContext) => Result;

    /**
     * Visit a parse tree produced by the `BooleanAtomEquation`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanAtomEquation?: (ctx: BooleanAtomEquationContext) => Result;

    /**
     * Visit a parse tree produced by the `BooleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanExprParens?: (ctx: BooleanExprParensContext) => Result;

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
     * Visit a parse tree produced by the `atomExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAtomExpr?: (ctx: AtomExprContext) => Result;

    /**
     * Visit a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRewritable?: (ctx: RewritableContext) => Result;

    /**
     * Visit a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumber?: (ctx: NumberContext) => Result;

    /**
     * Visit a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitId?: (ctx: IdContext) => Result;

    /**
     * Visit a parse tree produced by the `ExprParens`
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
