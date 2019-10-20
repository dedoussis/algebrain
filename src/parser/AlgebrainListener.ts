// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
 * This interface defines a complete listener for a parse tree produced by
 * `AlgebrainParser`.
 */
export interface AlgebrainListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by the `booleanAtomFunc_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanAtomFunc_?: (ctx: BooleanAtomFunc_Context) => void;
    /**
     * Exit a parse tree produced by the `booleanAtomFunc_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanAtomFunc_?: (ctx: BooleanAtomFunc_Context) => void;

    /**
     * Enter a parse tree produced by the `true`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterTrue?: (ctx: TrueContext) => void;
    /**
     * Exit a parse tree produced by the `true`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitTrue?: (ctx: TrueContext) => void;

    /**
     * Enter a parse tree produced by the `false`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterFalse?: (ctx: FalseContext) => void;
    /**
     * Exit a parse tree produced by the `false`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitFalse?: (ctx: FalseContext) => void;

    /**
     * Enter a parse tree produced by the `booleanAtomEquation_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanAtomEquation_?: (ctx: BooleanAtomEquation_Context) => void;
    /**
     * Exit a parse tree produced by the `booleanAtomEquation_`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanAtomEquation_?: (ctx: BooleanAtomEquation_Context) => void;

    /**
     * Enter a parse tree produced by the `booleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanExprParens?: (ctx: BooleanExprParensContext) => void;
    /**
     * Exit a parse tree produced by the `booleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanExprParens?: (ctx: BooleanExprParensContext) => void;

    /**
     * Enter a parse tree produced by the `unary`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    enterUnary?: (ctx: UnaryContext) => void;
    /**
     * Exit a parse tree produced by the `unary`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    exitUnary?: (ctx: UnaryContext) => void;

    /**
     * Enter a parse tree produced by the `signedAtomFunc_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    enterSignedAtomFunc_?: (ctx: SignedAtomFunc_Context) => void;
    /**
     * Exit a parse tree produced by the `signedAtomFunc_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    exitSignedAtomFunc_?: (ctx: SignedAtomFunc_Context) => void;

    /**
     * Enter a parse tree produced by the `signedAtomAtom_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    enterSignedAtomAtom_?: (ctx: SignedAtomAtom_Context) => void;
    /**
     * Exit a parse tree produced by the `signedAtomAtom_`
     * labeled alternative in `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    exitSignedAtomAtom_?: (ctx: SignedAtomAtom_Context) => void;

    /**
     * Enter a parse tree produced by the `powExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterPowExpr?: (ctx: PowExprContext) => void;
    /**
     * Exit a parse tree produced by the `powExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitPowExpr?: (ctx: PowExprContext) => void;

    /**
     * Enter a parse tree produced by the `multiplyingExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterMultiplyingExpr?: (ctx: MultiplyingExprContext) => void;
    /**
     * Exit a parse tree produced by the `multiplyingExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitMultiplyingExpr?: (ctx: MultiplyingExprContext) => void;

    /**
     * Enter a parse tree produced by the `additionExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterAdditionExpr?: (ctx: AdditionExprContext) => void;
    /**
     * Exit a parse tree produced by the `additionExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitAdditionExpr?: (ctx: AdditionExprContext) => void;

    /**
     * Enter a parse tree produced by the `exprSignedAtom_`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterExprSignedAtom_?: (ctx: ExprSignedAtom_Context) => void;
    /**
     * Exit a parse tree produced by the `exprSignedAtom_`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitExprSignedAtom_?: (ctx: ExprSignedAtom_Context) => void;

    /**
     * Enter a parse tree produced by the `rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterRewritable?: (ctx: RewritableContext) => void;
    /**
     * Exit a parse tree produced by the `rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitRewritable?: (ctx: RewritableContext) => void;

    /**
     * Enter a parse tree produced by the `number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterNumber?: (ctx: NumberContext) => void;
    /**
     * Exit a parse tree produced by the `number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitNumber?: (ctx: NumberContext) => void;

    /**
     * Enter a parse tree produced by the `id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterId?: (ctx: IdContext) => void;
    /**
     * Exit a parse tree produced by the `id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitId?: (ctx: IdContext) => void;

    /**
     * Enter a parse tree produced by the `exprParens`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterExprParens?: (ctx: ExprParensContext) => void;
    /**
     * Exit a parse tree produced by the `exprParens`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitExprParens?: (ctx: ExprParensContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    enterStat?: (ctx: StatContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    exitStat?: (ctx: StatContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.command`.
     * @param ctx the parse tree
     */
    enterCommand?: (ctx: CommandContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.command`.
     * @param ctx the parse tree
     */
    exitCommand?: (ctx: CommandContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.transformation`.
     * @param ctx the parse tree
     */
    enterTransformation?: (ctx: TransformationContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.transformation`.
     * @param ctx the parse tree
     */
    exitTransformation?: (ctx: TransformationContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.rewriting`.
     * @param ctx the parse tree
     */
    enterRewriting?: (ctx: RewritingContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.rewriting`.
     * @param ctx the parse tree
     */
    exitRewriting?: (ctx: RewritingContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.booleanExpr`.
     * @param ctx the parse tree
     */
    enterBooleanExpr?: (ctx: BooleanExprContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.booleanExpr`.
     * @param ctx the parse tree
     */
    exitBooleanExpr?: (ctx: BooleanExprContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.equation`.
     * @param ctx the parse tree
     */
    enterEquation?: (ctx: EquationContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.equation`.
     * @param ctx the parse tree
     */
    exitEquation?: (ctx: EquationContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanAtom?: (ctx: BooleanAtomContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanAtom?: (ctx: BooleanAtomContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterExpr?: (ctx: ExprContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitExpr?: (ctx: ExprContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    enterSignedAtom?: (ctx: SignedAtomContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.signedAtom`.
     * @param ctx the parse tree
     */
    exitSignedAtom?: (ctx: SignedAtomContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.func`.
     * @param ctx the parse tree
     */
    enterFunc?: (ctx: FuncContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.func`.
     * @param ctx the parse tree
     */
    exitFunc?: (ctx: FuncContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterAtom?: (ctx: AtomContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitAtom?: (ctx: AtomContext) => void;
}
