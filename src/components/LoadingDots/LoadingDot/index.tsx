import { useClassNames } from '@/utils/useClassNames';
import { useEffect, useState } from 'react';
import styles from './LoadingDot.module.scss';

export interface LoadingDotParams {
	timeout?: number
}

export default function LoadingDot({ timeout = 0 }: LoadingDotParams) {
	const [isAnimating, setAnimating] = useState(false)
	const className = useClassNames([styles.LoadingDot, isAnimating ? styles.animating : null])
	
	useEffect(() => {
		setAnimating(false)
		setTimeout(() => setAnimating(true), timeout)

		return () => setAnimating(false)
	}, [timeout])

	return (
		<div className={className}></div>		
	)
}
