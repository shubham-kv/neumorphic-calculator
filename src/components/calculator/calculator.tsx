import {useState} from 'react'
import {evaluateExpression} from '../../../lib/expression-evaluator'

import {CalculatorOperandCell} from '../calculator-operand-cell'
import {CalculatorOperatorCell} from '../calculator-operator-cell'
import {CalculatorOutput} from '../calculator-output'

import styles from './calculator.module.scss'

const Defaults = Object.freeze({
	input: '',
	output: '00'
})

export function Calculator() {
	const [input, setInput] = useState<string>(Defaults.input)
	const [output, setOutput] = useState<string>(Defaults.output)

	const appendInput = (value: string | number) => {
		setInput((prev) => `${prev}${value}`)

		if (input === Defaults.input) {
			setOutput(`${value}`)
		} else {
			setOutput((prev) => `${prev}${value}`)
		}
	}

	const handleAllClear = () => {
		setInput(Defaults.input)
		setOutput(Defaults.output)
	}

	const handleBackspace = () => {
		setInput((prev) => {
			const newValue = prev.slice(0, -1)
			return newValue ? newValue : Defaults.input
		})
		setOutput((prev) => {
			const newValue = prev.slice(0, -1)
			return newValue ? newValue : Defaults.output
		})
	}

	const handleEvaluation = () => {
		const result = evaluateExpression(input)

		if (typeof result === 'number') {
			const sliced = result.toString().slice(0, 16)
			setInput(sliced)
			setOutput(sliced)
		} else {
			setOutput(Defaults.output)
			setInput(Defaults.input)
		}
	}

	const cells = [
		<CalculatorOperatorCell
			data-col-start='col-3'
			operator='AC'
			handleOperation={handleAllClear}
		/>,
		<CalculatorOperatorCell
			operator={<img src={'/assets/left-arrow.svg'} />}
			handleOperation={handleBackspace}
		/>,

		<CalculatorOperandCell
			value={7}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={8}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={9}
			handleInput={appendInput}
		/>,
		<CalculatorOperatorCell
			operator='&#x2215;'
			handleOperation={() => appendInput('/')}
		/>,

		<CalculatorOperandCell
			value={4}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={5}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={6}
			handleInput={appendInput}
		/>,
		<CalculatorOperatorCell
			operator='&times;'
			handleOperation={() => appendInput('*')}
		/>,

		<CalculatorOperandCell
			value={1}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={2}
			handleInput={appendInput}
		/>,
		<CalculatorOperandCell
			value={3}
			handleInput={appendInput}
		/>,
		<CalculatorOperatorCell
			operator='+'
			handleOperation={() => appendInput('+')}
		/>,

		<CalculatorOperatorCell
			operator='&#x2219;'
			handleOperation={() => appendInput('.')}
		/>,
		<CalculatorOperandCell
			value={0}
			handleInput={appendInput}
		/>,
		<CalculatorOperatorCell
			operator='='
			handleOperation={handleEvaluation}
		/>,
		<CalculatorOperatorCell
			operator='&minus;'
			handleOperation={() => appendInput('-')}
		/>
	]

	return (
		<div className={styles.calculator}>
			<div className={styles.outputWrapper}>
				<CalculatorOutput output={String(output)} />
			</div>

			<div className={styles.inputWrapper}>{cells}</div>
		</div>
	)
}
