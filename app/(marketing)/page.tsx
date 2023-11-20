import { Poppins } from 'next/font/google'
import { cn } from '../../utils/tool'
import Link from 'next/link'

import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'

const textFont = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function MarketingPage() {
	return (
		<div className="relative h-full flex flex-col justify-center items-center">
			<div
				className={cn(
					'px-12 py-4 text-9xl  bg-amber-100 text-amber-700 rounded-lg',
					textFont.className,
				)}
			>
				M
			</div>
			<div
				className={cn(
					'mt-4 p-2 text-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-lg',
					textFont.className,
				)}
			>
				WelCome to M‘s small website
			</div>
			<div
				className={cn(
					'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
					textFont.className,
				)}
			>
				There are many technical articles about the front-end here
			</div>
			<button className="mt-4 px-4 py-1 duration-300 bg-purple-500 hover:bg-purple-700 text-slate-100 text-3xl rounded-lg">
				<Link href="/content">Know More</Link>
			</button>
			<button className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
				Scroll Down
				<ChevronDoubleDownIcon
					className="mt-2 h-12 w-12 text-violet-100 hover:text-violet-300"
					aria-hidden="true"
				/>
			</button>
		</div>
	)
}
