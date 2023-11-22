import Link from 'next/link'
import ToggleTheme from '../../../../components/toggle-theme'

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-10 w-full px-5 py-1 duration-300 bg-slate-50  dark:bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
			<Link href="/">
				<span>M</span>
			</Link>
			<ToggleTheme />
		</div>
	)
}
