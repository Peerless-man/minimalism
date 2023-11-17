export const debounce = (fn: Function, delay: number) => {
	let timer: any = null

	return () => {
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}
