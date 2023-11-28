'use client'
import React from 'react'

import Header from './_components/header'
import Footer from './_components/footer/index'

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="mx-auto h-full  max-w-[1280px]">
			<Header />
			<div className="w-full h-full duration-300 text-slate-900 bg-slate-100 dark:bg-slate-900 dark:text-white px-4 py-2">
				{children}
			</div>
			<Footer />
		</div>
	)
}
