import { List } from 'immutable';
import { CommonTokenStream } from 'antlr4ts/CommonTokenStream';
import { CharStreams } from 'antlr4ts/CharStreams';
import { AlgebrainLexer } from './parser/AlgebrainLexer';
import { AlgebrainParser, StatContext } from './parser/AlgebrainParser';

import Visitor from './Visitor';
import Executable from './Executable';

export default class Algebrain {
    private static retrieveTree(text: string): StatContext {
        const inputStream = CharStreams.fromString(text);
        const lexer = new AlgebrainLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new AlgebrainParser(tokenStream);
        return parser.stat();
    }

    public static parse(text: string): Executable {
        const tree = Algebrain.retrieveTree(text);
        return new Visitor().visit(tree);
    }

    public static multiParse(text: string): List<Executable> {
        return List<string>(text.split('\n')).map(line => Algebrain.parse(line));
    }
}
