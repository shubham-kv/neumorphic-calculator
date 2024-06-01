import {INode} from '../interfaces'
import {Operator} from '../enums'

export class BinaryNode implements INode {
	parent: BinaryNode | undefined
	operator: Operator
	left: INode | undefined
	right: INode | undefined

	constructor(
		parent: BinaryNode | undefined,
		operator: Operator,
		left?: INode | undefined,
		right?: INode | undefined
	) {
		this.parent = parent
		this.operator = operator
		this.left = left
		this.right = right
	}

	evaluate(): number | undefined {
		if (!this.left || !this.right) {
			return undefined
		}

		const leftValue = this.left.evaluate()
		const rightValue = this.right.evaluate()

		if (
			leftValue === undefined ||
			leftValue === null ||
			rightValue === undefined ||
			rightValue === null
		) {
			return undefined
		}

		switch (this.operator) {
			case Operator['+']: {
				return leftValue + rightValue
			}
			case Operator['-']: {
				return leftValue - rightValue
			}
			case Operator['*']: {
				return leftValue * rightValue
			}
			case Operator['/']: {
				return leftValue / rightValue
			}
			default: {
				throw new Error(`Invalid operator '${this.operator}'.`)
			}
		}
	}
}
