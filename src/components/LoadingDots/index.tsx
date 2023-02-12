import LoadingDot from './LoadingDot';
import styles from './LoadingDots.module.css';

export default function LoadingDots() {
	return (
		<div className={styles.LoadingDots}>
			<LoadingDot timeout={0} />
			<LoadingDot timeout={500} />
			<LoadingDot timeout={1000} />
		</div>
	)
}
