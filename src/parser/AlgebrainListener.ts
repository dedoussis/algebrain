// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
 * This interface defines a complete listener for a parse tree produced by
 * `AlgebrainParser`.
 */
export interface AlgebrainListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterOperator?: (ctx: OperatorContext) => void;
    /**
     * Exit a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitOperator?: (ctx: OperatorContext) => void;

    /**
     * Enter a parse tree produced by the `True`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterTrue?: (ctx: TrueContext) => void;
    /**
     * Exit a parse tree produced by the `True`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitTrue?: (ctx: TrueContext) => void;

    /**
     * Enter a parse tree produced by the `False`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterFalse?: (ctx: FalseContext) => void;
    /**
     * Exit a parse tree produced by the `False`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitFalse?: (ctx: FalseContext) => void;

    /**
     * Enter a parse tree produced by the `BooleanAtomEquation`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanAtomEquation?: (ctx: BooleanAtomEquationContext) => void;
    /**
     * Exit a parse tree produced by the `BooleanAtomEquation`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanAtomEquation?: (ctx: BooleanAtomEquationContext) => void;

    /**
     * Enter a parse tree produced by the `BooleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    enterBooleanExprParens?: (ctx: BooleanExprParensContext) => void;
    /**
     * Exit a parse tree produced by the `BooleanExprParens`
     * labeled alternative in `AlgebrainParser.booleanAtom`.
     * @param ctx the parse tree
     */
    exitBooleanExprParens?: (ctx: BooleanExprParensContext) => void;

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
     * Enter a parse tree produced by the `atomExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterAtomExpr?: (ctx: AtomExprContext) => void;
    /**
     * Exit a parse tree produced by the `atomExpr`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitAtomExpr?: (ctx: AtomExprContext) => void;

    /**
     * Enter a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterRewritable?: (ctx: RewritableContext) => void;
    /**
     * Exit a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitRewritable?: (ctx: RewritableContext) => void;

    /**
     * Enter a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterNumber?: (ctx: NumberContext) => void;
    /**
     * Exit a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitNumber?: (ctx: NumberContext) => void;

    /**
     * Enter a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterId?: (ctx: IdContext) => void;
    /**
     * Exit a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    exitId?: (ctx: IdContext) => void;

    /**
     * Enter a parse tree produced by the `ExprParens`
     * labeled alternative in `AlgebrainParser.atom`.
     * @param ctx the parse tree
     */
    enterExprParens?: (ctx: ExprParensContext) => void;
    /**
     * Exit a parse tree produced by the `ExprParens`
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
