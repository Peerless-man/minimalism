import { useCommonStore } from '../../../../hooks/use-common-store'
import { XCircleIcon, DocumentTextIcon } from '@heroicons/react/20/solid'

export default function RenderCatalogIcon() {
	const { catalogShow, onSetCatalogHide, onSetCatalogShow, catalogIconShow } =
		useCommonStore()

	if (!catalogIconShow) return

	return (
		<>
			<XCircleIcon
				className={`${
					catalogShow ? '' : 'hidden'
				} mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform`}
				aria-hidden="true"
				onClick={onSetCatalogHide}
			/>
			<DocumentTextIcon
				className={`${
					catalogShow ? 'hidden' : ''
				} mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform`}
				aria-hidden="true"
				onClick={onSetCatalogShow}
			/>
		</>
	)
}
