import { Map } from 'immutable';

export interface Executable {
    equals(other: any): boolean;
    toString(): string;
    execute(namespace: Namespace): Output;
}

export type Namespace = {
    expression: Executable;
    transformationName: string;
    transformations: Map<string, Executable>;
};

export type Output = {
    namespace: Namespace;
    stdOut: string;
};
