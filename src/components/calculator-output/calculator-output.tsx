import {useEffect, useRef} from 'react'
import styles from './calculator-output.module.scss'

type Props = {
	output: string
}

export function CalculatorOutput(props: Props) {
	const {output} = props
	const outputRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		if (outputRef.current?.scrollWidth) {
			outputRef.current.scrollLeft = outputRef.current.scrollWidth
		}
	}, [output])

	return (
		<div className={styles.wrapper}>
			<p ref={outputRef} className={styles.text}>
				{output}
			</p>
		</div>
	)
}
