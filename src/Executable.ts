import { Map } from 'immutable';
import Node from './Node';
import Transformation from './Transformation';

export default interface Executable {
    equals(other: any): boolean;
    toString(): string;
    execute(namespace: Namespace): Output;
}

export type TransformationMap = Map<string, Transformation>;

export type Namespace = {
    expression?: Node;
    transformations: TransformationMap;
};

export type Output = {
    namespace: Namespace;
    stdOut: string;
};
