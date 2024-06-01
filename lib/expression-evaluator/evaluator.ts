import {INode} from './interfaces'

export const evaluate = (node: INode | undefined): number | undefined =>
	node ? node.evaluate() : undefined
