import styles from './calculator-operator-cell.module.scss'

type Props = {
	['data-col-start']?: string
	operator: React.ReactNode
	handleOperation: () => void
}

export function CalculatorOperatorCell(props: Props) {
	const {operator, handleOperation} = props

	return (
		<div
			className={styles.cellWrapper}
			data-col-start={props['data-col-start']}
		>
			<button
				className={`noTapHighlighting ${styles.cell} `}
				onClick={() => handleOperation()}
			>
				{operator}
			</button>
		</div>
	)
}
