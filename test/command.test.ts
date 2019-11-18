import { Map, List } from 'immutable';
import Algebrain from '../src/Algebrain';
import Command, { CommandName, ExecuteError } from '../src/Command';
import { Num, Operator, OperatorSymbol } from '../src/Node';
import Transformation from '../src/Transformation';

describe('Command', () => {
    it('constructs', () => {
        expect(new Command(CommandName.Transform)).toBeInstanceOf(Command);
    });
});

const transformations: Map<string, Transformation> = Map<string, Transformation>([
    [
        'fib',
        Algebrain.parse(
            `fib=[fib(0)=0,fib(1)=1,fib($a)=fib($a-1)+fib($a-2) if const($a)]`
        ) as Transformation,
    ],
]);

const exequtionCases = [
    [
        'transform',
        Algebrain.parse('transform'),
        {
            expression: new Operator('fib', List([new Num(6)])),
            transformationName: 'fib',
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(8),
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: '8',
        },
    ],
    [
        'transform with no active transformation',
        Algebrain.parse('transform'),
        {
            expression: new Num(5),
            transformations: Map(),
        },
        {
            namespace: {
                expression: new Num(5),
                transformations: Map(),
            },
            stdOut: ExecuteError.UndefinedTransformation,
        },
    ],
    [
        'evaluate',
        Algebrain.parse('evaluate'),
        {
            expression: new Operator(OperatorSymbol.Pow, List([new Num(2), new Num(4)])),
            transformationName: 'fib',
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(16),
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: '16',
        },
    ],
    [
        'evaluate with no current expression',
        Algebrain.parse('evaluate'),
        {
            transformationName: 'fib',
            transformations: Map(),
        },
        {
            namespace: {
                transformationName: 'fib',
                transformations: Map(),
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        'rules',
        Algebrain.parse('rules'),
        { expression: new Num(16), transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                expression: new Num(16),
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: '[ fib(0)=0, fib(1)=1, fib($a)=fib($a-1)+fib($a-2) if const($a) ]',
        },
    ],
];

describe('command executions', () => {
    test.each(exequtionCases)('Execution case %p', (title, command, namespace, output) => {
        expect(command.execute(namespace)).toEqual(output);
    });
});
