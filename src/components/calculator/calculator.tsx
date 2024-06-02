import {useCallback, useEffect, useState} from 'react'
import {evaluateExpression} from '../../../lib'

import {CalculatorOperandCell} from '../calculator-operand-cell'
import {CalculatorOperatorCell} from '../calculator-operator-cell'
import {CalculatorOutput} from '../calculator-output'

import {operandKeys, operatorKeys} from '../../constants'

import styles from './calculator.module.scss'

const Defaults = Object.freeze({
	input: '',
	output: '00'
})

export function Calculator() {
	const [input, setInput] = useState<string>(Defaults.input)
	const [output, setOutput] = useState<string>(Defaults.output)

	const appendInput = useCallback(
		(value: string | number) => {
			setInput((prev) => `${prev}${value}`)

			if (input === Defaults.input) {
				setOutput(`${value}`)
			} else {
				setOutput((prev) => `${prev}${value}`)
			}
		},
		[input]
	)

	const handleAllClear = () => {
		setInput(Defaults.input)
		setOutput(Defaults.output)
	}

	const handleBackspace = useCallback(() => {
		setInput((prev) => {
			const newValue = prev.slice(0, -1)
			return newValue ? newValue : Defaults.input
		})

		if (input === Defaults.input) {
			setOutput(Defaults.output)
		} else {
			setOutput((prev) => {
				const newValue = prev.slice(0, -1)
				return newValue ? newValue : Defaults.output
			})
		}
	}, [input])

	const handleEvaluation = useCallback(() => {
		const result = evaluateExpression(input)

		if (typeof result === 'number') {
			const formatter = new Intl.NumberFormat()
			const resultString = formatter.format(result)

			setInput(result.toString())
			setOutput(resultString)
		} else {
			setOutput(Defaults.output)
			setInput(Defaults.input)
		}
	}, [input])

	useEffect(() => {
		const keyupListener = (e: KeyboardEvent) => {
			if (operandKeys.includes(e.key)) {
				appendInput(e.key)
			} else if (operatorKeys.includes(e.key)) {
				if (e.key === '=') {
					handleEvaluation()
				} else if (e.key === 'Backspace') {
					handleBackspace()
				} else {
					appendInput(e.key)
				}
			}
		}

		addEventListener('keyup', keyupListener)

		return () => {
			removeEventListener('keyup', keyupListener)
		}
	}, [appendInput, handleEvaluation, handleBackspace])

	const cells = [
		<CalculatorOperatorCell
			data-col-start='col-3'
			operator='AC'
			operatorKey=''
			handleOperation={handleAllClear}
		/>,
		<CalculatorOperatorCell
			operator={<img src={'/assets/left-arrow.svg'} />}
			operatorKey='Backspace'
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
			operatorKey='/'
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
			operatorKey='*'
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
			operatorKey='+'
			handleOperation={() => appendInput('+')}
		/>,

		<CalculatorOperatorCell
			operator='&#x2219;'
			operatorKey=''
			handleOperation={() => appendInput('.')}
		/>,
		<CalculatorOperandCell
			value={0}
			handleInput={appendInput}
		/>,
		<CalculatorOperatorCell
			operator='='
			operatorKey='='
			handleOperation={handleEvaluation}
		/>,
		<CalculatorOperatorCell
			operator='&minus;'
			operatorKey='-'
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
