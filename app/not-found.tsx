'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
	const router = useRouter()

	return (
		<main className="h-full w-full flex flex-col justify-center items-center p-8 duration-300 bg-white dark:bg-slate-900 text-black dark:text-slate-400">
			<h1 className="text-lg font-bold">Not Found</h1>
			<p className="text-sm">Could not find requested resource</p>

			<div className="flex-nowrap flex items-center justify-between mt-12 ">
				<Link
					className="underline-offset-3 underline hover:text-purple-400"
					href="/"
				>
					回到首页
				</Link>
				<div className="ml-8 cursor-pointer" onClick={router.back}>
					返回上一页
				</div>
			</div>
		</main>
	)
}
