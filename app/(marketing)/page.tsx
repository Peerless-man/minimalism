'use client'

import { cn } from '../../utils/tool'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { debounce } from '../../utils/tool'
import localFont from 'next/font/local'

import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

const headingFont = localFont({
	src: '../../public/fonts/font.woff2',
})

export default function MarketingPage() {
	const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)

	const scrollToBottom = () => {
		window.scrollTo({
			top: !isScrollBottom
				? document.getElementById('marketing')?.offsetHeight
				: 0,
			behavior: 'smooth',
		})
	}

	const scrollListener = () => {
		const marketing = document.getElementById('marketing')
		if (!marketing) return
		if (marketing!.getBoundingClientRect().top < -100) {
			setIsScrollBottom(true)
		} else {
			setIsScrollBottom(false)
		}
	}

	const debounceScrollListener = debounce(scrollListener, 50)

	useEffect(() => {
		scrollListener()
		window.addEventListener('scroll', debounceScrollListener)

		return () => {
			window.removeEventListener('scroll', debounceScrollListener)
		}
	}, [])

	return (
		<div
			id="marketing"
			className="relative h-full flex flex-col justify-center items-center"
		>
			<div
				className={cn(
					'px-12 py-4 text-9xl  bg-amber-100 text-amber-700 rounded-lg',
					headingFont.className,
				)}
			>
				M
			</div>
			<div
				className={cn(
					'mt-4 p-2 text-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-lg',
					headingFont.className,
				)}
			>
				WelCome to M‘s small website
			</div>
			<div
				className={cn(
					'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
					headingFont.className,
				)}
			>
				There are many technical articles about the front-end here
			</div>
			<button className="mt-4 px-4 py-1 duration-300 bg-purple-500 hover:bg-purple-700 text-slate-100 text-3xl rounded-lg">
				<Link href="/content">Know More</Link>
			</button>
			<button
				onClick={scrollToBottom}
				className={cn(
					'absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center',
					headingFont.className,
				)}
			>
				Contact Me
				<PaperAirplaneIcon
					className={`mt-2 h-12 w-12 duration-300 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 ${
						isScrollBottom ? '-rotate-90' : 'rotate-90'
					}`}
					aria-hidden="true"
				/>
			</button>
		</div>
	)
}
