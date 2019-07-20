import { CommonTokenStream } from 'antlr4ts/CommonTokenStream'
import { CharStreams } from 'antlr4ts/CharStreams'
import { AlgebrainLexer } from './parser/AlgebrainLexer'
import { AlgebrainParser } from './parser/AlgebrainParser'
import Visitor from './visitor'
import { Node } from './nodes'

export default class Algebrain {
  private static retrieveTree(freeText: string) {
    const inputStream = CharStreams.fromString(freeText)
    const lexer = new AlgebrainLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new AlgebrainParser(tokenStream)
    return parser.expr()
  }

  public static parse(freeText: string): Node {
    const tree = Algebrain.retrieveTree(freeText)
    return new Visitor().visit(tree)
  }
}
