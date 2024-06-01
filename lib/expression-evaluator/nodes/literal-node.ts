import {INode} from '../interfaces'

export class LiteralNode implements INode {
	value: number

	constructor(value: number) {
		this.value = value
	}

	evaluate(): number {
		return this.value
	}
}
