import { ElementRef, ElementType, useEffect, useRef, useState } from "react";

export function useIntersection(distance: string, once = false) {
	const elRef = useRef(null)
	const [near, setNear] = useState(false)

	useEffect(() => {
		const onNear: IntersectionObserverCallback = (entries, observer) => {
			const first = entries.at(0)
			const intersecting = Boolean(first?.isIntersecting)
			setNear(intersecting)

			if (intersecting && once) observer.disconnect()
		}

		const observer = new IntersectionObserver(onNear, {
			rootMargin: distance
		})

		if (elRef.current) observer.observe(elRef.current)

		return () => observer.disconnect()
	}, [distance, once])

	return [near, elRef] as const
}

