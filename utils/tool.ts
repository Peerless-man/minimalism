import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 防抖
 * @param fn 需要防抖的函数
 * @param delay 延迟多久执行
 * @returns 返回防抖函数
 */
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

export const calcWorkCount = (wordCount: number) => {
	return wordCount > 1000
		? Math.round((wordCount / 1000) * 10) / 10 + 'k'
		: wordCount
}
