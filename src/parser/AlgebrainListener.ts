// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
 * This interface defines a complete listener for a parse tree produced by
 * `AlgebrainParser`.
 */
export interface AlgebrainListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by the `printExpr`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    enterPrintExpr?: (ctx: PrintExprContext) => void;
    /**
     * Exit a parse tree produced by the `printExpr`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    exitPrintExpr?: (ctx: PrintExprContext) => void;

    /**
     * Enter a parse tree produced by the `blank`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    enterBlank?: (ctx: BlankContext) => void;
    /**
     * Exit a parse tree produced by the `blank`
     * labeled alternative in `AlgebrainParser.stat`.
     * @param ctx the parse tree
     */
    exitBlank?: (ctx: BlankContext) => void;

    /**
     * Enter a parse tree produced by the `Logical`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterLogical?: (ctx: LogicalContext) => void;
    /**
     * Exit a parse tree produced by the `Logical`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitLogical?: (ctx: LogicalContext) => void;

    /**
     * Enter a parse tree produced by the `BooleanOperator`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterBooleanOperator?: (ctx: BooleanOperatorContext) => void;
    /**
     * Exit a parse tree produced by the `BooleanOperator`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitBooleanOperator?: (ctx: BooleanOperatorContext) => void;

    /**
     * Enter a parse tree produced by the `Negation`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterNegation?: (ctx: NegationContext) => void;
    /**
     * Exit a parse tree produced by the `Negation`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitNegation?: (ctx: NegationContext) => void;

    /**
     * Enter a parse tree produced by the `Equality`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterEquality?: (ctx: EqualityContext) => void;
    /**
     * Exit a parse tree produced by the `Equality`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitEquality?: (ctx: EqualityContext) => void;

    /**
     * Enter a parse tree produced by the `Flag`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterFlag?: (ctx: FlagContext) => void;
    /**
     * Exit a parse tree produced by the `Flag`
     * labeled alternative in `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitFlag?: (ctx: FlagContext) => void;

    /**
     * Enter a parse tree produced by the `Pow`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterPow?: (ctx: PowContext) => void;
    /**
     * Exit a parse tree produced by the `Pow`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitPow?: (ctx: PowContext) => void;

    /**
     * Enter a parse tree produced by the `MulDiv`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Exit a parse tree produced by the `MulDiv`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitMulDiv?: (ctx: MulDivContext) => void;

    /**
     * Enter a parse tree produced by the `AddSub`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterAddSub?: (ctx: AddSubContext) => void;
    /**
     * Exit a parse tree produced by the `AddSub`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitAddSub?: (ctx: AddSubContext) => void;

    /**
     * Enter a parse tree produced by the `RewritingRule`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterRewritingRule?: (ctx: RewritingRuleContext) => void;
    /**
     * Exit a parse tree produced by the `RewritingRule`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitRewritingRule?: (ctx: RewritingRuleContext) => void;

    /**
     * Enter a parse tree produced by the `Parens`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterParens?: (ctx: ParensContext) => void;
    /**
     * Exit a parse tree produced by the `Parens`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitParens?: (ctx: ParensContext) => void;

    /**
     * Enter a parse tree produced by the `Unary`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterUnary?: (ctx: UnaryContext) => void;
    /**
     * Exit a parse tree produced by the `Unary`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitUnary?: (ctx: UnaryContext) => void;

    /**
     * Enter a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterOperator?: (ctx: OperatorContext) => void;
    /**
     * Exit a parse tree produced by the `Operator`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitOperator?: (ctx: OperatorContext) => void;

    /**
     * Enter a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterRewritable?: (ctx: RewritableContext) => void;
    /**
     * Exit a parse tree produced by the `Rewritable`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitRewritable?: (ctx: RewritableContext) => void;

    /**
     * Enter a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterNumber?: (ctx: NumberContext) => void;
    /**
     * Exit a parse tree produced by the `Number`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitNumber?: (ctx: NumberContext) => void;

    /**
     * Enter a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    enterId?: (ctx: IdContext) => void;
    /**
     * Exit a parse tree produced by the `Id`
     * labeled alternative in `AlgebrainParser.expr`.
     * @param ctx the parse tree
     */
    exitId?: (ctx: IdContext) => void;

    /**
     * Enter a parse tree produced by `AlgebrainParser.prog`.
     * @param ctx the parse tree
     */
    enterProg?: (ctx: ProgContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.prog`.
     * @param ctx the parse tree
     */
    exitProg?: (ctx: ProgContext) => void;

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
     * Enter a parse tree produced by `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    enterBexp?: (ctx: BexpContext) => void;
    /**
     * Exit a parse tree produced by `AlgebrainParser.bexp`.
     * @param ctx the parse tree
     */
    exitBexp?: (ctx: BexpContext) => void;
}
