'use client'
import classes from './index.module.scss'

import MinimalismMenu from '../menu'
import Header from '../header'
import { useEffect, useState, createContext } from 'react'

export const CatalogContext = createContext({
	logShow: true,
})

function Layout({ children }: any) {
	const [menuShow, setMenuShow] = useState<boolean>(true)
	const [logShow, setLogShow] = useState<boolean>(true)

	useEffect(() => {
		if (document.body.offsetWidth < 768) {
			setLogShow(false)
		}
	}, [])

	return (
		<div className={classes.layout}>
			<CatalogContext.Provider value={{ logShow }}>
				<Header {...{ menuShow, setMenuShow, logShow, setLogShow }} />
				<div className={`${classes.body} p-5 mt-8`}>
					{menuShow && (
						<div
							className={`sm:fixed md:sticky top-0 py-2 sm:w-[60%] md:w-[25%] h-[calc(100vh-45px)] text-white bg-transparent rounded-xl z-40 overflow-auto`}
						>
							<MinimalismMenu
								{...{ menuShow, setMenuShow, logShow }}
							/>
						</div>
					)}
					<div className="w-[100%] h-[calc(100vh-45px)] overflow-auto sm:py-5 md:py-2  text-white rounded-lg">
						{children}
					</div>
				</div>
			</CatalogContext.Provider>
		</div>
	)
}

export default Layout
