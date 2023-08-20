import {useCallback, useState} from 'react'

import {CalculatorOperandCell} from '../calculator-operand-cell'
import {CalculatorOperatorCell} from '../calculator-operator-cell'
import {CalculatorOutput} from '../calculator-output'

import styles from './calculator.module.scss'

export function Calculator() {
	const [input, setInput] = useState<string>('')
	const [output, setOutput] = useState<string>('00')

	const append = useCallback(
		(value: number | string) => {
			setInput((prev) => `${prev}${value}`)
		},
		[setInput]
	)

	const handleNumberInput = useCallback(
		(value: number) => {
			append(value);
		},
		[append]
	)

	const handleClear = useCallback(() => {
		setInput('')
		setOutput('0')
	}, [setInput, setOutput])

	const handleBackspace = useCallback(() => {
		setInput((prev) => prev.slice(0, -1))
	}, [setInput])

	const handleEvaluation = useCallback(() => {
		const result = eval(input)

		if(typeof result === 'number') {
			const sliced = result.toString().slice(0, 16)
			setOutput(sliced)
		} else if(typeof result === 'undefined') {
			setOutput('0')
		}

		setInput('')
	}, [input, setOutput, setInput])

	const handleDivision = useCallback(() => {
		append('/')
	}, [append])

	const handleMultiplication = useCallback(() => {
		append('*')
	}, [append])

	const handleAddition = useCallback(() => {
		append('+')
	}, [append])

	const handleSubtraction = useCallback(() => {
		append('-')
	}, [append])

	const cells = [
		<CalculatorOperatorCell
			data-col-start='col-3'
			operator='AC'
			handleOperation={handleClear}
		/>,
		<CalculatorOperatorCell
			operator='&larr;'
			handleOperation={handleBackspace}
		/>,

		<CalculatorOperandCell
			value={7}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={8}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={9}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperatorCell
			operator='&#x2215;'
			handleOperation={handleDivision}
		/>,

		<CalculatorOperandCell
			value={4}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={5}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={6}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperatorCell
			operator='&times;'
			handleOperation={handleMultiplication}
		/>,

		<CalculatorOperandCell
			value={1}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={2}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperandCell
			value={3}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperatorCell
			operator='+'
			handleOperation={handleAddition}
		/>,

		<CalculatorOperatorCell
			operator='&#x2219;'
			handleOperation={() => append('.')}
		/>,
		<CalculatorOperandCell
			value={0}
			handleInput={handleNumberInput}
		/>,
		<CalculatorOperatorCell
			operator='='
			handleOperation={handleEvaluation}
		/>,
		<CalculatorOperatorCell
			operator='&minus;'
			handleOperation={handleSubtraction}
		/>
	]

	return (
		<div className={styles.calculator}>
			<div className={styles.outputWrapper}>
				<CalculatorOutput output={String(output)} />
			</div>

			<div className={styles.inputWrapper}>
				{cells}
			</div>
		</div>
	)
}
