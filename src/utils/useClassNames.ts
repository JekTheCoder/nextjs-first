import { useMemo } from "react";

export function useClassNames(classes: unknown[]) {
	const className = useMemo(() => classes.join(' '), classes)
	return className
}
