// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { AlgebrainListener } from './AlgebrainListener';
import { AlgebrainVisitor } from './AlgebrainVisitor';

export class AlgebrainParser extends Parser {
    public static readonly REWRITABLE_PREFIX = 1;
    public static readonly SPACE = 2;
    public static readonly COMMAND = 3;
    public static readonly TRUE = 4;
    public static readonly FALSE = 5;
    public static readonly IF = 6;
    public static readonly AND = 7;
    public static readonly OR = 8;
    public static readonly ID = 9;
    public static readonly POINT = 10;
    public static readonly COLON = 11;
    public static readonly NOT = 12;
    public static readonly NUMBER = 13;
    public static readonly POW = 14;
    public static readonly MUL = 15;
    public static readonly DIV = 16;
    public static readonly PLUS = 17;
    public static readonly MINUS = 18;
    public static readonly LPAREN = 19;
    public static readonly RPAREN = 20;
    public static readonly LSQPAREN = 21;
    public static readonly RSQPAREN = 22;
    public static readonly COMMA = 23;
    public static readonly EQUALS = 24;
    public static readonly NEWLINE = 25;
    public static readonly WS = 26;
    public static readonly RULE_stat = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_transformation = 2;
    public static readonly RULE_rewriting = 3;
    public static readonly RULE_booleanExpr = 4;
    public static readonly RULE_equation = 5;
    public static readonly RULE_booleanAtom = 6;
    public static readonly RULE_expr = 7;
    public static readonly RULE_signedAtom = 8;
    public static readonly RULE_func = 9;
    public static readonly RULE_atom = 10;
    // tslint:disable:no-trailing-whitespace
    public static readonly ruleNames: string[] = [
        'stat',
        'command',
        'transformation',
        'rewriting',
        'booleanExpr',
        'equation',
        'booleanAtom',
        'expr',
        'signedAtom',
        'func',
        'atom',
    ];

    private static readonly _LITERAL_NAMES: Array<string | undefined> = [
        undefined,
        "'$'",
        "' '",
        undefined,
        "'true'",
        "'false'",
        "'if'",
        "'and'",
        "'or'",
        undefined,
        "'.'",
        "':'",
        "'not'",
        undefined,
        "'^'",
        "'*'",
        "'/'",
        "'+'",
        "'-'",
        "'('",
        "')'",
        "'['",
        "']'",
        "','",
        "'='",
    ];
    private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
        undefined,
        'REWRITABLE_PREFIX',
        'SPACE',
        'COMMAND',
        'TRUE',
        'FALSE',
        'IF',
        'AND',
        'OR',
        'ID',
        'POINT',
        'COLON',
        'NOT',
        'NUMBER',
        'POW',
        'MUL',
        'DIV',
        'PLUS',
        'MINUS',
        'LPAREN',
        'RPAREN',
        'LSQPAREN',
        'RSQPAREN',
        'COMMA',
        'EQUALS',
        'NEWLINE',
        'WS',
    ];
    public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
        AlgebrainParser._LITERAL_NAMES,
        AlgebrainParser._SYMBOLIC_NAMES,
        []
    );

    // @Override
    // @NotNull
    public get vocabulary(): Vocabulary {
        return AlgebrainParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace

    // @Override
    public get grammarFileName(): string {
        return 'Algebrain.g4';
    }

    // @Override
    public get ruleNames(): string[] {
        return AlgebrainParser.ruleNames;
    }

    // @Override
    public get serializedATN(): string {
        return AlgebrainParser._serializedATN;
    }

    constructor(input: TokenStream) {
        super(input);
        this._interp = new ParserATNSimulator(AlgebrainParser._ATN, this);
    }
    // @RuleVersion(0)
    public stat(): StatContext {
        let _localctx: StatContext = new StatContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, AlgebrainParser.RULE_stat);
        try {
            this.state = 27;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 22;
                        this.command();
                    }
                    break;

                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 23;
                        this.transformation();
                    }
                    break;

                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 24;
                        this.rewriting();
                    }
                    break;

                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 25;
                        this.booleanExpr();
                    }
                    break;

                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 26;
                        this.expr(0);
                    }
                    break;
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public command(): CommandContext {
        let _localctx: CommandContext = new CommandContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, AlgebrainParser.RULE_command);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 29;
                this.match(AlgebrainParser.COMMAND);
                this.state = 39;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === AlgebrainParser.COLON) {
                    {
                        this.state = 30;
                        this.match(AlgebrainParser.COLON);
                        this.state = 31;
                        this.match(AlgebrainParser.ID);
                        this.state = 36;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === AlgebrainParser.COMMA) {
                            {
                                {
                                    this.state = 32;
                                    this.match(AlgebrainParser.COMMA);
                                    this.state = 33;
                                    this.match(AlgebrainParser.ID);
                                }
                            }
                            this.state = 38;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                    }
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public transformation(): TransformationContext {
        let _localctx: TransformationContext = new TransformationContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, AlgebrainParser.RULE_transformation);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 41;
                this.match(AlgebrainParser.ID);
                this.state = 42;
                this.match(AlgebrainParser.EQUALS);
                this.state = 43;
                this.match(AlgebrainParser.LSQPAREN);
                this.state = 44;
                this.rewriting();
                this.state = 49;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === AlgebrainParser.COMMA) {
                    {
                        {
                            this.state = 45;
                            this.match(AlgebrainParser.COMMA);
                            this.state = 46;
                            this.rewriting();
                        }
                    }
                    this.state = 51;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 52;
                this.match(AlgebrainParser.RSQPAREN);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public rewriting(): RewritingContext {
        let _localctx: RewritingContext = new RewritingContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, AlgebrainParser.RULE_rewriting);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 54;
                this.expr(0);
                this.state = 55;
                this.match(AlgebrainParser.EQUALS);
                this.state = 56;
                this.expr(0);
                this.state = 61;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === AlgebrainParser.SPACE) {
                    {
                        this.state = 57;
                        this.match(AlgebrainParser.SPACE);
                        this.state = 58;
                        this.match(AlgebrainParser.IF);
                        this.state = 59;
                        this.match(AlgebrainParser.SPACE);
                        this.state = 60;
                        this.booleanExpr();
                    }
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public booleanExpr(): BooleanExprContext {
        let _localctx: BooleanExprContext = new BooleanExprContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, AlgebrainParser.RULE_booleanExpr);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 63;
                this.booleanAtom();
                this.state = 70;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === AlgebrainParser.SPACE) {
                    {
                        {
                            this.state = 64;
                            this.match(AlgebrainParser.SPACE);
                            this.state = 65;
                            _localctx._op = this._input.LT(1);
                            _la = this._input.LA(1);
                            if (!(_la === AlgebrainParser.AND || _la === AlgebrainParser.OR)) {
                                _localctx._op = this._errHandler.recoverInline(this);
                            } else {
                                if (this._input.LA(1) === Token.EOF) {
                                    this.matchedEOF = true;
                                }

                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 66;
                            this.match(AlgebrainParser.SPACE);
                            this.state = 67;
                            this.booleanAtom();
                        }
                    }
                    this.state = 72;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public equation(): EquationContext {
        let _localctx: EquationContext = new EquationContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, AlgebrainParser.RULE_equation);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 73;
                this.expr(0);
                this.state = 74;
                this.match(AlgebrainParser.EQUALS);
                this.state = 75;
                this.match(AlgebrainParser.EQUALS);
                this.state = 76;
                this.expr(0);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public booleanAtom(): BooleanAtomContext {
        let _localctx: BooleanAtomContext = new BooleanAtomContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, AlgebrainParser.RULE_booleanAtom);
        try {
            this.state = 86;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
                case 1:
                    _localctx = new BooleanAtomFunc_Context(_localctx);
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 78;
                        this.func();
                    }
                    break;

                case 2:
                    _localctx = new TrueContext(_localctx);
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 79;
                        this.match(AlgebrainParser.TRUE);
                    }
                    break;

                case 3:
                    _localctx = new FalseContext(_localctx);
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 80;
                        this.match(AlgebrainParser.FALSE);
                    }
                    break;

                case 4:
                    _localctx = new BooleanAtomEquation_Context(_localctx);
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 81;
                        this.equation();
                    }
                    break;

                case 5:
                    _localctx = new BooleanExprParensContext(_localctx);
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 82;
                        this.match(AlgebrainParser.LPAREN);
                        this.state = 83;
                        this.booleanExpr();
                        this.state = 84;
                        this.match(AlgebrainParser.RPAREN);
                    }
                    break;
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }

    public expr(): ExprContext;
    public expr(_p: number): ExprContext;
    // @RuleVersion(0)
    public expr(_p?: number): ExprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
        let _prevctx: ExprContext = _localctx;
        let _startState: number = 14;
        this.enterRecursionRule(_localctx, 14, AlgebrainParser.RULE_expr, _p);
        let _la: number;
        try {
            let _alt: number;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    _localctx = new ExprSignedAtom_Context(_localctx);
                    this._ctx = _localctx;
                    _prevctx = _localctx;

                    this.state = 89;
                    this.signedAtom();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 102;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = _localctx;
                        {
                            this.state = 100;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 7, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new PowExprContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 91;
                                        if (!this.precpred(this._ctx, 4)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 4)'
                                            );
                                        }
                                        this.state = 92;
                                        this.match(AlgebrainParser.POW);
                                        this.state = 93;
                                        this.expr(5);
                                    }
                                    break;

                                case 2:
                                    {
                                        _localctx = new MultiplyingExprContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 94;
                                        if (!this.precpred(this._ctx, 3)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 3)'
                                            );
                                        }
                                        this.state = 95;
                                        (_localctx as MultiplyingExprContext)._op = this._input.LT(
                                            1
                                        );
                                        _la = this._input.LA(1);
                                        if (
                                            !(
                                                _la === AlgebrainParser.MUL ||
                                                _la === AlgebrainParser.DIV
                                            )
                                        ) {
                                            (_localctx as MultiplyingExprContext)._op = this._errHandler.recoverInline(
                                                this
                                            );
                                        } else {
                                            if (this._input.LA(1) === Token.EOF) {
                                                this.matchedEOF = true;
                                            }

                                            this._errHandler.reportMatch(this);
                                            this.consume();
                                        }
                                        this.state = 96;
                                        this.expr(4);
                                    }
                                    break;

                                case 3:
                                    {
                                        _localctx = new AdditionExprContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 97;
                                        if (!this.precpred(this._ctx, 2)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 2)'
                                            );
                                        }
                                        this.state = 98;
                                        (_localctx as AdditionExprContext)._op = this._input.LT(1);
                                        _la = this._input.LA(1);
                                        if (
                                            !(
                                                _la === AlgebrainParser.PLUS ||
                                                _la === AlgebrainParser.MINUS
                                            )
                                        ) {
                                            (_localctx as AdditionExprContext)._op = this._errHandler.recoverInline(
                                                this
                                            );
                                        } else {
                                            if (this._input.LA(1) === Token.EOF) {
                                                this.matchedEOF = true;
                                            }

                                            this._errHandler.reportMatch(this);
                                            this.consume();
                                        }
                                        this.state = 99;
                                        this.expr(3);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 104;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public signedAtom(): SignedAtomContext {
        let _localctx: SignedAtomContext = new SignedAtomContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, AlgebrainParser.RULE_signedAtom);
        try {
            this.state = 109;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
                case 1:
                    _localctx = new UnaryContext(_localctx);
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 105;
                        this.match(AlgebrainParser.MINUS);
                        this.state = 106;
                        this.signedAtom();
                    }
                    break;

                case 2:
                    _localctx = new SignedAtomFunc_Context(_localctx);
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 107;
                        this.func();
                    }
                    break;

                case 3:
                    _localctx = new SignedAtomAtom_Context(_localctx);
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 108;
                        this.atom();
                    }
                    break;
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public func(): FuncContext {
        let _localctx: FuncContext = new FuncContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, AlgebrainParser.RULE_func);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 111;
                this.match(AlgebrainParser.ID);
                this.state = 112;
                this.match(AlgebrainParser.LPAREN);
                this.state = 113;
                this.expr(0);
                this.state = 118;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === AlgebrainParser.COMMA) {
                    {
                        {
                            this.state = 114;
                            this.match(AlgebrainParser.COMMA);
                            this.state = 115;
                            this.expr(0);
                        }
                    }
                    this.state = 120;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 121;
                this.match(AlgebrainParser.RPAREN);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    public atom(): AtomContext {
        let _localctx: AtomContext = new AtomContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, AlgebrainParser.RULE_atom);
        try {
            this.state = 131;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case AlgebrainParser.REWRITABLE_PREFIX:
                    _localctx = new RewritableContext(_localctx);
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 123;
                        this.match(AlgebrainParser.REWRITABLE_PREFIX);
                        this.state = 124;
                        this.match(AlgebrainParser.ID);
                    }
                    break;
                case AlgebrainParser.NUMBER:
                    _localctx = new NumberContext(_localctx);
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 125;
                        this.match(AlgebrainParser.NUMBER);
                    }
                    break;
                case AlgebrainParser.ID:
                    _localctx = new IdContext(_localctx);
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 126;
                        this.match(AlgebrainParser.ID);
                    }
                    break;
                case AlgebrainParser.LPAREN:
                    _localctx = new ExprParensContext(_localctx);
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 127;
                        this.match(AlgebrainParser.LPAREN);
                        this.state = 128;
                        this.expr(0);
                        this.state = 129;
                        this.match(AlgebrainParser.RPAREN);
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return _localctx;
    }

    public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
            case 7:
                return this.expr_sempred(_localctx as ExprContext, predIndex);
        }
        return true;
    }
    private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 4);

            case 1:
                return this.precpred(this._ctx, 3);

            case 2:
                return this.precpred(this._ctx, 2);
        }
        return true;
    }

    public static readonly _serializedATN: string =
        '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1C\x88\x04\x02' +
        '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
        '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x03\x02\x03\x02' +
        '\x03\x02\x03\x02\x03\x02\x05\x02\x1E\n\x02\x03\x03\x03\x03\x03\x03\x03' +
        '\x03\x03\x03\x07\x03%\n\x03\f\x03\x0E\x03(\v\x03\x05\x03*\n\x03\x03\x04' +
        '\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x07\x042\n\x04\f\x04\x0E\x04' +
        '5\v\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05' +
        '\x03\x05\x05\x05@\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06' +
        'G\n\x06\f\x06\x0E\x06J\v\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03' +
        '\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\bY\n\b\x03\t\x03\t\x03' +
        '\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\tg\n\t\f' +
        '\t\x0E\tj\v\t\x03\n\x03\n\x03\n\x03\n\x05\np\n\n\x03\v\x03\v\x03\v\x03' +
        '\v\x03\v\x07\vw\n\v\f\v\x0E\vz\v\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f' +
        '\x03\f\x03\f\x03\f\x03\f\x05\f\x86\n\f\x03\f\x02\x02\x03\x10\r\x02\x02' +
        '\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16' +
        '\x02\x02\x05\x03\x02\t\n\x03\x02\x11\x12\x03\x02\x13\x14\x02\x92\x02\x1D' +
        '\x03\x02\x02\x02\x04\x1F\x03\x02\x02\x02\x06+\x03\x02\x02\x02\b8\x03\x02' +
        '\x02\x02\nA\x03\x02\x02\x02\fK\x03\x02\x02\x02\x0EX\x03\x02\x02\x02\x10' +
        'Z\x03\x02\x02\x02\x12o\x03\x02\x02\x02\x14q\x03\x02\x02\x02\x16\x85\x03' +
        '\x02\x02\x02\x18\x1E\x05\x04\x03\x02\x19\x1E\x05\x06\x04\x02\x1A\x1E\x05' +
        '\b\x05\x02\x1B\x1E\x05\n\x06\x02\x1C\x1E\x05\x10\t\x02\x1D\x18\x03\x02' +
        '\x02\x02\x1D\x19\x03\x02\x02\x02\x1D\x1A\x03\x02\x02\x02\x1D\x1B\x03\x02' +
        '\x02\x02\x1D\x1C\x03\x02\x02\x02\x1E\x03\x03\x02\x02\x02\x1F)\x07\x05' +
        '\x02\x02 !\x07\r\x02\x02!&\x07\v\x02\x02"#\x07\x19\x02\x02#%\x07\v\x02' +
        '\x02$"\x03\x02\x02\x02%(\x03\x02\x02\x02&$\x03\x02\x02\x02&\'\x03\x02' +
        "\x02\x02'*\x03\x02\x02\x02(&\x03\x02\x02\x02) \x03\x02\x02\x02)*\x03" +
        '\x02\x02\x02*\x05\x03\x02\x02\x02+,\x07\v\x02\x02,-\x07\x1A\x02\x02-.' +
        '\x07\x17\x02\x02.3\x05\b\x05\x02/0\x07\x19\x02\x0202\x05\b\x05\x021/\x03' +
        '\x02\x02\x0225\x03\x02\x02\x0231\x03\x02\x02\x0234\x03\x02\x02\x0246\x03' +
        '\x02\x02\x0253\x03\x02\x02\x0267\x07\x18\x02\x027\x07\x03\x02\x02\x02' +
        '89\x05\x10\t\x029:\x07\x1A\x02\x02:?\x05\x10\t\x02;<\x07\x04\x02\x02<' +
        '=\x07\b\x02\x02=>\x07\x04\x02\x02>@\x05\n\x06\x02?;\x03\x02\x02\x02?@' +
        '\x03\x02\x02\x02@\t\x03\x02\x02\x02AH\x05\x0E\b\x02BC\x07\x04\x02\x02' +
        'CD\t\x02\x02\x02DE\x07\x04\x02\x02EG\x05\x0E\b\x02FB\x03\x02\x02\x02G' +
        'J\x03\x02\x02\x02HF\x03\x02\x02\x02HI\x03\x02\x02\x02I\v\x03\x02\x02\x02' +
        'JH\x03\x02\x02\x02KL\x05\x10\t\x02LM\x07\x1A\x02\x02MN\x07\x1A\x02\x02' +
        'NO\x05\x10\t\x02O\r\x03\x02\x02\x02PY\x05\x14\v\x02QY\x07\x06\x02\x02' +
        'RY\x07\x07\x02\x02SY\x05\f\x07\x02TU\x07\x15\x02\x02UV\x05\n\x06\x02V' +
        'W\x07\x16\x02\x02WY\x03\x02\x02\x02XP\x03\x02\x02\x02XQ\x03\x02\x02\x02' +
        'XR\x03\x02\x02\x02XS\x03\x02\x02\x02XT\x03\x02\x02\x02Y\x0F\x03\x02\x02' +
        '\x02Z[\b\t\x01\x02[\\\x05\x12\n\x02\\h\x03\x02\x02\x02]^\f\x06\x02\x02' +
        '^_\x07\x10\x02\x02_g\x05\x10\t\x07`a\f\x05\x02\x02ab\t\x03\x02\x02bg\x05' +
        '\x10\t\x06cd\f\x04\x02\x02de\t\x04\x02\x02eg\x05\x10\t\x05f]\x03\x02\x02' +
        '\x02f`\x03\x02\x02\x02fc\x03\x02\x02\x02gj\x03\x02\x02\x02hf\x03\x02\x02' +
        '\x02hi\x03\x02\x02\x02i\x11\x03\x02\x02\x02jh\x03\x02\x02\x02kl\x07\x14' +
        '\x02\x02lp\x05\x12\n\x02mp\x05\x14\v\x02np\x05\x16\f\x02ok\x03\x02\x02' +
        '\x02om\x03\x02\x02\x02on\x03\x02\x02\x02p\x13\x03\x02\x02\x02qr\x07\v' +
        '\x02\x02rs\x07\x15\x02\x02sx\x05\x10\t\x02tu\x07\x19\x02\x02uw\x05\x10' +
        '\t\x02vt\x03\x02\x02\x02wz\x03\x02\x02\x02xv\x03\x02\x02\x02xy\x03\x02' +
        '\x02\x02y{\x03\x02\x02\x02zx\x03\x02\x02\x02{|\x07\x16\x02\x02|\x15\x03' +
        '\x02\x02\x02}~\x07\x03\x02\x02~\x86\x07\v\x02\x02\x7F\x86\x07\x0F\x02' +
        '\x02\x80\x86\x07\v\x02\x02\x81\x82\x07\x15\x02\x02\x82\x83\x05\x10\t\x02' +
        '\x83\x84\x07\x16\x02\x02\x84\x86\x03\x02\x02\x02\x85}\x03\x02\x02\x02' +
        '\x85\x7F\x03\x02\x02\x02\x85\x80\x03\x02\x02\x02\x85\x81\x03\x02\x02\x02' +
        '\x86\x17\x03\x02\x02\x02\x0E\x1D&)3?HXfhox\x85';
    public static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!AlgebrainParser.__ATN) {
            AlgebrainParser.__ATN = new ATNDeserializer().deserialize(
                Utils.toCharArray(AlgebrainParser._serializedATN)
            );
        }

        return AlgebrainParser.__ATN;
    }
}

export class StatContext extends ParserRuleContext {
    public command(): CommandContext | undefined {
        return this.tryGetRuleContext(0, CommandContext);
    }
    public transformation(): TransformationContext | undefined {
        return this.tryGetRuleContext(0, TransformationContext);
    }
    public rewriting(): RewritingContext | undefined {
        return this.tryGetRuleContext(0, RewritingContext);
    }
    public booleanExpr(): BooleanExprContext | undefined {
        return this.tryGetRuleContext(0, BooleanExprContext);
    }
    public expr(): ExprContext | undefined {
        return this.tryGetRuleContext(0, ExprContext);
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_stat;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterStat) {
            listener.enterStat(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitStat) {
            listener.exitStat(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitStat) {
            return visitor.visitStat(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class CommandContext extends ParserRuleContext {
    public COMMAND(): TerminalNode {
        return this.getToken(AlgebrainParser.COMMAND, 0);
    }
    public COLON(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.COLON, 0);
    }
    public ID(): TerminalNode[];
    public ID(i: number): TerminalNode;
    public ID(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.ID);
        } else {
            return this.getToken(AlgebrainParser.ID, i);
        }
    }
    public COMMA(): TerminalNode[];
    public COMMA(i: number): TerminalNode;
    public COMMA(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.COMMA);
        } else {
            return this.getToken(AlgebrainParser.COMMA, i);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_command;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterCommand) {
            listener.enterCommand(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitCommand) {
            listener.exitCommand(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitCommand) {
            return visitor.visitCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class TransformationContext extends ParserRuleContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    public EQUALS(): TerminalNode {
        return this.getToken(AlgebrainParser.EQUALS, 0);
    }
    public LSQPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.LSQPAREN, 0);
    }
    public rewriting(): RewritingContext[];
    public rewriting(i: number): RewritingContext;
    public rewriting(i?: number): RewritingContext | RewritingContext[] {
        if (i === undefined) {
            return this.getRuleContexts(RewritingContext);
        } else {
            return this.getRuleContext(i, RewritingContext);
        }
    }
    public RSQPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.RSQPAREN, 0);
    }
    public COMMA(): TerminalNode[];
    public COMMA(i: number): TerminalNode;
    public COMMA(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.COMMA);
        } else {
            return this.getToken(AlgebrainParser.COMMA, i);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_transformation;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterTransformation) {
            listener.enterTransformation(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitTransformation) {
            listener.exitTransformation(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitTransformation) {
            return visitor.visitTransformation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class RewritingContext extends ParserRuleContext {
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public EQUALS(): TerminalNode {
        return this.getToken(AlgebrainParser.EQUALS, 0);
    }
    public SPACE(): TerminalNode[];
    public SPACE(i: number): TerminalNode;
    public SPACE(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.SPACE);
        } else {
            return this.getToken(AlgebrainParser.SPACE, i);
        }
    }
    public IF(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.IF, 0);
    }
    public booleanExpr(): BooleanExprContext | undefined {
        return this.tryGetRuleContext(0, BooleanExprContext);
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_rewriting;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterRewriting) {
            listener.enterRewriting(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitRewriting) {
            listener.exitRewriting(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitRewriting) {
            return visitor.visitRewriting(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class BooleanExprContext extends ParserRuleContext {
    public _op: Token;
    public booleanAtom(): BooleanAtomContext[];
    public booleanAtom(i: number): BooleanAtomContext;
    public booleanAtom(i?: number): BooleanAtomContext | BooleanAtomContext[] {
        if (i === undefined) {
            return this.getRuleContexts(BooleanAtomContext);
        } else {
            return this.getRuleContext(i, BooleanAtomContext);
        }
    }
    public SPACE(): TerminalNode[];
    public SPACE(i: number): TerminalNode;
    public SPACE(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.SPACE);
        } else {
            return this.getToken(AlgebrainParser.SPACE, i);
        }
    }
    public AND(): TerminalNode[];
    public AND(i: number): TerminalNode;
    public AND(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.AND);
        } else {
            return this.getToken(AlgebrainParser.AND, i);
        }
    }
    public OR(): TerminalNode[];
    public OR(i: number): TerminalNode;
    public OR(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.OR);
        } else {
            return this.getToken(AlgebrainParser.OR, i);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_booleanExpr;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBooleanExpr) {
            listener.enterBooleanExpr(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBooleanExpr) {
            listener.exitBooleanExpr(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBooleanExpr) {
            return visitor.visitBooleanExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class EquationContext extends ParserRuleContext {
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public EQUALS(): TerminalNode[];
    public EQUALS(i: number): TerminalNode;
    public EQUALS(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.EQUALS);
        } else {
            return this.getToken(AlgebrainParser.EQUALS, i);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_equation;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterEquation) {
            listener.enterEquation(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitEquation) {
            listener.exitEquation(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitEquation) {
            return visitor.visitEquation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class BooleanAtomContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_booleanAtom;
    }
    public copyFrom(ctx: BooleanAtomContext): void {
        super.copyFrom(ctx);
    }
}
export class BooleanAtomFunc_Context extends BooleanAtomContext {
    public func(): FuncContext {
        return this.getRuleContext(0, FuncContext);
    }
    constructor(ctx: BooleanAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBooleanAtomFunc_) {
            listener.enterBooleanAtomFunc_(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBooleanAtomFunc_) {
            listener.exitBooleanAtomFunc_(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBooleanAtomFunc_) {
            return visitor.visitBooleanAtomFunc_(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TrueContext extends BooleanAtomContext {
    public TRUE(): TerminalNode {
        return this.getToken(AlgebrainParser.TRUE, 0);
    }
    constructor(ctx: BooleanAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterTrue) {
            listener.enterTrue(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitTrue) {
            listener.exitTrue(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitTrue) {
            return visitor.visitTrue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FalseContext extends BooleanAtomContext {
    public FALSE(): TerminalNode {
        return this.getToken(AlgebrainParser.FALSE, 0);
    }
    constructor(ctx: BooleanAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterFalse) {
            listener.enterFalse(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitFalse) {
            listener.exitFalse(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitFalse) {
            return visitor.visitFalse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BooleanAtomEquation_Context extends BooleanAtomContext {
    public equation(): EquationContext {
        return this.getRuleContext(0, EquationContext);
    }
    constructor(ctx: BooleanAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBooleanAtomEquation_) {
            listener.enterBooleanAtomEquation_(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBooleanAtomEquation_) {
            listener.exitBooleanAtomEquation_(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBooleanAtomEquation_) {
            return visitor.visitBooleanAtomEquation_(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BooleanExprParensContext extends BooleanAtomContext {
    public LPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.LPAREN, 0);
    }
    public booleanExpr(): BooleanExprContext {
        return this.getRuleContext(0, BooleanExprContext);
    }
    public RPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.RPAREN, 0);
    }
    constructor(ctx: BooleanAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBooleanExprParens) {
            listener.enterBooleanExprParens(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBooleanExprParens) {
            listener.exitBooleanExprParens(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBooleanExprParens) {
            return visitor.visitBooleanExprParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class ExprContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_expr;
    }
    public copyFrom(ctx: ExprContext): void {
        super.copyFrom(ctx);
    }
}
export class PowExprContext extends ExprContext {
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public POW(): TerminalNode {
        return this.getToken(AlgebrainParser.POW, 0);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterPowExpr) {
            listener.enterPowExpr(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitPowExpr) {
            listener.exitPowExpr(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitPowExpr) {
            return visitor.visitPowExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MultiplyingExprContext extends ExprContext {
    public _op: Token;
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public MUL(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.MUL, 0);
    }
    public DIV(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.DIV, 0);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterMultiplyingExpr) {
            listener.enterMultiplyingExpr(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitMultiplyingExpr) {
            listener.exitMultiplyingExpr(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitMultiplyingExpr) {
            return visitor.visitMultiplyingExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AdditionExprContext extends ExprContext {
    public _op: Token;
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public PLUS(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.PLUS, 0);
    }
    public MINUS(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.MINUS, 0);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterAdditionExpr) {
            listener.enterAdditionExpr(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitAdditionExpr) {
            listener.exitAdditionExpr(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitAdditionExpr) {
            return visitor.visitAdditionExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExprSignedAtom_Context extends ExprContext {
    public signedAtom(): SignedAtomContext {
        return this.getRuleContext(0, SignedAtomContext);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterExprSignedAtom_) {
            listener.enterExprSignedAtom_(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitExprSignedAtom_) {
            listener.exitExprSignedAtom_(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitExprSignedAtom_) {
            return visitor.visitExprSignedAtom_(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class SignedAtomContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_signedAtom;
    }
    public copyFrom(ctx: SignedAtomContext): void {
        super.copyFrom(ctx);
    }
}
export class UnaryContext extends SignedAtomContext {
    public MINUS(): TerminalNode {
        return this.getToken(AlgebrainParser.MINUS, 0);
    }
    public signedAtom(): SignedAtomContext {
        return this.getRuleContext(0, SignedAtomContext);
    }
    constructor(ctx: SignedAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterUnary) {
            listener.enterUnary(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitUnary) {
            listener.exitUnary(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitUnary) {
            return visitor.visitUnary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SignedAtomFunc_Context extends SignedAtomContext {
    public func(): FuncContext {
        return this.getRuleContext(0, FuncContext);
    }
    constructor(ctx: SignedAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterSignedAtomFunc_) {
            listener.enterSignedAtomFunc_(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitSignedAtomFunc_) {
            listener.exitSignedAtomFunc_(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitSignedAtomFunc_) {
            return visitor.visitSignedAtomFunc_(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SignedAtomAtom_Context extends SignedAtomContext {
    public atom(): AtomContext {
        return this.getRuleContext(0, AtomContext);
    }
    constructor(ctx: SignedAtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterSignedAtomAtom_) {
            listener.enterSignedAtomAtom_(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitSignedAtomAtom_) {
            listener.exitSignedAtomAtom_(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitSignedAtomAtom_) {
            return visitor.visitSignedAtomAtom_(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class FuncContext extends ParserRuleContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    public LPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.LPAREN, 0);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext;
    public expr(i?: number): ExprContext | ExprContext[] {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        } else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    public RPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.RPAREN, 0);
    }
    public COMMA(): TerminalNode[];
    public COMMA(i: number): TerminalNode;
    public COMMA(i?: number): TerminalNode | TerminalNode[] {
        if (i === undefined) {
            return this.getTokens(AlgebrainParser.COMMA);
        } else {
            return this.getToken(AlgebrainParser.COMMA, i);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_func;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterFunc) {
            listener.enterFunc(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitFunc) {
            listener.exitFunc(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitFunc) {
            return visitor.visitFunc(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class AtomContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_atom;
    }
    public copyFrom(ctx: AtomContext): void {
        super.copyFrom(ctx);
    }
}
export class RewritableContext extends AtomContext {
    public REWRITABLE_PREFIX(): TerminalNode {
        return this.getToken(AlgebrainParser.REWRITABLE_PREFIX, 0);
    }
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    constructor(ctx: AtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterRewritable) {
            listener.enterRewritable(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitRewritable) {
            listener.exitRewritable(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitRewritable) {
            return visitor.visitRewritable(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NumberContext extends AtomContext {
    public NUMBER(): TerminalNode {
        return this.getToken(AlgebrainParser.NUMBER, 0);
    }
    constructor(ctx: AtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterNumber) {
            listener.enterNumber(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitNumber) {
            listener.exitNumber(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitNumber) {
            return visitor.visitNumber(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdContext extends AtomContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    constructor(ctx: AtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterId) {
            listener.enterId(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitId) {
            listener.exitId(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitId) {
            return visitor.visitId(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExprParensContext extends AtomContext {
    public LPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.LPAREN, 0);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext);
    }
    public RPAREN(): TerminalNode {
        return this.getToken(AlgebrainParser.RPAREN, 0);
    }
    constructor(ctx: AtomContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterExprParens) {
            listener.enterExprParens(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitExprParens) {
            listener.exitExprParens(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitExprParens) {
            return visitor.visitExprParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
