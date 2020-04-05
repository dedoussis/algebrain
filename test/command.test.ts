import { Map, List } from 'immutable';
import Algebrain from '../src/Algebrain';
import Command, { CommandName, ExecuteError } from '../src/Command';
import { Num, Symbol, Operator, OperatorSymbol } from '../src/Node';
import Transformation from '../src/Transformation';
import fibonacci from '../src/transformations/fibonacci';
import simplification from '../src/transformations/simplification';
import { plus, pow } from '../src/utils';

describe('Command', () => {
    it('constructs', () => {
        expect(new Command(CommandName.Transform)).toBeInstanceOf(Command);
    });
});

const transformations: Map<string, Transformation> = Map({
    [fibonacci.name]: fibonacci,
    [simplification.name]: simplification,
});

const exequtionCases = [
    [
        CommandName.Transform,
        {
            expression: new Operator(fibonacci.name, List([new Num(6)])),
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(8),
                transformations: transformations,
            },
            stdOut: '8',
        },
    ],
    [
        CommandName.Transform,
        {
            expression: plus(new Num(5), new Num(4)),
            transformations: Map(),
        },
        {
            namespace: {
                expression: new Num(9),
                transformations: Map(),
            },
            stdOut: '9',
        },
    ],
    [
        CommandName.Transform,
        {
            transformations: transformations,
        },
        {
            namespace: {
                transformations: transformations,
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        CommandName.Evaluate,
        {
            expression: pow(new Num(2), new Num(4)),
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(16),
                transformations: transformations,
            },
            stdOut: '16',
        },
    ],
    [
        CommandName.Evaluate,
        {
            transformations: Map(),
        },
        {
            namespace: {
                transformations: Map(),
            },
            stdOut: ExecuteError.UndefinedExpression,
        },
    ],
    [
        `${CommandName.Rules}: ${fibonacci.name}`,
        {
            expression: new Num(16),
            transformations: transformations,
        },
        {
            namespace: {
                expression: new Num(16),
                transformations: transformations,
            },
            stdOut: fibonacci.toString(),
        },
    ],
    [
        CommandName.Tree,
        {
            expression: plus(new Num(5), new Symbol('k')),
            transformations: Map(),
        },
        {
            namespace: {
                expression: plus(new Num(5), new Symbol('k')),
                transformations: Map(),
            },
            stdOut: ['+', '├─ 5', '└─ k'].join('\n'),
        },
    ],
    [
        CommandName.Transformations,
        { transformations: transformations },
        {
            namespace: {
                transformations: transformations,
            },
            stdOut: `[ ${fibonacci.name}, ${simplification.name} ]`,
        },
    ],
];

describe('command executions', () => {
    test.each(exequtionCases)('Execution case %p', (title, namespace, output) => {
        expect(Algebrain.parse(title).execute(namespace)).toEqual(output);
    });
});
