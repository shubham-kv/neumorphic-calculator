import styles from './calculator-operand-cell.module.scss'

type Props = {
	value: number
	handleInput: (value: number) => void
}

export function CalculatorOperandCell(props: Props) {
	const {value, handleInput} = props

	return (
		<div className={styles.cellWrapper}>
			<button
				className={`noTapHighlighting ${styles.cell} `}
				onClick={() => handleInput(value)}
			>
				{value}
			</button>
		</div>
	)
}
