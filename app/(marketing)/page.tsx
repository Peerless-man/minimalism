'use client'

import { cn } from '../../utils/tool'
import Link from 'next/link'
import localFont from 'next/font/local'

const headingFont = localFont({
	src: '../../public/fonts/font.woff2',
})

export default function MarketingPage() {
	return (
		<div
			id="marketing"
			className="relative h-full flex flex-col justify-center items-center"
		>
			<div
				className={cn(
					'px-12 py-2 text-8xl rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white cursor-pointer',
					headingFont.className,
				)}
			>
				M
			</div>
			<div
				className={cn(
					'mt-12 p-2 text-2xl rounded-lg',
					headingFont.className,
				)}
			>
				WelCome to M‘s Next.js Website
			</div>
			<div
				className={cn(
					'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
					headingFont.className,
				)}
			>
				这里记录了一些前端面试资料和一些个人随笔
			</div>
			<button className="mt-20 px-4 py-1 duration-300 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-3xl rounded-lg hover:-translate-y-1">
				<Link href="/content">Getting Started</Link>
			</button>
		</div>
	)
}
