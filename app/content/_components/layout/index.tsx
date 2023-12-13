'use client'
import classes from './index.module.scss'

import Header from '../header'
import { useEffect, useState } from 'react'
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

	const [show, setShow] = useState<boolean>(true)

	const judgeHideMenuOrCatalog = () => {
		if (document.body.offsetWidth < 768) {
			onSetCatalogHide()
			onSetMenuHide()
		} else {
			onSetMenuShow()
			onSetCatalogShow()
		}
	}

	useEffect(() => {
		setShow(menuShow)
	}, [menuShow])

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
		<div className={`${classes.layout} md:bg-transparent`}>
			<Header />
			<div className={`${classes.body} overflow-scroll`}>
				<div
					className={`mt-14 ${show ? 'md:w-[15rem]' : ''}  relative`}
				>
					<RenderMenu />
				</div>
				<div className={`flex-1 h-full overflow-auto`}>{children}</div>
			</div>
		</div>
	)
}

export default Layout
