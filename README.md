# Algebrain
[![Build Status](https://travis-ci.com/dedoussis/algebrain.ts.svg?token=Sgwg8sRpH88p8zZAzn72&branch=master)](https://travis-ci.com/dedoussis/algebrain.ts)

Combuter Algebra System focusing on symbolic transformations.

100% writen with typescript.

Parser generated using [ANTLR4](https://www.antlr.org/).

## Usage

```javascript
import Algebrain from 'algebrain';

const expr = Algebrain.parse("(3^2)*x+5/y");

// Your string expression is now a tree of nodes:
//  +
//  ├── *
//  │   ├── x
//  │   └── ^
//  │       ├── 3
//  │       └── 2
//  └── /
//      ├── 5
//      └── y

const evaluated = expr.evaluate();
// Evaluated tree of the following form:
// +
// ├── *
// │   ├── 9
// │   └── x
// └── /
//     ├── 5
//     └── y 

```

## Develop


### Lint
```bash
npm run lint
```

### Test
```bash
npm run test
```

### Build
```bash
npm run build
```

### Commit
```bash
npm run precommit
```
```bash
npm run commit
```
