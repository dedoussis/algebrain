export class Node {
  value: any
}

export class Num extends Node {
  value: number
  constructor(value: number) {
    super()
    this.value = value
  }

  toString(): string {
    return this.value.toString()
  }
}

export enum OperatorSymbol {
  PLUS = '+',
  MINUS = '-',
  MUL = '*',
  DIV = '/',
  POW = '^',
  AND = 'AND',
  OR = 'OR',
  EQUALS = '==',
  FLAG = 'IS',
  NOT = 'NOT',
  DEPENDS = 'depends'
}

export class Operator extends Node {
  value: string
  children: Node[]
  constructor(value: string, children: Node[] = []) {
    super()
    this.value = value
    this.children = children
  }

  addChild(child: Node): Operator {
    return new Operator(this.value, this.children.concat([child]))
  }
  toString(): string {
    return this.children.join(this.value)
  }
}

export class Symbol extends Node {
  value: string
  constructor(value: string) {
    super()
    this.value = value
  }
}

export class Rewritable extends Node {
  value: string
  constructor(value: string) {
    super()
    this.value = value
  }

  toString(): string {
    return `$${super.toString()}`
  }
}
