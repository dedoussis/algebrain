import { List } from 'immutable';
import { Operator, Num, Rewritable, OperatorSymbol } from '../Node';
import { generateOperator, OperatorGenerator, plus, minus, mul, div, pow } from '../utils';
import Rule from '../Rule';
import Transformation from '../Transformation';

// integral=[
//   integral($v^$b,$v)=$v^($b+1)/($b+1),
//   integral($b/$v,$v)=ln(abs(x)),
//   integral($b^$v,$v)=$b^x/ln($b),
//   integral($a*$b,$v)=$b*integral($a,$v) if not(depends($b,$v)),
//   integral($a+$b,$v)=integral($a,$v)+integral($b,$v),
//   integral($a-$b,$v)=integral($a,$v)-integral($b,$v),
//   integral($a,$b,1)=integral($a,$b),
//   integral($a*$b,$v,$n)=$a*integral($b,$v)-integral(diff($a,$v)*integral($b,$v),$v,$n-1),
//   integral($v,$v)=integral($v^1,$v),
//   integral($a*$b,$v)=integral($a,$b) if depends($a,simpl(integral($b,$v)))
// ]

const name: string = 'integral';

export const differentiate: OperatorGenerator = generateOperator(name as OperatorSymbol);
