import { List } from 'immutable';
import { Num, Rewritable, OperatorSymbol } from '../Node';
import {
    generateOperator,
    OperatorGenerator,
    add,
    substract,
    multiply,
    divide,
    exp,
} from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

const name: string = 'simpl';

const simplify: OperatorGenerator = generateOperator(name as OperatorSymbol);

const simpl: Transformation = new Transformation(name, List([]));

export default simpl;
