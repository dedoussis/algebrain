import { List, Map } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Node from './Node';
import simplification from './transformations/simplification';
import { treeify } from './utils';

export enum CommandName {
    Transform = 'transform',
    Transformations = 'transformations',
    Evaluate = 'evaluate',
    Rules = 'rules',
    Help = 'help',
    Tree = 'tree',
}

export enum ExecuteError {
    UndefinedTransformation = 'No transformation has been set',
    MissingParameters = 'Missing required parameters',
    InvalidTransformation = 'Transformation does not exist',
    UndefinedExpression = 'No expression has been set',
    CommandNotFound = 'Command not found',
}

type ExecuteFunc = (namespace: Namespace) => Output;
type CommandSpec = {
    executeConstructor: (command: Command) => ExecuteFunc;
    description: string;
};

export const commandRegistry: Map<CommandName, CommandSpec> = Map([
    [
        CommandName.Transform,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace): Output => {
                const { expression, transformations } = namespace;
                if (expression === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedExpression,
                    };
                }
                const setSimplification = transformations.get(simplification.name, simplification);
                const transformed = expression.transform(setSimplification, transformations);
                return {
                    namespace: {
                        ...namespace,
                        expression: transformed,
                    },
                    stdOut: transformed.toString(),
                };
            },
            description: 'Transform the current expression',
        },
    ],
    [
        CommandName.Evaluate,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace): Output => {
                if (namespace.expression === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedExpression,
                    };
                }
                const evaluated = namespace.expression.evaluate();
                return {
                    namespace: {
                        ...namespace,
                        expression: evaluated,
                    },
                    stdOut: evaluated.toString(),
                };
            },
            description: 'Evaluate the current expression',
        },
    ],
    [
        CommandName.Rules,
        {
            executeConstructor: (command: Command): ExecuteFunc => (
                namespace: Namespace
            ): Output => {
                const parameter = command.parameters.first<undefined>();
                if (parameter === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.MissingParameters,
                    };
                }
                const { transformations } = namespace;
                const transformation = transformations.get(parameter);
                if (transformation === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedTransformation,
                    };
                }
                return {
                    namespace: namespace,
                    stdOut: transformation.toString(),
                };
            },
            description:
                'List the rules of a given transformation - Requires transformation name as a string parameter',
        },
    ],
    [
        CommandName.Help,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace): Output => {
                return {
                    namespace: namespace,
                    stdOut: List(['--- algebrain version 0.0.5 ---', 'Commands:'])
                        .concat(
                            commandRegistry
                                .entrySeq()
                                .map(
                                    ([name, spec]: [CommandName, CommandSpec]) =>
                                        `- ${name}: ${spec.description}`
                                )
                        )
                        .join('\n'),
                };
            },
            description: 'Print this message',
        },
    ],
    [
        CommandName.Tree,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace): Output => {
                if (!(namespace.expression instanceof Node)) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedExpression,
                    };
                }
                return {
                    namespace: namespace,
                    stdOut: treeify(namespace.expression),
                };
            },
            description: 'Tree representation of the expression',
        },
    ],
    [
        CommandName.Transformations,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace): Output => {
                return {
                    namespace: namespace,
                    stdOut: `[ ${namespace.transformations.keySeq().join(', ')} ]`,
                };
            },
            description: 'List all the defined transformations',
        },
    ],
]);

const commandNotFound: CommandSpec = {
    executeConstructor: (command: Command) => (namespace: Namespace): Output => {
        return {
            namespace: namespace,
            stdOut: ExecuteError.CommandNotFound,
        };
    },
    description: 'Placeholder command',
};

export default class Command implements Executable {
    readonly execute: ExecuteFunc;

    constructor(
        readonly name: CommandName,
        readonly parameters: List<string> = List(),
        registry: Map<CommandName, CommandSpec> = commandRegistry
    ) {
        this.execute = registry.get(this.name, commandNotFound).executeConstructor(this);
    }

    toString(): string {
        return this.parameters.isEmpty()
            ? this.name
            : `${this.name}: ${this.parameters.join(', ')}`;
    }

    equals(other: any): boolean {
        return (
            other !== undefined &&
            this.constructor === other.constructor &&
            this.name === other.name &&
            this.parameters === other.parameters
        );
    }
}
