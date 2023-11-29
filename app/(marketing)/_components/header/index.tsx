import GitHub from 'components/gthub'
import ToggleTheme from 'components/toggle-theme'

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-14 w-full backdrop-blur-sm  px-5 py-1 duration-300 border-b shadow-sm z-50 flex justify-between items-center text-lg font-bold text-black dark:text-slate-400">
			<GitHub />
			<ToggleTheme />
		</div>
	)
}
