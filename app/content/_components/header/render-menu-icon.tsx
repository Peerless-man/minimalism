import { useCommonStore } from '../../../../hooks/use-common-store'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

export default function RenderMenuIconShow() {
	const { menuShow, onSetMenuShow, onSetMenuHide } = useCommonStore()

	return (
		<>
			<Bars3Icon
				className={`${
					menuShow ? 'hidden' : ''
				} h-8 w-8 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300`}
				aria-hidden="true"
				onClick={onSetMenuShow}
			/>
			<XMarkIcon
				className={`${
					menuShow ? '' : 'hidden'
				} h-8 w-8 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300`}
				aria-hidden="true"
				onClick={onSetMenuHide}
			/>
		</>
	)
}
