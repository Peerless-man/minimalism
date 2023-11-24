import { useCommonStore } from '../../../../hooks/use-common-store'

import {
	Bars3BottomLeftIcon,
	Bars3BottomRightIcon,
} from '@heroicons/react/20/solid'

export default function RenderMenuIconShow() {
	const { menuShow, onSetMenuShow, onSetMenuHide } = useCommonStore()

	return (
		<>
			<Bars3BottomRightIcon
				className={`${
					menuShow ? 'hidden' : ''
				} h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform`}
				aria-hidden="true"
				onClick={onSetMenuShow}
			/>
			<Bars3BottomLeftIcon
				className={`${
					menuShow ? '' : 'hidden'
				} h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform`}
				aria-hidden="true"
				onClick={onSetMenuHide}
			/>
		</>
	)
}
