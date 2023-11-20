import classes from './index.module.scss'

import MinimalismMenu from '../menu'

function Layout({ children }: any) {
	return (
		<div className={classes.layout}>
			<div className={`${classes.center} max-w-[1080px]`}>
				<div className={`${classes.body} p-5`}>
					<div className="fixed top-0 left-0 sm:w-auto md:relative md:w-[30%] text-white bg-slate-900">
						<MinimalismMenu />
					</div>
					<div className="sm:w-[100%] md:w-[70%] sm:py-5 md:px-8 text-white">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
