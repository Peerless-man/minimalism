import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const debounce = (fn: Function, delay: number) => {
	let timer: any = null

	return () => {
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
