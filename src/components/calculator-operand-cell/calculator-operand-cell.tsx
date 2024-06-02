import {useEffect, useRef, useState} from 'react'
import {operandKeys} from '../../constants'
import styles from './calculator-operand-cell.module.scss'

type Props = {
	value: number
	handleInput: (value: number) => void
}

export function CalculatorOperandCell(props: Props) {
	const {value, handleInput} = props
	const [active, setActive] = useState(false)
	const cellRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const keydownListener = (e: KeyboardEvent) => {
			if (operandKeys.includes(e.key)) {
				if (e.key === `${value}`) {
					setActive(true)
					cellRef.current?.focus()
				} else {
					setActive(false)
					cellRef.current?.blur()
				}
			}
		}

		const keyupListener = () => {
			setActive(false)
		}

		addEventListener('keydown', keydownListener)
		addEventListener('keyup', keyupListener)

		return () => {
			removeEventListener('keydown', keydownListener)
			removeEventListener('keyup', keyupListener)
		}
	}, [active, value])

	return (
		<div className={styles.cellWrapper}>
			<button
				ref={cellRef}
				className={`noTapHighlighting ${styles.cell} ${active ? styles.cellActive : ''}`}
				onClick={() => handleInput(value)}
			>
				{value}
			</button>
		</div>
	)
}
