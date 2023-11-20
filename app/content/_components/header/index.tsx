import Link from 'next/link'

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-10 w-full px-5 py-1 bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg text-white">
			<Link href="/">
				<span>M</span>
			</Link>
			<Link href="/">
				<span>Home</span>
			</Link>
		</div>
	)
}
