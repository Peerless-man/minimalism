import ToggleTheme from '../../../../components/toggle-theme'

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-16 w-full backdrop-blur-sm  px-5 py-1 duration-300 border-b shadow-sm z-50 flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
			<span className="text-3xl">M</span>
			<ToggleTheme />
		</div>
	)
}
