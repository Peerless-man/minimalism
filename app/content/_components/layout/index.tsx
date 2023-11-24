'use client'
import classes from './index.module.scss'

import Header from '../header'
import { useEffect } from 'react'
import { useCommonStore } from '../../../../hooks/use-common-store'

import dynamic from 'next/dynamic'

const RenderMenu = dynamic(() => import('../menu/index'), {
	ssr: false,
})

function Layout({ children }: any) {
	const {
		onSetCatalogHide,
		onSetMenuShow,
		onSetMenuHide,
		onSetCatalogIconHide,
	} = useCommonStore()

	useEffect(() => {
		if (document.body.offsetWidth < 768) {
			onSetCatalogHide()
			onSetMenuHide()
		} else {
			onSetMenuShow()
		}
		onSetCatalogIconHide()

		return () => {
			onSetMenuHide()
		}
	}, [])

	return (
		<div
			className={`${classes.layout} duration-300 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white`}
		>
			<Header />
			<div className={`${classes.body} p-5 mt-8`}>
				<RenderMenu />
				<div className="w-[100%] h-[calc(100vh-45px)] overflow-auto rounded-lg">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
