import { Executable, Namespace, Output } from './executable';
import { Node } from './nodes';
import { List, Map } from 'immutable';
import { Transformation } from './transformation';

export class Command implements Executable {
    readonly execute: ExecuteFunc;

    constructor(readonly name: CommandName, readonly parameters: List<string> = List<string>()) {
        this.execute = commandRegistry.get(this.name, commandNotFound)(this);
    }

    toString(): string {
        return `${this.name}: ${this.parameters.join(', ')}`;
    }

    equals(other: any): boolean {
        return true;
    }
}

export enum CommandName {
    TRANFORM = 'transform',
    EVALUATE = 'evaluate',
    RULES = 'rules',
}

type ExecuteFunc = (namespace: Namespace) => Output;

const commandRegistry: Map<CommandName, (command: Command) => ExecuteFunc> = Map([
    [
        CommandName.TRANFORM,
        (_: Command): ExecuteFunc => (namespace: Namespace) => {
            const { expression, transformationName, transformations } = namespace;
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
    ],
    [
        CommandName.EVALUATE,
        (_: Command): ExecuteFunc => (namespace: Namespace) => {
            const evaluated: Node = (namespace.expression as Node).evaluate();
            return {
                namespace: {
                    ...namespace,
                    expression: evaluated,
                },
                stdOut: evaluated.toString(),
            };
        },
    ],
    [
        CommandName.RULES,
        (_: Command): ExecuteFunc => (namespace: Namespace) => {
            const { transformationName, transformations } = namespace;
            const transformation: Transformation = transformations.get(
                transformationName
            ) as Transformation;
            return {
                namespace: namespace,
                stdOut: transformation.toString(),
            };
        },
    ],
]);

const commandNotFound: (command: Command) => ExecuteFunc = (command: Command) => (
    namespace: Namespace
) => {
    return {
        namespace: namespace,
        stdOut: `Command ${command.name} not found`,
    };
};
