import { List } from 'immutable'

export abstract class Node {
  readonly value: any
  constructor(value: any) {
    this.value = value
  }

  toString(): string {
    return this.value.toString()
  }
}

export class Num extends Node {
  readonly value: number
  constructor(value: number) {
    super(value)
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
  readonly value: string
  readonly children: List<Node>
  constructor(value: string, children: Node[] = []) {
    super(value)
    this.children = List(children)
  }

  addChild(child: Node): Operator {
    return new Operator(this.value, this.children.concat([child]).toArray())
  }

  toString(): string {
    return this.children.map(child => child.toString()).join(this.value)
  }
}

export class Symbol extends Node {
  readonly value: string
  constructor(value: string) {
    super(value)
  }
}

export class Rewritable extends Node {
  readonly value: string
  constructor(value: string) {
    super(value)
  }

  toString(): string {
    return `$${super.toString()}`
  }
}
