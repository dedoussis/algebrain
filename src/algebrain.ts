import { CommonTokenStream } from 'antlr4ts/CommonTokenStream';
import { CharStreams } from 'antlr4ts/CharStreams';
import { AlgebrainLexer } from './parser/AlgebrainLexer';
import { AlgebrainParser } from './parser/AlgebrainParser';
import Visitor from './visitor';
import { Executable } from './executable';
import { List } from 'immutable';

export default class Algebrain {
    private static retrieveTree(freeText: string) {
        const inputStream = CharStreams.fromString(freeText);
        const lexer = new AlgebrainLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new AlgebrainParser(tokenStream);
        return parser.stat();
    }

    public static parse(freeText: string): Executable {
        const tree = Algebrain.retrieveTree(freeText);
        return new Visitor().visit(tree);
    }

    public static multiParse(freeText: string): List<Executable> {
        return List<string>(freeText.split('\n')).map(line => Algebrain.parse(line));
    }
}
