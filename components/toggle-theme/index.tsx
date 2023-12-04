import { useEffect, Fragment, useState } from 'react'
import { SunIcon } from '@heroicons/react/20/solid'
import { MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { useCommonStore } from 'hooks/use-common-store'

// next-themes https://github.com/pacocoursey/next-themes
import { useTheme } from 'next-themes'

export default function ToggleTheme() {
	const { setTheme, systemTheme, resolvedTheme, theme } = useTheme()
	const { storageTheme, onSetStorageTheme } = useCommonStore()

	// 只有 light dark两种
	const [themeState, setThemeState] = useState<string | undefined>('')

	const toggleTheme = (type: string) => {
		// 切换主题 包存在storage中 方便下次初始化时读取
		onSetStorageTheme(type)
		// 设置主题 next-themes
		setTheme(type)
	}

	useEffect(() => {
		// 初始化的时候 切换到指定的theme
		toggleTheme(storageTheme)
		/*判断是否处于深色模式*/
		// 当主题变化时 dark 和light 照常设置 但是system需要设置为当前的具体是dark还是light主题 用于显示 切换的icon
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			//Do some thing
			setThemeState('dark')
		} else {
			setThemeState('light')
		}
	}, [])

	useEffect(() => {
		setThemeState(resolvedTheme)
	}, [resolvedTheme])

	return (
		<>
			<Listbox>
				<div className="relative w-6 h-6 mr-3">
					<Listbox.Button className="focus:outline-none">
						<SunIcon
							className={`${
								themeState == 'light' ? 'block' : 'hidden'
							} w-6 h-6 text-black dark:hover:text-violet-400 duration-500`}
							aria-hidden="true"
						/>
						<MoonIcon
							className={`${
								themeState == 'dark' ? 'block' : 'hidden'
							} w-6 h-6 text-white hover:text-violet-500  duration-500`}
							aria-hidden="true"
						/>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute left-1/2 -translate-x-1/2 p-1 top-full bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg focus:outline-none">
							<Listbox.Option value={'system'}>
								<div
									className={`${
										storageTheme == 'system'
											? 'bg-slate-300 dark:bg-slate-900'
											: ''
									} px-5 py-[2px] rounded-lg`}
								>
									<ComputerDesktopIcon
										onClick={() => toggleTheme('system')}
										className={`my-1 w-6 h-6 text-black dark:text-white  dark:hover:text-violet-400 duration-500 `}
										aria-hidden="true"
									/>
								</div>
							</Listbox.Option>
							<Listbox.Option value={'light'}>
								<div
									className={`${
										storageTheme == 'light'
											? 'bg-slate-300 dark:bg-slate-900'
											: ''
									} px-5 py-[2px] rounded-lg`}
								>
									<SunIcon
										onClick={() => toggleTheme('light')}
										className={`my-1 w-6 h-6 text-black dark:text-white  dark:hover:text-violet-400 duration-500 `}
										aria-hidden="true"
									/>
								</div>
							</Listbox.Option>
							<Listbox.Option value={'dark'}>
								<div
									className={`${
										storageTheme == 'dark'
											? 'bg-slate-300 dark:bg-slate-900'
											: ''
									} px-5 py-[2px] rounded-lg`}
								>
									<MoonIcon
										onClick={() => toggleTheme('dark')}
										className={`my-1 w-6 h-6 text-black dark:text-white  hover:text-violet-500  duration-500 `}
										aria-hidden="true"
									/>
								</div>
							</Listbox.Option>
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</>
	)
}
