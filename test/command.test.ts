import { Map, List } from 'immutable';
import Algebrain from '../src/Algebrain';
import Command, { CommandName, ExecuteError } from '../src/Command';
import { Num, Symbol, Operator, OperatorSymbol } from '../src/Node';
import Transformation from '../src/Transformation';
import fibonacci from '../src/transformations/fibonacci';
import simplification from '../src/transformations/simplification';

describe('Command', () => {
    it('constructs', () => {
        expect(new Command(CommandName.Transform)).toBeInstanceOf(Command);
    });
});

const transformations: Map<string, Transformation> = Map<string, Transformation>([
    [fibonacci.name, fibonacci],
    [simplification.name, simplification],
]);

const exequtionCases = [
    [
        CommandName.Transform,
        {
            expression: new Operator(fibonacci.name, List([new Num(6)])),
            transformationName: fibonacci.name,
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(8),
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: '8',
        },
    ],
    [
        CommandName.Transform,
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
        CommandName.Transform,
        {
            transformationName: fibonacci.name,
            transformations: transformations,
        },
        {
            namespace: {
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        CommandName.Evaluate,
        {
            expression: new Operator(OperatorSymbol.Pow, List([new Num(2), new Num(4)])),
            transformationName: fibonacci.name,
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(16),
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: '16',
        },
    ],
    [
        CommandName.Evaluate,
        {
            transformationName: fibonacci.name,
            transformations: Map(),
        },
        {
            namespace: {
                transformationName: fibonacci.name,
                transformations: Map(),
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        CommandName.Rules,
        {
            expression: new Num(16),
            transformationName: fibonacci.name,
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(16),
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: (transformations.get(fibonacci.name) as Transformation).toString(),
        },
    ],
    [
        CommandName.Tree,
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
        CommandName.Transformations,
        { transformationName: fibonacci.name, transformations: transformations },
        {
            namespace: {
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: `[ ${fibonacci.name}, ${simplification.name} ]`,
        },
    ],
    [
        CommandName.Active,
        { transformationName: fibonacci.name, transformations: transformations },
        {
            namespace: {
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: fibonacci.name,
        },
    ],
    [
        CommandName.Active,
        { transformations: transformations },
        {
            namespace: {
                transformations: transformations,
            },
            stdOut: ExecuteError.UndefinedTransformation,
        },
    ],
    [
        `${CommandName.Use}: ${simplification.name}`,
        { transformationName: fibonacci.name, transformations: transformations },
        {
            namespace: {
                transformationName: simplification.name,
                transformations: transformations,
            },
            stdOut: simplification.toString(),
        },
    ],
    [
        CommandName.Use,
        { transformationName: fibonacci.name, transformations: transformations },
        {
            namespace: {
                transformationName: fibonacci.name,
                transformations: transformations,
            },
            stdOut: ExecuteError.MissingParameters,
        },
    ],
    [
        `${CommandName.Use}: brexit`,
        { transformationName: fibonacci.name, transformations: transformations },
        {
            namespace: {
                transformationName: fibonacci.name,
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
