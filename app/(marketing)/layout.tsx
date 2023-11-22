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
		<div className="mx-auto h-full  max-w-[1080px]">
			<Header />
			<div className="w-full h-full text-slate-900 dark:text-white px-4 py-2">
				{children}
			</div>
			<Footer />
		</div>
	)
}
