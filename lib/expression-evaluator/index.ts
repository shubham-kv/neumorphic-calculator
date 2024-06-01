import {parseExpression} from './parser'
import {evaluate} from './evaluator'

export function evaluateExpression(expression: string) {
	const ast = parseExpression(expression)
	const result = evaluate(ast)
	return result
}
