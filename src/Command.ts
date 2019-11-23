import { List, Map } from 'immutable';
import Executable, { Namespace, Output } from './Executable';
import Node from './Node';
import Transformation from './Transformation';

export default class Command implements Executable {
    readonly execute: ExecuteFunc;

    constructor(readonly name: CommandName, readonly parameters: List<string> = List<string>()) {
        this.execute = commandRegistry.get(this.name, commandNotFound).executeConstructor(this);
    }

    toString(): string {
        return `${this.name}: ${this.parameters.join(', ')}`;
    }

    equals(other: any): boolean {
        return true;
    }
}

export enum CommandName {
    Transform = 'transform',
    Evaluate = 'evaluate',
    Rules = 'rules',
    Help = 'help',
    Tree = 'tree',
}

export enum ExecuteError {
    UndefinedTransformation = 'No transformation has been set',
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
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace) => {
                const { expression, transformationName, transformations } = namespace;
                if (transformationName === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedTransformation,
                    };
                }
                const transformation: Transformation = transformations.get(
                    transformationName
                ) as Transformation;
                const transformed: Node = transformation.transform(expression as Node);
                return {
                    namespace: {
                        ...namespace,
                        expression: transformed,
                    },
                    stdOut: transformed.toString(),
                };
            },
            description: 'Transform current expression using the active transformation',
        },
    ],
    [
        CommandName.Evaluate,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace) => {
                if (namespace.expression === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedExpression,
                    };
                }
                const evaluated: Node = (namespace.expression as Node).evaluate();
                return {
                    namespace: {
                        ...namespace,
                        expression: evaluated,
                    },
                    stdOut: evaluated.toString(),
                };
            },
            description: 'Evaluate current expression',
        },
    ],
    [
        CommandName.Rules,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace) => {
                const { transformationName, transformations } = namespace;
                if (transformationName === undefined) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedTransformation,
                    };
                }
                const transformation: Transformation = transformations.get(
                    transformationName
                ) as Transformation;
                return {
                    namespace: namespace,
                    stdOut: transformation.toString(),
                };
            },
            description: 'List rules of active transformation',
        },
    ],
    [
        CommandName.Help,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace) => {
                return {
                    namespace: namespace,
                    stdOut: `--- algebrain version 0.0.3-f ---
          Commands:
          ${commandRegistry
              .entrySeq()
              .map(([name, spec]: [CommandName, CommandSpec]) => `- ${name}: ${spec.description}`)
              .join('\n')}`,
                };
            },
            description: 'Print this message',
        },
    ],
    [
        CommandName.Tree,
        {
            executeConstructor: (_: Command): ExecuteFunc => (namespace: Namespace) => {
                if (!(namespace.expression instanceof Node)) {
                    return {
                        namespace: namespace,
                        stdOut: ExecuteError.UndefinedExpression,
                    };
                }
                return {
                    namespace: namespace,
                    stdOut: namespace.expression.treeify(),
                };
            },
            description: 'Tree representation of expression',
        },
    ],
]);

const commandNotFound: CommandSpec = {
    executeConstructor: (command: Command) => (namespace: Namespace) => {
        return {
            namespace: namespace,
            stdOut: ExecuteError.CommandNotFound,
        };
    },
    description: 'Placeholder command',
};
