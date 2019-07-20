// Generated from src/parser/Algebrain.g4 by ANTLR 4.7.3-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN'
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer'
import { CharStream } from 'antlr4ts/CharStream'
import { Lexer } from 'antlr4ts/Lexer'
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator'
import { NotNull } from 'antlr4ts/Decorators'
import { Override } from 'antlr4ts/Decorators'
import { RuleContext } from 'antlr4ts/RuleContext'
import { Vocabulary } from 'antlr4ts/Vocabulary'
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl'

import * as Utils from 'antlr4ts/misc/Utils'

export class AlgebrainLexer extends Lexer {
  public static readonly ID = 1
  public static readonly INT = 2
  public static readonly REWRITABLE = 3
  public static readonly POW = 4
  public static readonly MUL = 5
  public static readonly DIV = 6
  public static readonly PLUS = 7
  public static readonly MINUS = 8
  public static readonly DOLLAR = 9
  public static readonly LPARENS = 10
  public static readonly RPARENS = 11
  public static readonly COMMA = 12
  public static readonly EQUALS = 13
  public static readonly TRUE = 14
  public static readonly FALSE = 15
  public static readonly SPACE = 16
  public static readonly IF = 17
  public static readonly AND = 18
  public static readonly NOT = 19
  public static readonly OR = 20
  public static readonly NEWLINE = 21
  public static readonly WS = 22

  // tslint:disable:no-trailing-whitespace
  public static readonly channelNames: string[] = ['DEFAULT_TOKEN_CHANNEL', 'HIDDEN']

  // tslint:disable:no-trailing-whitespace
  public static readonly modeNames: string[] = ['DEFAULT_MODE']

  public static readonly ruleNames: string[] = [
    'ID',
    'INT',
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
    'NEWLINE',
    'WS'
  ]

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
    "'if'",
    "'and'",
    "'not'",
    "'or'"
  ]
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    'ID',
    'INT',
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
    'NEWLINE',
    'WS'
  ]
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    AlgebrainLexer._LITERAL_NAMES,
    AlgebrainLexer._SYMBOLIC_NAMES,
    []
  )

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return AlgebrainLexer.VOCABULARY
  }
  // tslint:enable:no-trailing-whitespace

  constructor(input: CharStream) {
    super(input)
    this._interp = new LexerATNSimulator(AlgebrainLexer._ATN, this)
  }

  // @Override
  public get grammarFileName(): string {
    return 'Algebrain.g4'
  }

  // @Override
  public get ruleNames(): string[] {
    return AlgebrainLexer.ruleNames
  }

  // @Override
  public get serializedATN(): string {
    return AlgebrainLexer._serializedATN
  }

  // @Override
  public get channelNames(): string[] {
    return AlgebrainLexer.channelNames
  }

  // @Override
  public get modeNames(): string[] {
    return AlgebrainLexer.modeNames
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x18w\b\x01\x04' +
    '\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04' +
    '\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r' +
    '\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12' +
    '\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17' +
    '\x03\x02\x06\x021\n\x02\r\x02\x0E\x022\x03\x03\x06\x036\n\x03\r\x03\x0E' +
    '\x037\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07' +
    '\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03' +
    '\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12' +
    '\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14' +
    '\x03\x15\x03\x15\x03\x15\x03\x16\x05\x16m\n\x16\x03\x16\x03\x16\x03\x17' +
    '\x06\x17r\n\x17\r\x17\x0E\x17s\x03\x17\x03\x17\x02\x02\x02\x18\x03\x02' +
    '\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11' +
    '\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10' +
    "\x1F\x02\x11!\x02\x12#\x02\x13%\x02\x14'\x02\x15)\x02\x16+\x02\x17-\x02" +
    '\x18\x03\x02\x05\x05\x02C\\aac|\x03\x022;\x04\x02\v\v""\x02z\x02\x03' +
    '\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t' +
    '\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03' +
    '\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03' +
    '\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03' +
    '\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03' +
    "\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02'\x03\x02\x02" +
    '\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x03' +
    '0\x03\x02\x02\x02\x055\x03\x02\x02\x02\x079\x03\x02\x02\x02\t<\x03\x02' +
    '\x02\x02\v>\x03\x02\x02\x02\r@\x03\x02\x02\x02\x0FB\x03\x02\x02\x02\x11' +
    'D\x03\x02\x02\x02\x13F\x03\x02\x02\x02\x15H\x03\x02\x02\x02\x17J\x03\x02' +
    '\x02\x02\x19L\x03\x02\x02\x02\x1BN\x03\x02\x02\x02\x1DP\x03\x02\x02\x02' +
    '\x1FU\x03\x02\x02\x02![\x03\x02\x02\x02#]\x03\x02\x02\x02%`\x03\x02\x02' +
    "\x02'd\x03\x02\x02\x02)h\x03\x02\x02\x02+l\x03\x02\x02\x02-q\x03\x02" +
    '\x02\x02/1\t\x02\x02\x020/\x03\x02\x02\x0212\x03\x02\x02\x0220\x03\x02' +
    '\x02\x0223\x03\x02\x02\x023\x04\x03\x02\x02\x0246\t\x03\x02\x0254\x03' +
    '\x02\x02\x0267\x03\x02\x02\x0275\x03\x02\x02\x0278\x03\x02\x02\x028\x06' +
    '\x03\x02\x02\x029:\x05\x13\n\x02:;\x05\x03\x02\x02;\b\x03\x02\x02\x02' +
    '<=\x07`\x02\x02=\n\x03\x02\x02\x02>?\x07,\x02\x02?\f\x03\x02\x02\x02@' +
    'A\x071\x02\x02A\x0E\x03\x02\x02\x02BC\x07-\x02\x02C\x10\x03\x02\x02\x02' +
    'DE\x07/\x02\x02E\x12\x03\x02\x02\x02FG\x07&\x02\x02G\x14\x03\x02\x02\x02' +
    'HI\x07*\x02\x02I\x16\x03\x02\x02\x02JK\x07+\x02\x02K\x18\x03\x02\x02\x02' +
    'LM\x07.\x02\x02M\x1A\x03\x02\x02\x02NO\x07?\x02\x02O\x1C\x03\x02\x02\x02' +
    'PQ\x07V\x02\x02QR\x07t\x02\x02RS\x07w\x02\x02ST\x07g\x02\x02T\x1E\x03' +
    '\x02\x02\x02UV\x07H\x02\x02VW\x07c\x02\x02WX\x07n\x02\x02XY\x07u\x02\x02' +
    'YZ\x07g\x02\x02Z \x03\x02\x02\x02[\\\x07"\x02\x02\\"\x03\x02\x02\x02' +
    ']^\x07k\x02\x02^_\x07h\x02\x02_$\x03\x02\x02\x02`a\x07c\x02\x02ab\x07' +
    'p\x02\x02bc\x07f\x02\x02c&\x03\x02\x02\x02de\x07p\x02\x02ef\x07q\x02\x02' +
    'fg\x07v\x02\x02g(\x03\x02\x02\x02hi\x07q\x02\x02ij\x07t\x02\x02j*\x03' +
    '\x02\x02\x02km\x07\x0F\x02\x02lk\x03\x02\x02\x02lm\x03\x02\x02\x02mn\x03' +
    '\x02\x02\x02no\x07\f\x02\x02o,\x03\x02\x02\x02pr\t\x04\x02\x02qp\x03\x02' +
    '\x02\x02rs\x03\x02\x02\x02sq\x03\x02\x02\x02st\x03\x02\x02\x02tu\x03\x02' +
    '\x02\x02uv\b\x17\x02\x02v.\x03\x02\x02\x02\x07\x0227ls\x03\b\x02\x02'
  public static __ATN: ATN
  public static get _ATN(): ATN {
    if (!AlgebrainLexer.__ATN) {
      AlgebrainLexer.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(AlgebrainLexer._serializedATN)
      )
    }

    return AlgebrainLexer.__ATN
  }
}
