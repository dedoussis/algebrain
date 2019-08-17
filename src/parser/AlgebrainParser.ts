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
    public static readonly ID = 1;
    public static readonly NUMBER = 2;
    public static readonly REWRITABLE = 3;
    public static readonly POW = 4;
    public static readonly MUL = 5;
    public static readonly DIV = 6;
    public static readonly PLUS = 7;
    public static readonly MINUS = 8;
    public static readonly DOLLAR = 9;
    public static readonly LPARENS = 10;
    public static readonly RPARENS = 11;
    public static readonly COMMA = 12;
    public static readonly EQUALS = 13;
    public static readonly TRUE = 14;
    public static readonly FALSE = 15;
    public static readonly SPACE = 16;
    public static readonly IF = 17;
    public static readonly AND = 18;
    public static readonly NOT = 19;
    public static readonly OR = 20;
    public static readonly POINT = 21;
    public static readonly NEWLINE = 22;
    public static readonly WS = 23;
    public static readonly RULE_prog = 0;
    public static readonly RULE_stat = 1;
    public static readonly RULE_expr = 2;
    public static readonly RULE_bexp = 3;
    // tslint:disable:no-trailing-whitespace
    public static readonly ruleNames: string[] = ['prog', 'stat', 'expr', 'bexp'];

    private static readonly _LITERAL_NAMES: Array<string | undefined> = [
        undefined,
        undefined,
        undefined,
        undefined,
        "'^'",
        "'*'",
        "'/'",
        "'+'",
        "'-'",
        "'$'",
        "'('",
        "')'",
        "','",
        "'='",
        "'True'",
        "'False'",
        "' '",
        "' if '",
        "'and'",
        "'not'",
        "'or'",
        "'.'",
    ];
    private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
        undefined,
        'ID',
        'NUMBER',
        'REWRITABLE',
        'POW',
        'MUL',
        'DIV',
        'PLUS',
        'MINUS',
        'DOLLAR',
        'LPARENS',
        'RPARENS',
        'COMMA',
        'EQUALS',
        'TRUE',
        'FALSE',
        'SPACE',
        'IF',
        'AND',
        'NOT',
        'OR',
        'POINT',
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
    public prog(): ProgContext {
        let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, AlgebrainParser.RULE_prog);
        let _la: number;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 9;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 8;
                            this.stat();
                        }
                    }
                    this.state = 11;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (
                    (_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << AlgebrainParser.ID) |
                            (1 << AlgebrainParser.NUMBER) |
                            (1 << AlgebrainParser.REWRITABLE) |
                            (1 << AlgebrainParser.MINUS) |
                            (1 << AlgebrainParser.LPARENS) |
                            (1 << AlgebrainParser.NEWLINE))) !==
                        0
                );
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
    public stat(): StatContext {
        let _localctx: StatContext = new StatContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, AlgebrainParser.RULE_stat);
        try {
            this.state = 17;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case AlgebrainParser.ID:
                case AlgebrainParser.NUMBER:
                case AlgebrainParser.REWRITABLE:
                case AlgebrainParser.MINUS:
                case AlgebrainParser.LPARENS:
                    _localctx = new PrintExprContext(_localctx);
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 13;
                        this.expr(0);
                        this.state = 14;
                        this.match(AlgebrainParser.NEWLINE);
                    }
                    break;
                case AlgebrainParser.NEWLINE:
                    _localctx = new BlankContext(_localctx);
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 16;
                        this.match(AlgebrainParser.NEWLINE);
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
        let _startState: number = 4;
        this.enterRecursionRule(_localctx, 4, AlgebrainParser.RULE_expr, _p);
        let _la: number;
        try {
            let _alt: number;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 41;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 3, this._ctx)) {
                    case 1:
                        {
                            _localctx = new ParensContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;

                            this.state = 20;
                            this.match(AlgebrainParser.LPARENS);
                            this.state = 21;
                            this.expr(0);
                            this.state = 22;
                            this.match(AlgebrainParser.RPARENS);
                        }
                        break;

                    case 2:
                        {
                            _localctx = new UnaryContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 24;
                            this.match(AlgebrainParser.MINUS);
                            this.state = 25;
                            (_localctx as UnaryContext)._val = this._input.LT(1);
                            _la = this._input.LA(1);
                            if (
                                !(
                                    (_la & ~0x1f) === 0 &&
                                    ((1 << _la) &
                                        ((1 << AlgebrainParser.ID) |
                                            (1 << AlgebrainParser.NUMBER) |
                                            (1 << AlgebrainParser.REWRITABLE))) !==
                                        0
                                )
                            ) {
                                (_localctx as UnaryContext)._val = this._errHandler.recoverInline(
                                    this
                                );
                            } else {
                                if (this._input.LA(1) === Token.EOF) {
                                    this.matchedEOF = true;
                                }

                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                        }
                        break;

                    case 3:
                        {
                            _localctx = new OperatorContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 26;
                            this.match(AlgebrainParser.ID);
                            this.state = 27;
                            this.match(AlgebrainParser.LPARENS);
                            this.state = 28;
                            this.expr(0);
                            this.state = 33;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            while (_la === AlgebrainParser.COMMA) {
                                {
                                    {
                                        this.state = 29;
                                        this.match(AlgebrainParser.COMMA);
                                        this.state = 30;
                                        this.expr(0);
                                    }
                                }
                                this.state = 35;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                            }
                            this.state = 36;
                            this.match(AlgebrainParser.RPARENS);
                        }
                        break;

                    case 4:
                        {
                            _localctx = new RewritableContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 38;
                            this.match(AlgebrainParser.REWRITABLE);
                        }
                        break;

                    case 5:
                        {
                            _localctx = new NumberContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 39;
                            this.match(AlgebrainParser.NUMBER);
                        }
                        break;

                    case 6:
                        {
                            _localctx = new IdContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 40;
                            this.match(AlgebrainParser.ID);
                        }
                        break;
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 61;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = _localctx;
                        {
                            this.state = 59;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new PowContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 43;
                                        if (!this.precpred(this._ctx, 10)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 10)'
                                            );
                                        }
                                        this.state = 44;
                                        this.match(AlgebrainParser.POW);
                                        this.state = 45;
                                        this.expr(11);
                                    }
                                    break;

                                case 2:
                                    {
                                        _localctx = new MulDivContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 46;
                                        if (!this.precpred(this._ctx, 9)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 9)'
                                            );
                                        }
                                        this.state = 47;
                                        (_localctx as MulDivContext)._op = this._input.LT(1);
                                        _la = this._input.LA(1);
                                        if (
                                            !(
                                                _la === AlgebrainParser.MUL ||
                                                _la === AlgebrainParser.DIV
                                            )
                                        ) {
                                            (_localctx as MulDivContext)._op = this._errHandler.recoverInline(
                                                this
                                            );
                                        } else {
                                            if (this._input.LA(1) === Token.EOF) {
                                                this.matchedEOF = true;
                                            }

                                            this._errHandler.reportMatch(this);
                                            this.consume();
                                        }
                                        this.state = 48;
                                        this.expr(10);
                                    }
                                    break;

                                case 3:
                                    {
                                        _localctx = new AddSubContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 49;
                                        if (!this.precpred(this._ctx, 8)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 8)'
                                            );
                                        }
                                        this.state = 50;
                                        (_localctx as AddSubContext)._op = this._input.LT(1);
                                        _la = this._input.LA(1);
                                        if (
                                            !(
                                                _la === AlgebrainParser.PLUS ||
                                                _la === AlgebrainParser.MINUS
                                            )
                                        ) {
                                            (_localctx as AddSubContext)._op = this._errHandler.recoverInline(
                                                this
                                            );
                                        } else {
                                            if (this._input.LA(1) === Token.EOF) {
                                                this.matchedEOF = true;
                                            }

                                            this._errHandler.reportMatch(this);
                                            this.consume();
                                        }
                                        this.state = 51;
                                        this.expr(9);
                                    }
                                    break;

                                case 4:
                                    {
                                        _localctx = new RewritingRuleContext(
                                            new ExprContext(_parentctx, _parentState)
                                        );
                                        this.pushNewRecursionContext(
                                            _localctx,
                                            _startState,
                                            AlgebrainParser.RULE_expr
                                        );
                                        this.state = 52;
                                        if (!this.precpred(this._ctx, 7)) {
                                            throw new FailedPredicateException(
                                                this,
                                                'this.precpred(this._ctx, 7)'
                                            );
                                        }
                                        this.state = 53;
                                        this.match(AlgebrainParser.EQUALS);
                                        this.state = 54;
                                        this.expr(0);
                                        this.state = 57;
                                        this._errHandler.sync(this);
                                        switch (
                                            this.interpreter.adaptivePredict(
                                                this._input,
                                                4,
                                                this._ctx
                                            )
                                        ) {
                                            case 1:
                                                {
                                                    this.state = 55;
                                                    this.match(AlgebrainParser.IF);
                                                    this.state = 56;
                                                    this.bexp(0);
                                                }
                                                break;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 63;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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

    public bexp(): BexpContext;
    public bexp(_p: number): BexpContext;
    // @RuleVersion(0)
    public bexp(_p?: number): BexpContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let _localctx: BexpContext = new BexpContext(this._ctx, _parentState);
        let _prevctx: BexpContext = _localctx;
        let _startState: number = 6;
        this.enterRecursionRule(_localctx, 6, AlgebrainParser.RULE_bexp, _p);
        let _la: number;
        try {
            let _alt: number;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 88;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                    case 1:
                        {
                            _localctx = new BooleanOperatorContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;

                            this.state = 65;
                            this.match(AlgebrainParser.ID);
                            this.state = 66;
                            this.match(AlgebrainParser.LPARENS);
                            this.state = 67;
                            this.expr(0);
                            this.state = 72;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            while (_la === AlgebrainParser.COMMA) {
                                {
                                    {
                                        this.state = 68;
                                        this.match(AlgebrainParser.COMMA);
                                        this.state = 69;
                                        this.expr(0);
                                    }
                                }
                                this.state = 74;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                            }
                            this.state = 75;
                            this.match(AlgebrainParser.RPARENS);
                        }
                        break;

                    case 2:
                        {
                            _localctx = new NegationContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 77;
                            this.match(AlgebrainParser.NOT);
                            this.state = 78;
                            this.match(AlgebrainParser.LPARENS);
                            this.state = 79;
                            this.bexp(0);
                            this.state = 80;
                            this.match(AlgebrainParser.RPARENS);
                        }
                        break;

                    case 3:
                        {
                            _localctx = new EqualityContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 82;
                            this.expr(0);
                            this.state = 83;
                            this.match(AlgebrainParser.EQUALS);
                            this.state = 84;
                            this.match(AlgebrainParser.EQUALS);
                            this.state = 85;
                            this.expr(0);
                        }
                        break;

                    case 4:
                        {
                            _localctx = new FlagContext(_localctx);
                            this._ctx = _localctx;
                            _prevctx = _localctx;
                            this.state = 87;
                            _la = this._input.LA(1);
                            if (!(_la === AlgebrainParser.TRUE || _la === AlgebrainParser.FALSE)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                if (this._input.LA(1) === Token.EOF) {
                                    this.matchedEOF = true;
                                }

                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                        }
                        break;
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 95;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new LogicalContext(
                                    new BexpContext(_parentctx, _parentState)
                                );
                                this.pushNewRecursionContext(
                                    _localctx,
                                    _startState,
                                    AlgebrainParser.RULE_bexp
                                );
                                this.state = 90;
                                if (!this.precpred(this._ctx, 5)) {
                                    throw new FailedPredicateException(
                                        this,
                                        'this.precpred(this._ctx, 5)'
                                    );
                                }
                                this.state = 91;
                                (_localctx as LogicalContext)._op = this._input.LT(1);
                                _la = this._input.LA(1);
                                if (
                                    !(
                                        (_la & ~0x1f) === 0 &&
                                        ((1 << _la) &
                                            ((1 << AlgebrainParser.AND) |
                                                (1 << AlgebrainParser.NOT) |
                                                (1 << AlgebrainParser.OR))) !==
                                            0
                                    )
                                ) {
                                    (_localctx as LogicalContext)._op = this._errHandler.recoverInline(
                                        this
                                    );
                                } else {
                                    if (this._input.LA(1) === Token.EOF) {
                                        this.matchedEOF = true;
                                    }

                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 92;
                                this.bexp(6);
                            }
                        }
                    }
                    this.state = 97;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
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

    public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
            case 2:
                return this.expr_sempred(_localctx as ExprContext, predIndex);

            case 3:
                return this.bexp_sempred(_localctx as BexpContext, predIndex);
        }
        return true;
    }
    private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 10);

            case 1:
                return this.precpred(this._ctx, 9);

            case 2:
                return this.precpred(this._ctx, 8);

            case 3:
                return this.precpred(this._ctx, 7);
        }
        return true;
    }
    private bexp_sempred(_localctx: BexpContext, predIndex: number): boolean {
        switch (predIndex) {
            case 4:
                return this.precpred(this._ctx, 5);
        }
        return true;
    }

    public static readonly _serializedATN: string =
        '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x19e\x04\x02' +
        '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x06\x02\f\n\x02' +
        '\r\x02\x0E\x02\r\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x14\n\x03\x03' +
        '\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03' +
        '\x04\x03\x04\x03\x04\x07\x04"\n\x04\f\x04\x0E\x04%\v\x04\x03\x04\x03' +
        '\x04\x03\x04\x03\x04\x03\x04\x05\x04,\n\x04\x03\x04\x03\x04\x03\x04\x03' +
        '\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03' +
        '\x04\x03\x04\x05\x04<\n\x04\x07\x04>\n\x04\f\x04\x0E\x04A\v\x04\x03\x05' +
        '\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05I\n\x05\f\x05\x0E\x05' +
        'L\v\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05' +
        '\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05[\n\x05\x03\x05\x03\x05' +
        '\x03\x05\x07\x05`\n\x05\f\x05\x0E\x05c\v\x05\x03\x05\x02\x02\x04\x06\b' +
        '\x06\x02\x02\x04\x02\x06\x02\b\x02\x02\x07\x03\x02\x03\x05\x03\x02\x07' +
        '\b\x03\x02\t\n\x03\x02\x10\x11\x03\x02\x14\x16\x02r\x02\v\x03\x02\x02' +
        '\x02\x04\x13\x03\x02\x02\x02\x06+\x03\x02\x02\x02\bZ\x03\x02\x02\x02\n' +
        '\f\x05\x04\x03\x02\v\n\x03\x02\x02\x02\f\r\x03\x02\x02\x02\r\v\x03\x02' +
        '\x02\x02\r\x0E\x03\x02\x02\x02\x0E\x03\x03\x02\x02\x02\x0F\x10\x05\x06' +
        '\x04\x02\x10\x11\x07\x18\x02\x02\x11\x14\x03\x02\x02\x02\x12\x14\x07\x18' +
        '\x02\x02\x13\x0F\x03\x02\x02\x02\x13\x12\x03\x02\x02\x02\x14\x05\x03\x02' +
        '\x02\x02\x15\x16\b\x04\x01\x02\x16\x17\x07\f\x02\x02\x17\x18\x05\x06\x04' +
        '\x02\x18\x19\x07\r\x02\x02\x19,\x03\x02\x02\x02\x1A\x1B\x07\n\x02\x02' +
        '\x1B,\t\x02\x02\x02\x1C\x1D\x07\x03\x02\x02\x1D\x1E\x07\f\x02\x02\x1E' +
        '#\x05\x06\x04\x02\x1F \x07\x0E\x02\x02 "\x05\x06\x04\x02!\x1F\x03\x02' +
        '\x02\x02"%\x03\x02\x02\x02#!\x03\x02\x02\x02#$\x03\x02\x02\x02$&\x03' +
        "\x02\x02\x02%#\x03\x02\x02\x02&'\x07\r\x02\x02',\x03\x02\x02\x02(,\x07" +
        '\x05\x02\x02),\x07\x04\x02\x02*,\x07\x03\x02\x02+\x15\x03\x02\x02\x02' +
        '+\x1A\x03\x02\x02\x02+\x1C\x03\x02\x02\x02+(\x03\x02\x02\x02+)\x03\x02' +
        '\x02\x02+*\x03\x02\x02\x02,?\x03\x02\x02\x02-.\f\f\x02\x02./\x07\x06\x02' +
        '\x02/>\x05\x06\x04\r01\f\v\x02\x0212\t\x03\x02\x022>\x05\x06\x04\f34\f' +
        '\n\x02\x0245\t\x04\x02\x025>\x05\x06\x04\v67\f\t\x02\x0278\x07\x0F\x02' +
        '\x028;\x05\x06\x04\x029:\x07\x13\x02\x02:<\x05\b\x05\x02;9\x03\x02\x02' +
        '\x02;<\x03\x02\x02\x02<>\x03\x02\x02\x02=-\x03\x02\x02\x02=0\x03\x02\x02' +
        '\x02=3\x03\x02\x02\x02=6\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02' +
        '\x02?@\x03\x02\x02\x02@\x07\x03\x02\x02\x02A?\x03\x02\x02\x02BC\b\x05' +
        '\x01\x02CD\x07\x03\x02\x02DE\x07\f\x02\x02EJ\x05\x06\x04\x02FG\x07\x0E' +
        '\x02\x02GI\x05\x06\x04\x02HF\x03\x02\x02\x02IL\x03\x02\x02\x02JH\x03\x02' +
        '\x02\x02JK\x03\x02\x02\x02KM\x03\x02\x02\x02LJ\x03\x02\x02\x02MN\x07\r' +
        '\x02\x02N[\x03\x02\x02\x02OP\x07\x15\x02\x02PQ\x07\f\x02\x02QR\x05\b\x05' +
        '\x02RS\x07\r\x02\x02S[\x03\x02\x02\x02TU\x05\x06\x04\x02UV\x07\x0F\x02' +
        '\x02VW\x07\x0F\x02\x02WX\x05\x06\x04\x02X[\x03\x02\x02\x02Y[\t\x05\x02' +
        '\x02ZB\x03\x02\x02\x02ZO\x03\x02\x02\x02ZT\x03\x02\x02\x02ZY\x03\x02\x02' +
        '\x02[a\x03\x02\x02\x02\\]\f\x07\x02\x02]^\t\x06\x02\x02^`\x05\b\x05\b' +
        '_\\\x03\x02\x02\x02`c\x03\x02\x02\x02a_\x03\x02\x02\x02ab\x03\x02\x02' +
        '\x02b\t\x03\x02\x02\x02ca\x03\x02\x02\x02\f\r\x13#+;=?JZa';
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

export class ProgContext extends ParserRuleContext {
    public stat(): StatContext[];
    public stat(i: number): StatContext;
    public stat(i?: number): StatContext | StatContext[] {
        if (i === undefined) {
            return this.getRuleContexts(StatContext);
        } else {
            return this.getRuleContext(i, StatContext);
        }
    }
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_prog;
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterProg) {
            listener.enterProg(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitProg) {
            listener.exitProg(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitProg) {
            return visitor.visitProg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class StatContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_stat;
    }
    public copyFrom(ctx: StatContext): void {
        super.copyFrom(ctx);
    }
}
export class PrintExprContext extends StatContext {
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext);
    }
    public NEWLINE(): TerminalNode {
        return this.getToken(AlgebrainParser.NEWLINE, 0);
    }
    constructor(ctx: StatContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterPrintExpr) {
            listener.enterPrintExpr(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitPrintExpr) {
            listener.exitPrintExpr(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitPrintExpr) {
            return visitor.visitPrintExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BlankContext extends StatContext {
    public NEWLINE(): TerminalNode {
        return this.getToken(AlgebrainParser.NEWLINE, 0);
    }
    constructor(ctx: StatContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBlank) {
            listener.enterBlank(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBlank) {
            listener.exitBlank(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBlank) {
            return visitor.visitBlank(this);
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
export class PowContext extends ExprContext {
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
        if (listener.enterPow) {
            listener.enterPow(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitPow) {
            listener.exitPow(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitPow) {
            return visitor.visitPow(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MulDivContext extends ExprContext {
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
        if (listener.enterMulDiv) {
            listener.enterMulDiv(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitMulDiv) {
            listener.exitMulDiv(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitMulDiv) {
            return visitor.visitMulDiv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AddSubContext extends ExprContext {
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
        if (listener.enterAddSub) {
            listener.enterAddSub(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitAddSub) {
            listener.exitAddSub(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitAddSub) {
            return visitor.visitAddSub(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RewritingRuleContext extends ExprContext {
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
    public IF(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.IF, 0);
    }
    public bexp(): BexpContext | undefined {
        return this.tryGetRuleContext(0, BexpContext);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterRewritingRule) {
            listener.enterRewritingRule(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitRewritingRule) {
            listener.exitRewritingRule(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitRewritingRule) {
            return visitor.visitRewritingRule(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParensContext extends ExprContext {
    public LPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.LPARENS, 0);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext);
    }
    public RPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.RPARENS, 0);
    }
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterParens) {
            listener.enterParens(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitParens) {
            listener.exitParens(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitParens) {
            return visitor.visitParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryContext extends ExprContext {
    public _val: Token;
    public MINUS(): TerminalNode {
        return this.getToken(AlgebrainParser.MINUS, 0);
    }
    public ID(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.ID, 0);
    }
    public NUMBER(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.NUMBER, 0);
    }
    public REWRITABLE(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.REWRITABLE, 0);
    }
    constructor(ctx: ExprContext) {
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
export class OperatorContext extends ExprContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    public LPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.LPARENS, 0);
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
    public RPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.RPARENS, 0);
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
    constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterOperator) {
            listener.enterOperator(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitOperator) {
            listener.exitOperator(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitOperator) {
            return visitor.visitOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RewritableContext extends ExprContext {
    public REWRITABLE(): TerminalNode {
        return this.getToken(AlgebrainParser.REWRITABLE, 0);
    }
    constructor(ctx: ExprContext) {
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
export class NumberContext extends ExprContext {
    public NUMBER(): TerminalNode {
        return this.getToken(AlgebrainParser.NUMBER, 0);
    }
    constructor(ctx: ExprContext) {
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
export class IdContext extends ExprContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    constructor(ctx: ExprContext) {
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

export class BexpContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number) {
        super(parent, invokingState);
    }
    // @Override
    public get ruleIndex(): number {
        return AlgebrainParser.RULE_bexp;
    }
    public copyFrom(ctx: BexpContext): void {
        super.copyFrom(ctx);
    }
}
export class LogicalContext extends BexpContext {
    public _op: Token;
    public bexp(): BexpContext[];
    public bexp(i: number): BexpContext;
    public bexp(i?: number): BexpContext | BexpContext[] {
        if (i === undefined) {
            return this.getRuleContexts(BexpContext);
        } else {
            return this.getRuleContext(i, BexpContext);
        }
    }
    public AND(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.AND, 0);
    }
    public OR(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.OR, 0);
    }
    public NOT(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.NOT, 0);
    }
    constructor(ctx: BexpContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterLogical) {
            listener.enterLogical(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitLogical) {
            listener.exitLogical(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitLogical) {
            return visitor.visitLogical(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BooleanOperatorContext extends BexpContext {
    public ID(): TerminalNode {
        return this.getToken(AlgebrainParser.ID, 0);
    }
    public LPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.LPARENS, 0);
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
    public RPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.RPARENS, 0);
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
    constructor(ctx: BexpContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterBooleanOperator) {
            listener.enterBooleanOperator(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitBooleanOperator) {
            listener.exitBooleanOperator(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitBooleanOperator) {
            return visitor.visitBooleanOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NegationContext extends BexpContext {
    public NOT(): TerminalNode {
        return this.getToken(AlgebrainParser.NOT, 0);
    }
    public LPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.LPARENS, 0);
    }
    public bexp(): BexpContext {
        return this.getRuleContext(0, BexpContext);
    }
    public RPARENS(): TerminalNode {
        return this.getToken(AlgebrainParser.RPARENS, 0);
    }
    constructor(ctx: BexpContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterNegation) {
            listener.enterNegation(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitNegation) {
            listener.exitNegation(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitNegation) {
            return visitor.visitNegation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EqualityContext extends BexpContext {
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
    constructor(ctx: BexpContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterEquality) {
            listener.enterEquality(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitEquality) {
            listener.exitEquality(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitEquality) {
            return visitor.visitEquality(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FlagContext extends BexpContext {
    public TRUE(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.TRUE, 0);
    }
    public FALSE(): TerminalNode | undefined {
        return this.tryGetToken(AlgebrainParser.FALSE, 0);
    }
    constructor(ctx: BexpContext) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    public enterRule(listener: AlgebrainListener): void {
        if (listener.enterFlag) {
            listener.enterFlag(this);
        }
    }
    // @Override
    public exitRule(listener: AlgebrainListener): void {
        if (listener.exitFlag) {
            listener.exitFlag(this);
        }
    }
    // @Override
    public accept<Result>(visitor: AlgebrainVisitor<Result>): Result {
        if (visitor.visitFlag) {
            return visitor.visitFlag(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
