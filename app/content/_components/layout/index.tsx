'use client'
import classes from './index.module.scss'

import Header from '../header'
import { useEffect } from 'react'
import { useCommonStore } from '../../../../hooks/use-common-store'

import dynamic from 'next/dynamic'
import { debounce } from 'utils/tool'

const RenderMenu = dynamic(() => import('../menu/index'), {
	ssr: false,
})

function Layout({ children }: any) {
	const {
		menuShow,
		onSetCatalogHide,
		onSetCatalogShow,
		onSetMenuShow,
		onSetMenuHide,
	} = useCommonStore()

	const judgeHideMenuOrCatalog = () => {
		if (document.body.offsetWidth < 768) {
			onSetCatalogHide()
			onSetMenuHide()
		} else {
			onSetMenuShow()
			onSetCatalogShow()
		}
	}

	const debounceJudge = debounce(judgeHideMenuOrCatalog, 30)

	useEffect(() => {
		judgeHideMenuOrCatalog()
		window.addEventListener('resize', debounceJudge)

		return () => {
			onSetMenuShow()
			onSetCatalogShow()
			window.removeEventListener('resize', debounceJudge)
		}
	}, [])

	return (
		<div
			className={`${classes.layout} duration-300 bg-white dark:bg-slate-900 text-black dark:text-slate-400`}
		>
			<Header />
			<div className={`${classes.body}`}>
				<div
					className={`mt-14 md:w-[25%] ${
						menuShow ? 'block' : 'hidden'
					}`}
				>
					<RenderMenu />
				</div>
				<div className="w-full h-full overflow-auto">{children}</div>
			</div>
		</div>
	)
}

export default Layout
