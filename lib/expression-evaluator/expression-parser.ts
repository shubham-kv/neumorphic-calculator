import {INode} from './interfaces'
import {BinaryNode, LiteralNode} from './nodes'

import {Operator} from './enums'
import {additiveOperators, multiplicativeOperators, numbers} from './constants'

import {isNumber} from '../is-number'

export class ExpressionParser {
	#curIndex: number = 0
	#expression: string | undefined = undefined

	parse(expression: string): INode | undefined {
		this.#expression = expression
		return this.parseExpression()
	}

	private parseExpression(): INode | undefined {
		if (!this.#expression) {
			return undefined
		}

		let left = this.parseTerm()

		while (additiveOperators.includes(this.#expression[this.#curIndex])) {
			const operator: Operator =
				Operator[this.#expression[this.#curIndex] as Operator]
			this.#curIndex++

			const right = this.parseTerm()
			const newBinaryNode = new BinaryNode(undefined, operator, left, right)

			if (left instanceof BinaryNode) {
				left.parent = newBinaryNode
			}

			left = newBinaryNode
		}

		return left
	}

	private parseTerm(): INode | undefined {
		if (!this.#expression) {
			return undefined
		}

		let left = this.parseAtom()

		while (multiplicativeOperators.includes(this.#expression[this.#curIndex])) {
			const operator: Operator =
				Operator[this.#expression[this.#curIndex] as Operator]
			this.#curIndex++

			const right = this.parseAtom()
			const newBinaryNode = new BinaryNode(undefined, operator, left, right)

			if (left instanceof BinaryNode) {
				left.parent = newBinaryNode
			}

			left = newBinaryNode
		}

		return left
	}

	private parseAtom(): INode | undefined {
		if (!this.#expression) {
			return undefined
		}

		const curChar = this.#expression[this.#curIndex]
		let multiplier = 1
		let numberString = ''

		if (['+', '-'].includes(curChar)) {
			this.#curIndex++
			multiplier = curChar === '-' ? -1 : 1
		}

		while (numbers.includes(this.#expression[this.#curIndex])) {
			numberString += this.#expression[this.#curIndex]
			this.#curIndex++
		}

		if (!isNumber(numberString)) {
			return undefined
		}

		const literalNode: LiteralNode = new LiteralNode(
			multiplier * parseFloat(numberString)
		)

		return literalNode
	}
}
