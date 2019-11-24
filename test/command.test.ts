import { Map, List } from 'immutable';
import Algebrain from '../src/Algebrain';
import Command, { CommandName, ExecuteError } from '../src/Command';
import { Num, Symbol, Operator, OperatorSymbol } from '../src/Node';
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
    ['increment', Algebrain.parse('increment=[increment($x)=$x+1]') as Transformation],
]);

const exequtionCases = [
    [
        'transform',
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
        'transform',
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
        'transform',
        {
            transformationName: 'fib',
            transformations: transformations,
        },
        {
            namespace: {
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        'evaluate',
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
        'evaluate',
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
        { expression: new Num(16), transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                expression: new Num(16),
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: (transformations.get('fib') as Transformation).toString(),
        },
    ],
    [
        'tree',
        {
            expression: new Operator(OperatorSymbol.Plus, List([new Num(5), new Symbol('k')])),
            transformations: Map(),
        },
        {
            namespace: {
                expression: new Operator(OperatorSymbol.Plus, List([new Num(5), new Symbol('k')])),
                transformations: Map(),
            },
            stdOut: ['+', '├─ 5', '└─ k'].join('\n'),
        },
    ],
    [
        'transformations',
        { transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: '[ fib, increment ]',
        },
    ],
    [
        'active',
        { transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: 'fib',
        },
    ],
    [
        'active',
        { transformations: transformations },
        {
            namespace: {
                transformations: transformations,
            },
            stdOut: ExecuteError.UndefinedTransformation,
        },
    ],
    [
        'transformation: increment',
        { transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                transformationName: 'increment',
                transformations: transformations,
            },
            stdOut: (transformations.get('increment') as Transformation).toString(),
        },
    ],
    [
        'transformation',
        { transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: ExecuteError.MissingParameters,
        },
    ],
    [
        'transformation: brexit',
        { transformationName: 'fib', transformations: transformations },
        {
            namespace: {
                transformationName: 'fib',
                transformations: transformations,
            },
            stdOut: ExecuteError.InvalidTransformation,
        },
    ],
];

describe('command executions', () => {
    test.each(exequtionCases)('Execution case %p', (title, namespace, output) => {
        expect(Algebrain.parse(title).execute(namespace)).toEqual(output);
    });
});
