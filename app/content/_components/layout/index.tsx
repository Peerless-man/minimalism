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
			className={`${classes.layout} duration-300 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white`}
		>
			<Header />
			<div className={`${classes.body} p-5 mt-14`}>
				<div className={`w-[0] ${menuShow ? 'md:w-[25%]' : ''} `}>
					<RenderMenu />
				</div>
				<div className="w-[100%] h-[calc(100vh-60px)] overflow-auto rounded-lg">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
