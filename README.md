# Algebrain 🧠
[![Build Status](https://travis-ci.com/dedoussis/algebrain.svg?branch=master)](https://travis-ci.com/dedoussis/algebrain)
[![Coverage Status](https://coveralls.io/repos/github/dedoussis/algebrain/badge.svg?branch=master)](https://coveralls.io/github/dedoussis/algebrain?branch=master)

Combuter Algebra System focusing on symbolic transformations.

100% writen in typescript.

Parser generated using [ANTLR4](https://www.antlr.org/).

*Note: Algebrain is still at a very early and unstable stage.*

## Install

```bash
$ npm install algebrain
```

## Usage

### Expressions
```javascript
import Algebrain from "algebrain";

const expr = Algebrain.parse("(3^2)*1.6+5/(y-12.34)");
// Your string expression is now a tree of nodes:
//  +
//  ├── *
//  │   ├── 1.6
//  │   └── ^
//  │       ├── 3
//  │       └── 2
//  └── /
//      ├── 5
//      └── -
//          ├── y
//          └── 12.34

const evaluated = expr.evaluate();
// Evaluated tree of the following form:
// +
// ├── 14.4
// └── /
//     ├── 5
//     └── -
//         ├── y
//         └── 12.34

console.log(`My evaluated expression is: ${evaluated}`);
// > My evaluated expression is: 14.4+5/(y-12.34)
```

Under the hood, the above parsing uses an extensive API for structuring algebraic expressions:
```javascript
// Algebrain heavily relies on the immutable package for persistent data structures
import { List } from "immutable";
import { Operator, Num, Symbol } from "algebrain";

// The above expression: 14.4+5/(y-12.34), is constructed as:
const expr = new Operator("+", List([
    new Num(14.4),
    new Operator("/", List([
        new Num(5),
        new Operator("-", List([
            new Symbol("y"),
            new Num(12.34)
        ]))
    ]))
]));

console.log(expr.toString());
// > 14.4+5/(y-12.34)
```

### Transformations

By exploiting the concept of [rewriting rules](https://en.wikipedia.org/wiki/Rewriting), Algebrain enables the use of custom transformations, that can be entirely developed and compiled within its environment.

```javascript
import Algebrain, { Transformation } from "algebrain";

const rules = Algebrain.multiParse(`
    fib(0)=0
    fib(1)=1
    fib($a)=fib($a-1)+fib($a-2) if const($a)
`);

const fibonacci = new Transformation(rules);

const expr = Algebrain.parse("fib(15)");

console.log(`The 15th term of fibonacci is: ${fibonacci.transform(expr)}`);
// > The 15h term of fibonacci is 610
```

### Interpreter - The execution framework of Algebrain

Similar to any traditional Computer Algebra System, Algebrain provides a progamming language and an intepreter.
Every Algebrain statement or expression, when parsed, results to an object implementing the `Executable` interface.

✍️ more documentation to come...

## Develop


```bash
# Linting
npm run lint

# Unit tests w/ coverage thresholds
npm run test

# Compile typescript
npm run build

# Please commit through the following npm scripts
npm run precommit
npm run commit
```
