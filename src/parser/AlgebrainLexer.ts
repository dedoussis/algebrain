// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

export class AlgebrainLexer extends Lexer {
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

    // tslint:disable:no-trailing-whitespace
    public static readonly channelNames: string[] = ['DEFAULT_TOKEN_CHANNEL', 'HIDDEN'];

    // tslint:disable:no-trailing-whitespace
    public static readonly modeNames: string[] = ['DEFAULT_MODE'];

    public static readonly ruleNames: string[] = [
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
        AlgebrainLexer._LITERAL_NAMES,
        AlgebrainLexer._SYMBOLIC_NAMES,
        []
    );

    // @Override
    // @NotNull
    public get vocabulary(): Vocabulary {
        return AlgebrainLexer.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace

    constructor(input: CharStream) {
        super(input);
        this._interp = new LexerATNSimulator(AlgebrainLexer._ATN, this);
    }

    // @Override
    public get grammarFileName(): string {
        return 'Algebrain.g4';
    }

    // @Override
    public get ruleNames(): string[] {
        return AlgebrainLexer.ruleNames;
    }

    // @Override
    public get serializedATN(): string {
        return AlgebrainLexer._serializedATN;
    }

    // @Override
    public get channelNames(): string[] {
        return AlgebrainLexer.channelNames;
    }

    // @Override
    public get modeNames(): string[] {
        return AlgebrainLexer.modeNames;
    }

    public static readonly _serializedATN: string =
        '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x19\x85\b\x01' +
        '\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06' +
        '\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r' +
        '\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t' +
        '\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t' +
        '\x17\x04\x18\t\x18\x03\x02\x06\x023\n\x02\r\x02\x0E\x024\x03\x03\x06\x03' +
        '8\n\x03\r\x03\x0E\x039\x03\x03\x03\x03\x06\x03>\n\x03\r\x03\x0E\x03?\x05' +
        '\x03B\n\x03\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03' +
        '\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03' +
        '\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F' +
        '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12' +
        '\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14' +
        '\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17' +
        '\x05\x17{\n\x17\x03\x17\x03\x17\x03\x18\x06\x18\x80\n\x18\r\x18\x0E\x18' +
        '\x81\x03\x18\x03\x18\x02\x02\x02\x19\x03\x02\x03\x05\x02\x04\x07\x02\x05' +
        '\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17' +
        '\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13' +
        "%\x02\x14'\x02\x15)\x02\x16+\x02\x17-\x02\x18/\x02\x19\x03\x02\x05\x05" +
        '\x02C\\aac|\x03\x022;\x04\x02\v\v""\x02\x8A\x02\x03\x03\x02\x02\x02' +
        '\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02' +
        '\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02' +
        '\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02' +
        '\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02' +
        '\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02' +
        "#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02'\x03\x02\x02\x02\x02)\x03" +
        '\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02' +
        '\x02\x032\x03\x02\x02\x02\x057\x03\x02\x02\x02\x07C\x03\x02\x02\x02\t' +
        'F\x03\x02\x02\x02\vH\x03\x02\x02\x02\rJ\x03\x02\x02\x02\x0FL\x03\x02\x02' +
        '\x02\x11N\x03\x02\x02\x02\x13P\x03\x02\x02\x02\x15R\x03\x02\x02\x02\x17' +
        'T\x03\x02\x02\x02\x19V\x03\x02\x02\x02\x1BX\x03\x02\x02\x02\x1DZ\x03\x02' +
        '\x02\x02\x1F_\x03\x02\x02\x02!e\x03\x02\x02\x02#g\x03\x02\x02\x02%l\x03' +
        "\x02\x02\x02'p\x03\x02\x02\x02)t\x03\x02\x02\x02+w\x03\x02\x02\x02-z" +
        '\x03\x02\x02\x02/\x7F\x03\x02\x02\x0213\t\x02\x02\x0221\x03\x02\x02\x02' +
        '34\x03\x02\x02\x0242\x03\x02\x02\x0245\x03\x02\x02\x025\x04\x03\x02\x02' +
        '\x0268\t\x03\x02\x0276\x03\x02\x02\x0289\x03\x02\x02\x0297\x03\x02\x02' +
        '\x029:\x03\x02\x02\x02:A\x03\x02\x02\x02;=\x05+\x16\x02<>\t\x03\x02\x02' +
        '=<\x03\x02\x02\x02>?\x03\x02\x02\x02?=\x03\x02\x02\x02?@\x03\x02\x02\x02' +
        '@B\x03\x02\x02\x02A;\x03\x02\x02\x02AB\x03\x02\x02\x02B\x06\x03\x02\x02' +
        '\x02CD\x05\x13\n\x02DE\x05\x03\x02\x02E\b\x03\x02\x02\x02FG\x07`\x02\x02' +
        'G\n\x03\x02\x02\x02HI\x07,\x02\x02I\f\x03\x02\x02\x02JK\x071\x02\x02K' +
        '\x0E\x03\x02\x02\x02LM\x07-\x02\x02M\x10\x03\x02\x02\x02NO\x07/\x02\x02' +
        'O\x12\x03\x02\x02\x02PQ\x07&\x02\x02Q\x14\x03\x02\x02\x02RS\x07*\x02\x02' +
        'S\x16\x03\x02\x02\x02TU\x07+\x02\x02U\x18\x03\x02\x02\x02VW\x07.\x02\x02' +
        'W\x1A\x03\x02\x02\x02XY\x07?\x02\x02Y\x1C\x03\x02\x02\x02Z[\x07V\x02\x02' +
        '[\\\x07t\x02\x02\\]\x07w\x02\x02]^\x07g\x02\x02^\x1E\x03\x02\x02\x02_' +
        '`\x07H\x02\x02`a\x07c\x02\x02ab\x07n\x02\x02bc\x07u\x02\x02cd\x07g\x02' +
        '\x02d \x03\x02\x02\x02ef\x07"\x02\x02f"\x03\x02\x02\x02gh\x07"\x02' +
        '\x02hi\x07k\x02\x02ij\x07h\x02\x02jk\x07"\x02\x02k$\x03\x02\x02\x02l' +
        'm\x07c\x02\x02mn\x07p\x02\x02no\x07f\x02\x02o&\x03\x02\x02\x02pq\x07p' +
        '\x02\x02qr\x07q\x02\x02rs\x07v\x02\x02s(\x03\x02\x02\x02tu\x07q\x02\x02' +
        'uv\x07t\x02\x02v*\x03\x02\x02\x02wx\x070\x02\x02x,\x03\x02\x02\x02y{\x07' +
        '\x0F\x02\x02zy\x03\x02\x02\x02z{\x03\x02\x02\x02{|\x03\x02\x02\x02|}\x07' +
        '\f\x02\x02}.\x03\x02\x02\x02~\x80\t\x04\x02\x02\x7F~\x03\x02\x02\x02\x80' +
        '\x81\x03\x02\x02\x02\x81\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82' +
        '\x83\x03\x02\x02\x02\x83\x84\b\x18\x02\x02\x840\x03\x02\x02\x02\t\x02' +
        '49?Az\x81\x03\b\x02\x02';
    public static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!AlgebrainLexer.__ATN) {
            AlgebrainLexer.__ATN = new ATNDeserializer().deserialize(
                Utils.toCharArray(AlgebrainLexer._serializedATN)
            );
        }

        return AlgebrainLexer.__ATN;
    }
}
