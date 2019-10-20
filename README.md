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

### Transformations

By exploiting the concept of [rewriting rules](https://en.wikipedia.org/wiki/Rewriting), Algebrain enables the use of custom transformations, that can be entirely developed and compiled within its environment.

```javascript
import Algebrain from "algebrain";
import Transformation from "algebrain/Transformation";

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
