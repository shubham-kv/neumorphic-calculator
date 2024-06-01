import {LiteralNode, BinaryNode} from './nodes'
import {INode} from './interfaces'
import {numbers, additiveOperators, multiplicativeOperators} from './constants'
import {Operator} from './enums'

/**
 * Parses only numeric & binary expression.
 */
export function parseExpression(expression: string): INode | undefined {
	if (!expression) {
		return undefined
	}

	const length = expression.length
	let index: number = 0
	let currentNode: INode | undefined = undefined

	while (index < length) {
		const currentChar = expression[index]

		if (numbers.includes(currentChar)) {
			let numberStr: string = ''

			while (numbers.includes(expression[index])) {
				numberStr += expression[index]
				index++
			}

			const literalNode: LiteralNode = new LiteralNode(parseFloat(numberStr))

			if (currentNode instanceof BinaryNode) {
				currentNode.right = literalNode
			} else {
				currentNode = literalNode
			}
		} else if (additiveOperators.includes(currentChar as any as Operator)) {
			const operator: Operator = Operator[currentChar as any as Operator]
			index++

			const binaryNode: BinaryNode = new BinaryNode(
				undefined,
				operator,
				currentNode
			)

			if (currentNode instanceof BinaryNode) {
				currentNode.parent = binaryNode
			}

			currentNode = binaryNode
		} else if (multiplicativeOperators.includes(currentChar as any as Operator)) {
			const operator: Operator = Operator[currentChar as any as Operator]
			index++

			if (currentNode instanceof BinaryNode) {
				const binaryNode: BinaryNode = new BinaryNode(
					currentNode,
					operator,
					currentNode.right
				)
				currentNode.right = binaryNode
				currentNode = binaryNode
			} else if (currentNode instanceof LiteralNode) {
				const binaryNode: BinaryNode = new BinaryNode(undefined, operator, currentNode)
				currentNode = binaryNode
			}
		} else if (/\s/.test(currentChar)) {
			index++
		} else {
			throw new Error(
				`Unexpected character in '${currentChar}' expression at index ${index}`
			)
		}
	}

	while (currentNode instanceof BinaryNode && currentNode.parent) {
		currentNode = currentNode.parent
	}

	return currentNode
}
