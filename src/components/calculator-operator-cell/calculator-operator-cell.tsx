import {useEffect, useRef, useState} from 'react'
import {operatorKeys} from '../../constants'
import styles from './calculator-operator-cell.module.scss'

type Props = {
	['data-col-start']?: string
	operator: React.ReactNode
	operatorKey: React.ReactNode
	handleOperation: () => void
}

export function CalculatorOperatorCell(props: Props) {
	const {operator, operatorKey, handleOperation} = props
	const [active, setActive] = useState(false)
	const cellRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const keydownListener = (e: KeyboardEvent) => {
			if (operatorKeys.includes(e.key)) {
				if (e.key === `${operatorKey}`) {
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
	}, [active, operatorKey])

	return (
		<div
			className={styles.cellWrapper}
			data-col-start={props['data-col-start']}
		>
			<button
				ref={cellRef}
				className={`noTapHighlighting ${styles.cell} ${active ? styles.cellActive : ''}`}
				onClick={() => handleOperation()}
			>
				{operator}
			</button>
		</div>
	)
}
