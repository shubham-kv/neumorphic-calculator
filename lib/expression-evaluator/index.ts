import {evaluate} from './evaluator'
import {ExpressionParser} from './expression-parser'

export function evaluateExpression(expression: string) {
	const parser = new ExpressionParser()
	const ast = parser.parse(expression)
	const result = evaluate(ast)
	return result
}
