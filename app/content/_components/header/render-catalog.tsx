import { XCircleIcon, DocumentTextIcon } from '@heroicons/react/20/solid'

export default function RenderCatalogIcon({
	logShow,
	setLogShow,
	catalogIconShow,
}: {
	logShow: boolean
	setLogShow: Function
	catalogIconShow: boolean
}) {
	if (!catalogIconShow) return

	return (
		<>
			{logShow ? (
				<XCircleIcon
					className="mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setLogShow(false)}
				/>
			) : (
				<DocumentTextIcon
					className="mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setLogShow(true)}
				/>
			)}
		</>
	)
}
