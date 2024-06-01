import styles from './calculator-output.module.scss'

type Props = {
	output: string
}

export function CalculatorOutput(props: Props) {
	const {output} = props

	return (
		<div className={styles.wrapper}>
			<p className={styles.text}>
				{output}
			</p>
		</div>
	)
}
